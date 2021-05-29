import { ObjectId } from 'mongoose';

export interface Response {
  /**
   * Unique ID of the response
   */
  _id: ObjectId;

  /**
   * The question of which this response is under
   */
  questionId: ObjectId;

  /**
   * The user who created the response
   */
  userId: ObjectId;

  /**
   * The response selected for the question
   */
  response: string;

  /**
   * The date when the response was created
   */
  createdAt: Date;
}

export type MinimalResponse = Pick<
  Response,
  '_id' | 'response' | 'createdAt' | 'userId'
>;
