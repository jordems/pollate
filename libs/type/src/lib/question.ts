export interface MemoizedQuestionData {
  /**
   * Total number of responses that have been made on the question
   */
  responseCount: number;
  /**
   * Total number of messages that have been made on the question
   */
  messageCount: number;

  /**
   * Active count of each response on question
   */
  activeResponses: {
    [response: string]: number;
  };
}

export interface Question {
  /**
   * Unique ID of the question
   */
  _id?: string;

  /**
   * Stub to find question from https://.../{stub}
   * @unique
   */
  stub: string;

  /**
   * User who created the question
   */
  userId: string;

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

  /**
   * Memoized objects on question that are updated dynamically
   */
  memoized: MemoizedQuestionData;
}
