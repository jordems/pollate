export const NG_ENVIRONMENT = 'ng_environment' as const;

export type EnvType = 'development' | 'production';

export interface NgEnvironment {
  /**
   * Configuration value to determine which environment the application is running under
   */
  env: EnvType;

  /**
   * The base url of the api server
   */
  api: string;

  /**
   * Firebase client details
   */
  firebase: {
    apiKey: string;
    authDomain: string;
    projectId: string;
    storageBucket: string;
    messagingSenderId: string;
    appId: string;
  };
}
