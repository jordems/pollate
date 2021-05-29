import { Message } from '@deb8/type';
import { merge } from 'lodash';
import { mockObjectId } from './mock-object-id';

export function mockMessage(overrides: Partial<Message> = {}): Message {
  const message: Message = {
    _id: mockObjectId(),
    questionId: mockObjectId(),
    userId: mockObjectId(),
    name: 'Jimmbo',
    text: 'No way its 2!!',
    createdAt: new Date(),
  };

  return merge(message, overrides);
}
