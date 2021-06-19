import { Injectable } from '@angular/core';
import { Actions, createEffect } from '@ngrx/effects';
import { map } from 'rxjs/operators';
import { QuestionSocketService } from './data-access/question-socket.service';
import { wsConnected, wsOnMessage } from './question-state.actions';

@Injectable()
export class QuestionStateEffects {
  wsConnected$ = createEffect(() =>
    this.questionSocketService.connected$.pipe(map((data) => wsConnected(data)))
  );
  onMessage$ = createEffect(() =>
    this.questionSocketService.onMessage$.pipe(map((data) => wsOnMessage(data)))
  );

  constructor(
    private actions$: Actions,
    private questionSocketService: QuestionSocketService
  ) {}
}
