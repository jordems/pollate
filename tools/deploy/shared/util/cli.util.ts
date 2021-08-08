import { exec } from 'child_process';

/**
 * Performs a cli command of
 *
 * @param command - The cli command to be executed
 * @example
 * const res = await cli('ls');
 * console.log(res);
 * // README.md angular.json apps ...
 */
export function cli(command: string): Promise<string> {
  return new Promise((resolve, reject) => {
    exec(command, (err, stdOut, stdError) => {
      if (err || stdError) {
        reject(err || stdError);
      }
      resolve(stdOut);
    });
  });
}
