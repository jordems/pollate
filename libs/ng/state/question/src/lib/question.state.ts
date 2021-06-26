import { Question, QuestionConnectedEvent } from '@pollate/type';

export const QUESTION_STATE = 'question';

export interface QuestionState extends QuestionConnectedEvent {
  question: Question | null;
  loaded: boolean;
}

export const initialQuestionState: QuestionState = {
  messages: [],
  responses: [],
  userResponse: null,
  question: null,
  loaded: false,
};
