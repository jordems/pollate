import { Action, createReducer, on } from '@ngrx/store';
import { wsConnected, wsOnMessage } from './question-state.actions';
import { initialQuestionState, QuestionState } from './question.state';

export function questionReducer(
  state: QuestionState | undefined,
  action: Action
): QuestionState {
  return createReducer<QuestionState>(
    initialQuestionState,
    on(wsConnected, (state, initialData) => ({
      ...state,
      ...initialData,
      loaded: true,
    })),
    on(wsOnMessage, (state, { message }) => ({
      ...state,
      messages: [...state.messages, message],
    }))
  )(state, action);
}
