import { User } from '../user';

/**
 * POST /user
 */
export type CreateUserRequest = Pick<User, 'name' | 'uid'>;
export type CreateUserResponse = User;

/**
 * PUT /user/:userId
 */
export type UpdateUserRequest = Pick<User, 'name'>;
export type UpdateUserResponse = User;
