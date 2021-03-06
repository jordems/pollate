import { User } from '@pollate/type';
import { merge } from 'lodash';
import { mockObjectId } from './mock-object-id';

export function mockUser(overrides: Partial<User> = {}): User {
  const user: User = {
    _id: mockObjectId(),
    username: 'Jimmbo',
  };

  return merge(user, overrides);
}
