export interface Message {
  /**
   * Unique ID of the message
   */
  _id?: string;

  /**
   * User who created the message
   */
  userId: string;

  /**
   * Question the message was created under
   */
  questionId: string;

  /**
   * Name of the user who created the message at the time of creation.
   * - Bit of data duplication to make the query more optimal
   */
  name: string;

  /**
   * Contents of the message
   */
  text: string;

  /**
   * Date of which the message was created
   */
  createdAt: Date;
}

export type MinimalMessage = Pick<Message, 'name' | 'text' | 'createdAt'>;
