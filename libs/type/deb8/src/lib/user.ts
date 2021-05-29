import { ObjectId } from 'mongoose';

export interface User {
  /**
   * Unique ID of the user
   */
  _id: ObjectId;

  /**
   * The firebase uid created for the user (only creating anoynmous user accounts)
   */
  uid: string;

  /**
   * Name of the user, this can be automatically generated if the user wishes to remain anonymous.
   */
  name: string;
}
