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
    Error.captureStackTrace(this, this.constructor);
  }
}

/**
 * Logs an error to the console. If the error is an instance of Error,
 * it logs the error message, otherwise it logs the error as a string.
 *
 * @param error - The error to log
 */
export function handleError(error: Error | CustomError): void {
  const prefix = error instanceof CustomError ? `[${error.code}]` : '[Error]';
  console.error(`${prefix}: ${error.message}`);
}
