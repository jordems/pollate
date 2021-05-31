import { createFeatureSelector, createSelector } from '@ngrx/store';
import { QuestionState, QUESTION_STATE } from './question.state';

export const selectState = createFeatureSelector<QuestionState>(QUESTION_STATE);

export const selectMessages = createSelector(
  selectState,
  (state) => state.messages
);

export const selectResponses = createSelector(
  selectState,
  (state) => state.responses
);

export const selectUserResponse = createSelector(
  selectState,
  (state) => state.userResponse
);
