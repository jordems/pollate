import { createFeatureSelector, createSelector } from '@ngrx/store';
import { RESPONSE_COLOURS } from '@pollate/ng/shared/theme';
import { QuestionState, QUESTION_STATE } from './question.state';

export const selectState = createFeatureSelector<QuestionState>(QUESTION_STATE);

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
