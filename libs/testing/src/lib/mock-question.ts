import { Question } from '@pollate/type';
import { merge } from 'lodash';
import { mockObjectId } from './mock-object-id';

export function mockQuestion(overrides: Partial<Question> = {}): Question {
  const question: Question = {
    _id: mockObjectId(),
    userId: mockObjectId(),
    stub: 'math-question',
    question: '1 + 1?',
    responses: [],
    createdAt: new Date(),
    memoized: {
      messageCount: 0,
      responseCount: 0,
      activeResponses: {},
    },
  };

  return merge(question, overrides);
}
