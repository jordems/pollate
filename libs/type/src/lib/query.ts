export interface PaginateParams {
  /**
   * ObjectId to start the search at
   */
  startId: string | null;
  /**
   * Number of results to be returned
   */
  limit: number;
}
