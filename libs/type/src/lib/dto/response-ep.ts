import { Response } from './../response';

/**
 * POST /question/:questionId/response
 * - userId will be passed via headers along with bearer token. Which will be validated with firebase-admin.
 */
export type CreateResponseRequest = Pick<Response, 'response'>;
export type CreateResponseResponse = Response;

/**
 * PUT /question/:questionId/response/:responseId
 */
export type UpdateResponseRequest = Pick<Response, 'response'>;
export type UpdateResponseResponse = Response;
