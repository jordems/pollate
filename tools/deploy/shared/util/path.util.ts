import { join } from 'path';
import { cwd } from 'process';

/**
 * Given the name of the app this function returns the absolute path to it's build directory
 *
 * @param app - The name of the app to get build path
 */
export function getBuildPath(app: string) {
  return join(cwd(), `dist/apps/${app}`);
}
