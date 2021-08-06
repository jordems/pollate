export interface User {
  /**
   * Unique ID of the user
   */
  _id: string;

  /**
   * Unique name of the user, this can be automatically generated if the user wishes to remain anonymous.
   */
  username: string;
}

export interface AuthUserParams {
  /**
   * User's _id, that is filled from the request headers
   */
  userId: string;
}
