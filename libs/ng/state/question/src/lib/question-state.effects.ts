import { isPlatformBrowser } from '@angular/common';
import { Inject, Injectable, OnDestroy, PLATFORM_ID } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { select, Store } from '@ngrx/store';
import { NgEnvironment, NG_ENVIRONMENT } from '@pollate/ng/shared/environment';
import { of, Subject, throwError } from 'rxjs';
import {
  catchError,
  concatMap,
  exhaustMap,
  filter,
  map,
  switchMap,
  take,
  takeUntil,
  tap,
  withLatestFrom,
} from 'rxjs/operators';
import { ChatApiService } from './data-access/chat-api.service';
import { QuestionApiService } from './data-access/question-api.service';
import { QuestionSocket } from './data-access/question-socket';
import { ResponseApiService } from './data-access/response-api.service';
import {
  connectToWs,
  createMessage,
  createMessageSuccess,
  createResponse,
  createResponseSuccess,
  loadQuestion,
  loadQuestionSuccess,
  wsConnected,
  wsOnMessage,
  wsOnUpdateResponseDelta,
} from './question-state.actions';
import { selectQuestion, selectUserResponse } from './question-state.selectors';
@Injectable()
export class QuestionStateEffects implements OnDestroy {
  private destroySubject$: Subject<void> = new Subject();

  /**
   * Fetches an loads the question into the state. Then triggers the action to connect to the websocket
   */
  loadQuestion$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadQuestion),
      switchMap((action) => {
        return this.questionApiService.getQuestionByStub(action.stub).pipe(
          take(1),
          concatMap((data) => {
            const { _id: questionId } = data;
            return [
              loadQuestionSuccess(data),
              connectToWs({ questionId: questionId, userId: '' }), // TODO
            ];
          }),
          catchError((err) => {
            alert(err.message?.message || 'Uh ohhh');
            return of(err);
          })
        );
      })
    )
  );

  /**
   * Connects to the api gateway and starts listeners for realtime events
   *
   * - Skip connecting to socket when SS
   */
  connectToWs$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(connectToWs),
        filter(() => isPlatformBrowser(this.platformId)),
        tap((action) => {
          const questionSocket = new QuestionSocket(this.env.api, action);

          questionSocket.connected$.pipe(
            takeUntil(this.destroySubject$),
            map((data) => wsConnected(data))
          );
          questionSocket.onMessage$.pipe(
            takeUntil(this.destroySubject$),
            map((data) => wsOnMessage(data))
          );
          questionSocket.onUpdateResponseDelta$.pipe(
            takeUntil(this.destroySubject$),
            map((data) => wsOnUpdateResponseDelta(data))
          );
        })
      ),
    { dispatch: false }
  );

  /**
   * Creates a response if user doesn't already have one, otherwise it updates the existing
   */
  createResponse = createEffect(() =>
    this.actions$.pipe(
      ofType(createResponse),
      concatMap((action) =>
        of(action).pipe(
          withLatestFrom(
            this.store.pipe(select(selectUserResponse)),
            this.store.pipe(select(selectQuestion))
          )
        )
      ),
      exhaustMap(([action, userResponse, question]) => {
        if (!question) {
          return throwError('No Question Loaded');
        }

        if (userResponse) {
          return this.responseApiService
            .updateResponse(question._id, userResponse._id, action)
            .pipe(
              take(1),
              map((data) => {
                return createResponseSuccess(data);
              })
            );
        } else {
          return this.responseApiService
            .createResponse(question._id, action)
            .pipe(
              take(1),
              map((data) => {
                return createResponseSuccess(data);
              })
            );
        }
      })
    )
  );

  /**
   * Creates a message for the user
   */
  createMessage = createEffect(() =>
    this.actions$.pipe(
      ofType(createMessage),
      concatMap((action) =>
        of(action).pipe(withLatestFrom(this.store.pipe(select(selectQuestion))))
      ),
      exhaustMap(([action, question]) => {
        if (!question) {
          return throwError('No Question Loaded');
        }
        return this.chatApiService.createMessage(question._id, action).pipe(
          take(1),
          map((data) => {
            return createMessageSuccess(data);
          })
        );
      })
    )
  );

  constructor(
    @Inject(NG_ENVIRONMENT) private readonly env: NgEnvironment,
    @Inject(PLATFORM_ID) private platformId: string,
    private actions$: Actions,
    private store: Store,
    private questionApiService: QuestionApiService,
    private responseApiService: ResponseApiService,
    private chatApiService: ChatApiService
  ) {}

  ngOnDestroy(): void {
    this.destroySubject$.next();
    this.destroySubject$.complete();
  }
}
