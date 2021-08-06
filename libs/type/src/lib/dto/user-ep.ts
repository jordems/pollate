import { User } from '../user';

/**
 * POST /user
 */
export type CreateUserRequest = Partial<Pick<User, 'username'>>;
export type CreateUserResponse = User;

/**
 * GET /user/uid/:uid
 */
export type GetUserByUidResponse = User;

/**
 * PUT /user/:userId
 */
export type UpdateUserRequest = Partial<Pick<User, 'username'>>;
export type UpdateUserResponse = User;
