import { ObjectId } from 'mongoose';

export interface PaginateParams {
  /**
   * ObjectId to start the search at
   */
  startId: ObjectId | null;
  /**
   * Number of results to be returned
   */
  limit: number;
}
