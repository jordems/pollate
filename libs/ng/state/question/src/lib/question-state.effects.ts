import { Inject, Injectable, OnDestroy } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { NgEnvironment, NG_ENVIRONMENT } from '@pollate/ng/shared/environment';
import { of, Subject } from 'rxjs';
import {
  catchError,
  concatMap,
  map,
  take,
  takeUntil,
  tap,
} from 'rxjs/operators';
import { QuestionApiService } from './data-access/question-api.service';
import { QuestionSocket } from './data-access/question-socket';
import {
  connectToWs,
  loadQuestion,
  loadQuestionSuccess,
  wsConnected,
  wsOnMessage,
  wsOnUpsertResponse,
} from './question-state.actions';

@Injectable()
export class QuestionStateEffects implements OnDestroy {
  private destroySubject$: Subject<void> = new Subject();

  /**
   * Fetches an loads the question into the state. Then triggers the action to connect to the websocket
   */
  loadQuestion$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadQuestion),
      concatMap((action) => {
        return this.questionApiService.getQuestionByStub(action.stub).pipe(
          take(1),
          map((data) => {
            const { _id: questionId } = data;
            return [
              loadQuestionSuccess(data),
              connectToWs({ questionId: questionId, userId: 'TODO' }),
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

  connectToWs$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(connectToWs),
        tap((action) => {
          //TODO if on SSR skip socket connection

          const questionSocket = new QuestionSocket(this.env.api, action);

          questionSocket.connected$.pipe(
            takeUntil(this.destroySubject$),
            map((data) => wsConnected(data))
          );
          questionSocket.onMessage$.pipe(
            takeUntil(this.destroySubject$),
            map((data) => wsOnMessage(data))
          );
          questionSocket.onUpsertResponse$.pipe(
            takeUntil(this.destroySubject$),
            map((data) => wsOnUpsertResponse(data))
          );
        })
      ),
    { dispatch: false }
  );

  constructor(
    private actions$: Actions,
    @Inject(NG_ENVIRONMENT) private readonly env: NgEnvironment,
    private questionApiService: QuestionApiService
  ) {}

  ngOnDestroy(): void {
    this.destroySubject$.next();
    this.destroySubject$.complete();
  }
}
