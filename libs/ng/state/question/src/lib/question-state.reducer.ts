import { Action, createReducer, on } from '@ngrx/store';
import {
  MemoizedQuestionData,
  QuestionOnUpdateResponseDelta,
} from '@pollate/type';
import {
  wsConnected,
  wsOnMessage,
  wsOnUpdateResponseDelta,
} from './question-state.actions';
import { initialQuestionState, QuestionState } from './question.state';

function affectActiveResponses(
  activeResponses: MemoizedQuestionData['activeResponses'],
  responsesDeltas: QuestionOnUpdateResponseDelta['responsesDeltas']
): MemoizedQuestionData['activeResponses'] {
  for (const { response, amountDelta } of responsesDeltas) {
    activeResponses = {
      ...activeResponses,
      [response]: activeResponses[response] + amountDelta,
    };
  }

  return activeResponses;
}

function affectUserInteractionMap(
  userInteractionMap: QuestionState['userInteractionMap'],
  changedUserResponse: QuestionOnUpdateResponseDelta['changedUserResponse']
): QuestionState['userInteractionMap'] {
  for (const { response, userId } of changedUserResponse) {
    userInteractionMap = {
      ...userInteractionMap,
      [userId]: {
        response,
      },
    };
  }

  return userInteractionMap;
}

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
    })),
    on(
      wsOnUpdateResponseDelta,
      (state, { responsesDeltas, changedUserResponse }) => ({
        ...state,
        memoizedQuestionData: {
          ...state.memoizedQuestionData,
          activeResponses: affectActiveResponses(
            state.memoizedQuestionData.activeResponses,
            responsesDeltas
          ),
        },
        userInteractionMap: affectUserInteractionMap(
          state.userInteractionMap,
          changedUserResponse
        ),
      })
    )
  )(state, action);
}
