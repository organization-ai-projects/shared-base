// Utilities for environment variables
/**
 * Get the value of an environment variable, with an optional default value.
 * @param key - The environment variable name.
 * @param defaultValue - The default value if the variable is not defined.
 * @returns The value of the environment variable or the default value.
 */
export function getEnv(key: string, defaultValue: string = ''): string {
  const value = process.env[key];
  if (value === undefined || value === '') {
    return defaultValue;
  }
  return value;
}

/**
 * Ensure a required environment variable is defined.
 * @param key - The environment variable name.
 * @throws Error if the environment variable is not defined.
 */
export function requireEnv(key: string): string {
  const value = process.env[key];
  if (value === undefined || value === '') {
    throw new Error(`Environment variable "${key}" is required but not defined.`);
  }
  return value;
}
