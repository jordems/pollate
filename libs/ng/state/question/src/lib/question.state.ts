import { Question, QuestionConnectedEvent } from '@pollate/type';

export const QUESTION_STATE = 'question';

export interface QuestionState extends QuestionConnectedEvent {
  question: Question | null;
  loaded: boolean;
}

export const initialQuestionState: QuestionState = {
  messages: [],
  userResponse: null,
  question: null,
  memoizedQuestionData: {
    messageCount: NaN,
    responseCount: NaN,
    activeResponses: {},
  },
  userInteractionMap: {},
  loaded: false,
};
