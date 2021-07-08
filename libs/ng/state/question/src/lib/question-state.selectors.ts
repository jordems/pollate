import { createFeatureSelector, createSelector } from '@ngrx/store';
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
  (state) => state.question?.responses || []
);
