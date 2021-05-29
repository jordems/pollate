import { Question } from '@deb8/type';
import { merge } from 'lodash';
import { mockObjectId } from './mock-object-id';

export function mockQuestion(overrides: Partial<Question> = {}): Question {
  const question: Question = {
    _id: mockObjectId(),
    userId: mockObjectId(),
    stub: 'math-question',
    question: '1 + 1?',
    responses: ['1', '2', '3', '4'],
    createdAt: new Date(),
  };

  return merge(question, overrides);
}
