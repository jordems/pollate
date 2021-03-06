import { isPlatformBrowser } from '@angular/common';
import { Inject, Injectable, OnDestroy, PLATFORM_ID } from '@angular/core';
import { Actions, concatLatestFrom, createEffect, ofType } from '@ngrx/effects';
import { select, Store } from '@ngrx/store';
import { NgAuthService } from '@pollate/ng/shared/auth';
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
      concatLatestFrom(() => this.ngAuthService.getUser()),
      switchMap(([action, user]) => {
        return this.questionApiService.getQuestionByStub(action.stub).pipe(
          take(1),
          concatMap((data) => {
            const { _id: questionId } = data;
            return [
              loadQuestionSuccess(data),
              connectToWs({ questionId: questionId, userId: user?._id ?? '' }),
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
  questionSocket!: QuestionSocket;
  connectToWs$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(connectToWs),
        filter(() => isPlatformBrowser(this.platformId)),
        tap((action) => {
          this.questionSocket = new QuestionSocket(this.env.api, action);

          this.questionSocket.connected$
            .pipe(
              takeUntil(this.destroySubject$),
              tap((data) => this.store.dispatch(wsConnected(data)))
            )
            .subscribe();
          this.questionSocket.onMessage$
            .pipe(
              takeUntil(this.destroySubject$),
              tap((data) => this.store.dispatch(wsOnMessage(data)))
            )
            .subscribe();
          this.questionSocket.onUpdateResponseDelta$
            .pipe(
              takeUntil(this.destroySubject$),
              tap((data) => this.store.dispatch(wsOnUpdateResponseDelta(data)))
            )
            .subscribe();
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
            .updateResponse(question._id, userResponse._id, {
              response: action.response,
            })
            .pipe(
              take(1),
              map((data) => {
                return createResponseSuccess(data);
              })
            );
        } else {
          return this.responseApiService
            .createResponse(question._id, { response: action.response })
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
        return this.chatApiService
          .createMessage(question._id, { text: action.text })
          .pipe(
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
    private chatApiService: ChatApiService,
    private ngAuthService: NgAuthService
  ) {}

  ngOnDestroy(): void {
    this.destroySubject$.next();
    this.destroySubject$.complete();
  }
}
