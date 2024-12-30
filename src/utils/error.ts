export class CustomError extends Error {
  /**
   * Creates an instance of CustomError.
   *
   * @param code - A string representing the error code.
   * @param message - A string providing a description of the error.
   */

  constructor(
    public code: string,
    message: string,
  ) {
    super(message);
    this.name = 'CustomError';

    // Maintenir la trace de l'erreur pour faciliter le débogage
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, CustomError);
    }
  }
}

/**
 * Logs an error to the console. If the error is an instance of Error,
 * it logs the error message, otherwise it logs the error as a string.
 *
 * @param error - The error to log
 */
export function handleError(error: unknown): void {
  if (error instanceof Error) {
    console.error(`[Error]: ${error.message}`);
  } else {
    console.error(`[Unknown Error]: ${String(error)}`);
  }
}
