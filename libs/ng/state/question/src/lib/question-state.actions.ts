import { createAction, props } from '@ngrx/store';
import {
  CreateMessageRequest,
  CreateMessageResponse,
  CreateResponseRequest,
  CreateResponseResponse,
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

export const createResponse = createAction(
  '[Question] Creates a response on the question, if one already exists, then updates it',
  props<CreateResponseRequest>()
);
export const createResponseSuccess = createAction(
  '[Question] Created a response successfully',
  props<CreateResponseResponse>()
);
export const createResponseFailed = createAction(
  '[Question] Failed to create a response',
  props<Error>()
);

export const createMessage = createAction(
  '[Question] Creates a message on the question',
  props<CreateMessageRequest>()
);
export const createMessageSuccess = createAction(
  '[Question] Created a message successfully',
  props<CreateMessageResponse>()
);
export const createMessageFailed = createAction(
  '[Question] Failed to create a message',
  props<Error>()
);

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
