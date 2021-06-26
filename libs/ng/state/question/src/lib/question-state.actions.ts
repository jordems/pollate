import { createAction, props } from '@ngrx/store';
import {
  Question,
  QuestionConnectedEvent,
  QuestionConnectionRequest,
  QuestionOnMessageEvent,
  QuestionOnUpsertResponse,
} from '@pollate/type';

// Initiated actions
export const loadQuestion = createAction(
  '[Question] Fetch question details from stub',
  props<{ stub: string }>()
);
export const loadQuestionSuccess = createAction(
  '[Question] Fetched question successfully',
  props<Question>()
);
export const loadQuestionFailed = createAction(
  '[Question] Failed to fetch the question',
  props<Error>()
);

export const connectToWs = createAction(
  '[Question] Connect to a questions gateway',
  props<QuestionConnectionRequest>()
);

//TODO?
// Create and Update Response (Maybe merge into a single endpoint?)
// Send Message

// Websocket received actions
export const wsConnected = createAction(
  '[Question] Socket connected returing onload data',
  props<QuestionConnectedEvent>()
);

export const wsOnMessage = createAction(
  '[Question] Socket received new chat message',
  props<QuestionOnMessageEvent>()
);

export const wsOnUpsertResponse = createAction(
  '[Question] Socket received and upserted response',
  props<QuestionOnUpsertResponse>()
);
