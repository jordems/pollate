import { Inject, Injectable } from '@angular/core';
import { Actions, createEffect } from '@ngrx/effects';
import { NgEnvironment, NG_ENVIRONMENT } from '@pollate/ng/shared/environment';
import { map } from 'rxjs/operators';
import { QuestionSocket } from './data-access/question-socket';
import {
  wsConnected,
  wsOnMessage,
  wsOnUpsertResponse,
} from './question-state.actions';

@Injectable()
export class QuestionStateEffects {
  private questionSocket!: QuestionSocket;

  wsConnected$ = createEffect(() =>
    this.questionSocket?.connected$.pipe(map((data) => wsConnected(data)))
  );

  wsOnMessage$ = createEffect(() =>
    this.questionSocket?.onMessage$.pipe(map((data) => wsOnMessage(data)))
  );

  wsOnUpsertResponse$ = createEffect(() =>
    this.questionSocket?.onUpsertResponse$.pipe(
      map((data) => wsOnUpsertResponse(data))
    )
  );

  constructor(
    private actions$: Actions,
    @Inject(NG_ENVIRONMENT) private readonly env: NgEnvironment
  ) {}
}
