export interface User {
  /**
   * Unique ID of the user
   */
  _id: string;

  /**
   * The firebase uid created for the user (only creating anoynmous user accounts)
   */
  uid: string;

  /**
   * Name of the user, this can be automatically generated if the user wishes to remain anonymous.
   */
  name: string;
}

export interface AuthUserParams {
  /**
   * User's _id, that is filled from the request headers
   */
  userId: string;
}
