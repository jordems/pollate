import { createAction, props } from '@ngrx/store';
import { QuestionConnectedEvent, QuestionOnMessageEvent } from '@pollate/type';

export const wsConnected = createAction(
  '[Question] Socket connected returing onload data',
  props<QuestionConnectedEvent>()
);

export const wsOnMessage = createAction(
  '[Question] Socket recieved new chat message',
  props<QuestionOnMessageEvent>()
);
