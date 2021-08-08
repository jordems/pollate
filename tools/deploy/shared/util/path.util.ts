import { join } from 'path';
import { cwd } from 'process';

/**
 * Given the name of the app this function returns the absolute path to it's build directory
 *
 * @param app - The name of the app to get build path
 */
export function getBuildPath(app: string): string {
  return join(cwd(), `dist/apps/${app}`);
}

/**
 * Given the name of the app this function returns the absolute path to it's docker file
 * - Not required for all apps.
 *
 * @param app
 */
export function getDockerFilePath(app: string): string {
  return join(cwd(), `tools/deploy/${app}/Dockerfile`);
}
