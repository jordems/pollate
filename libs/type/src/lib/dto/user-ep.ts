import { User } from '../user';

/**
 * POST /user
 */
export type CreateUserRequest = Pick<User, 'username'>;
export type CreateUserResponse = User;

/**
 * GET /user/uid/:uid
 */
export type GetUserByUidResponse = User;

/**
 * PUT /user/:userId
 */
export type UpdateUserRequest = Pick<User, 'username'>;
export type UpdateUserResponse = User;
