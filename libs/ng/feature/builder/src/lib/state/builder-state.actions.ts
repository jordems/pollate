import { createAction, props } from '@ngrx/store';
import { QuestionConnectedEvent } from '@pollate/type';

export const wsConnected = createAction(
  '[Question] Socket connected returing onload data',
  props<QuestionConnectedEvent>()
);
