import { Question } from '../question';

/**
 * POST /question
 */
export type CreateQuestionRequest = Pick<Question, 'question' | 'responses'>;
export type CreateQuestionResponse = Question;

/**
 * GET /question/stub/:stub
 */
export interface GetQuestionByStubResponse
  extends Pick<Question, 'question' | 'responses' | 'createdAt'> {
  /**
   * Name of person who created the question
   */
  createdBy: string | null;
}
