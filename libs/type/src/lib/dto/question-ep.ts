import { Question } from '../question';

/**
 * POST /question
 */
export type CreateQuestionRequest = Pick<Question, 'question' | 'responses'>;
export type CreateQuestionResponse = Question;

/**
 * GET /question/stub/:stub
 */
export type GetQuestionByStubResponse = Pick<
  Question,
  '_id' | 'question' | 'responses' | 'createdAt'
>;
