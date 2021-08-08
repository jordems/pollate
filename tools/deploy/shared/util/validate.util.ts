/**
 * Validates that all the given environment variables are populated
 */
export function validateEnv(env: string[]): string[] {
  for (const [idx, value] of env.entries()) {
    if (!value) {
      throw new Error(`Missing env variable at idx ${idx}`);
    }
  }
  return env;
}
