import { ObjectId } from 'mongoose';

export interface Question {
  /**
   * Unique ID of the question
   */
  _id: ObjectId;

  /**
   * User who created the question
   */
  userId: ObjectId;

  /**
   * The text that is displayed as the question
   */
  question: string;

  /**
   * This list of possible responses that can be selected.
   * Only supporting radio type selection, not allowing checkbox base questions.
   */
  responses: string[];

  /**
   * The date at which the question was created
   */
  createdAt: Date;
}
