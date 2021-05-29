import { Message } from './../message';

/**
 * POST /question/:questionId/message
 * - userId will be passed via headers along with bearer token. Which will be validated with firebase-admin.
 */
export type CreateMessageRequest = Pick<Message, 'text'>;
export type CreateMessageResponse = Message;
