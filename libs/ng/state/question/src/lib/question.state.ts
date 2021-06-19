import { QuestionConnectedEvent } from '@pollate/type';

export const QUESTION_STATE = 'question';

export interface QuestionState extends QuestionConnectedEvent {
  loaded: boolean;
}

export const initialQuestionState: QuestionState = {
  messages: [],
  responses: [],
  userResponse: null,
  loaded: false,
};
