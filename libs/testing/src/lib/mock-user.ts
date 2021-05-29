import { User } from '@deb8/type';
import { merge } from 'lodash';
import { mockObjectId } from './mock-object-id';

export function mockUser(overrides: Partial<User> = {}): User {
  const user: User = {
    _id: mockObjectId(),
    uid: mockObjectId(),
    name: 'Jimmbo',
  };

  return merge(user, overrides);
}
