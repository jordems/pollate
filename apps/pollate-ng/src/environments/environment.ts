// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.
import { NgEnvironment } from '@pollate/ng/shared/environment';

export const environment: NgEnvironment = {
  env: 'development',
  api: 'http://localhost:3000/v1/',
  firebase: {
    apiKey: 'AIzaSyB7W_9Jr6IBHPz_BVNed7qVjLZ-BjnJ5-8',
    authDomain: 'pollate-a7818.firebaseapp.com',
    projectId: 'pollate-a7818',
    storageBucket: 'pollate-a7818.appspot.com',
    messagingSenderId: '488534076944',
    appId: '1:488534076944:web:cb6853a93d82b856fd6495',
  },
};
