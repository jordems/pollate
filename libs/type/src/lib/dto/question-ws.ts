import { MinimalMessage } from '../message';
import { MemoizedQuestionData } from '../question';
import { Response } from '../response';

export const QUESTION_NAMESPACE = 'question' as const;

export interface QuestionConnectionRequest {
  questionId: string;
  userId: string;
}
export interface QuestionConnectedEvent {
  /**
   * Memoized data from the question.
   *
   * This is actually the second time the client fetches this data.
   * 1st: is for SSR and SEO
   * 2nd: is for socket so we don't run into a race condition as responses could happen between http request and socket connection.
   */
  memoizedQuestionData: MemoizedQuestionData;

  /**
   * The messages on the question
   */
  messages: MinimalMessage[];

  /**
   * If a user is logged in then this will be their response if they have one
   */
  userResponse: Response | null;

  /**
   * This is a list of each user and their linked response. This is to keep track of which user has made what response
   */
  userInteractionMap: {
    [userId: string]: {
      response: string | null;
    };
  };
}

export interface QuestionOnMessageEvent {
  message: MinimalMessage;
}

export interface QuestionOnUpdateResponseDelta {
  responsesDeltas: { response: string; amountDelta: number }[];

  changedUserResponse: { userId: string; response: string }[];
}

export interface QuestionWSEventMap {
  connected: QuestionConnectedEvent;
  onMessage: QuestionOnMessageEvent;
  onUpdateResponseDelta: QuestionOnUpdateResponseDelta;
}

export type QuestionWSEvent = keyof QuestionWSEventMap;
