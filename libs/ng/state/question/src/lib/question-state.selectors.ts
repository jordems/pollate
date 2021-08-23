import { createFeatureSelector, createSelector } from '@ngrx/store';
import { RESPONSE_COLOURS } from '@pollate/ng/shared/theme';
import { DisplayMessage } from '@pollate/type';
import { QuestionState, QUESTION_STATE } from './question.state';

export const selectState = createFeatureSelector<QuestionState>(QUESTION_STATE);

export const selectLoaded = createSelector(
  selectState,
  (state) => state.loaded
);

export const selectMessages = createSelector(
  selectState,
  (state) => state.messages
);

export const selectUserResponse = createSelector(
  selectState,
  (state) => state.userResponse
);

export const selectQuestion = createSelector(
  selectState,
  (state) => state.question
);

export const selectMemoizedQuestionData = createSelector(
  selectState,
  (state) => state.memoizedQuestionData
);

export const selectResponseOptions = createSelector(
  selectState,
  (state) =>
    state.question?.responses.map((response, idx) => ({
      response,
      colour: RESPONSE_COLOURS[idx],
      selected: state.userResponse?.response == response,
    })) || []
);

const selectResponseColourMap = createSelector(
  selectResponseOptions,
  (responseOptions) =>
    responseOptions.reduce<Record<string, string>>(
      (prev, cur) => ({ ...prev, [cur.response]: cur.colour }),
      {}
    )
);

export const selectUserInteractionMap = createSelector(
  selectState,
  (state) => state.userInteractionMap
);

export const selectDisplayMessages = createSelector(
  selectMessages,
  selectResponseColourMap,
  selectUserInteractionMap,
  (messages, responseColourMap, userInteractionMap) =>
    messages
      .map<DisplayMessage>(({ text, name, createdAt, userId }) => {
        const response = userInteractionMap[userId]?.response;

        return {
          name,
          text,
          createdAt,
          colour: response ? responseColourMap[response] : '#FFFFFF00',
        };
      })
      // They from `flex-direction: column-reverse;
      .sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      )
);
