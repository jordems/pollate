import { Action, createReducer, on } from '@ngrx/store';
import {
  MemoizedQuestionData,
  QuestionOnUpdateResponseDelta,
} from '@pollate/type';
import {
  createResponseSuccess,
  loadQuestionSuccess,
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

function affectResponseCount(
  responseCount: number,
  responsesDeltas: QuestionOnUpdateResponseDelta['responsesDeltas']
): number {
  for (const { amountDelta } of responsesDeltas) {
    responseCount = responseCount + amountDelta;
  }

  return responseCount;
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
    on(loadQuestionSuccess, (state, question) => ({
      ...state,
      question,
    })),
    on(createResponseSuccess, (state, response) => ({
      ...state,
      userResponse: response,
    })),
    on(wsConnected, (state, initialData) => ({
      ...state,
      ...initialData,
      loaded: true,
    })),
    on(wsOnMessage, (state, { message }) => ({
      ...state,
      messages: [...state.messages, message],
      memoizedQuestionData: {
        ...state.memoizedQuestionData,
        messageCount: state.memoizedQuestionData.messageCount + 1,
      },
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
          responseCount: affectResponseCount(
            state.memoizedQuestionData.responseCount,
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
