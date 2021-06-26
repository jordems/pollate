import { MinimalMessage } from '../message';
import { MinimalResponse, Response } from '../response';

export const QUESTION_NAMESPACE = 'question' as const;

export interface QuestionConnectionRequest {
  questionId: string;
  userId: string;
}
export interface QuestionConnectedEvent {
  messages: MinimalMessage[];
  responses: MinimalResponse[];
  userResponse: Response | null;
}

export interface QuestionOnMessageEvent {
  message: MinimalMessage;
}

export interface QuestionOnUpsertResponse {
  response: MinimalResponse;
}

export interface QuestionWSEventMap {
  connected: QuestionConnectedEvent;
  onMessage: QuestionOnMessageEvent;
  onUpsertResponse: QuestionOnUpsertResponse;
}

export type QuestionWSEvent = keyof QuestionWSEventMap;
