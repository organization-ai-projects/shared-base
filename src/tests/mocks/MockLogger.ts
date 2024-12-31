import { ILogger } from '../../utils/interfaces/ILogger';

export class MockLogger implements ILogger {
  logs: Record<'info' | 'error' | 'warn', string[]> = {
    info: [],
    error: [],
    warn: [],
  };

  /**
   * Log an informational message.
   * @param message The message to log.
   */
  info(message: unknown): void {
    this.logs.info.push(this.formatMessage(message));
  }

  /**
   * Log an error message.
   * @param message The message to log.
   */
  error(message: unknown): void {
    this.logs.error.push(this.formatMessage(message));
  }

  /**
   * Log a warning message.
   * @param message The message to log.
   */
  warn(message: unknown): void {
    this.logs.warn.push(this.formatMessage(message));
  }

  /**
   * Format the message to a string before logging it.
   * Handles various types of input gracefully.
   * @param message The message to format.
   * @returns The formatted message.
   */
  private formatMessage(message: unknown): string {
    if (message === null) return 'null';
    if (message === undefined) return 'undefined';
    if (typeof message === 'object') {
      try {
        return JSON.stringify(message);
      } catch {
        return '[Circular Object]';
      }
    }
    return String(message);
  }

  /**
   * Clear all logged messages.
   * Useful for testing purposes.
   */
  clearLogs(): void {
    this.logs = { info: [], error: [], warn: [] };
  }
}
