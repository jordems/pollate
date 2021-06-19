export const alreadyHasResponse =
  'User already has a response on this question';

export const responseDoesNotExistOnQuestion = (responses: string[]): string =>
  `Response entered is invalid, must be one of [${responses}]`;
