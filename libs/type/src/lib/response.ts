export interface Response {
  /**
   * Unique ID of the response
   */
  _id?: string;

  /**
   * The question of which this response is under
   */
  questionId: string;

  /**
   * The user who created the response
   */
  userId: string;

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
