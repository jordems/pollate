import { Response } from '@pollate/type';
import { merge } from 'lodash';
import { mockObjectId } from './mock-object-id';

export function mockResponse(overrides: Partial<Response> = {}): Response {
  const response: Response = {
    _id: mockObjectId(),
    questionId: mockObjectId(),
    userId: mockObjectId(),
    response: '2',
    createdAt: new Date(),
  };

  return merge(response, overrides);
}
