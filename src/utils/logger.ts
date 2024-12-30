import { createLogger, format, transports } from 'winston';
import fs from 'fs';
import { ILogger } from './interfaces/ILogger';

if (!fs.existsSync('logs')) {
  fs.mkdirSync('logs');
}

export class WinstonLogger implements ILogger {
  private logger;

  /**
   * Constructor for the WinstonLogger class.
   * Initializes a new winston Logger instance with the specified configuration.
   * The logger instance is configured to log messages with a timestamp, and log
   * messages at the 'info' level or higher to the console, and log messages at the
   * 'error' level or higher to a file named 'error.log' in the 'logs' directory.
   * All log messages are also logged to a file named 'combined.log' in the 'logs'
   * directory.
   */
  constructor() {
    this.logger = createLogger({
      level: 'info',
      format: format.combine(
        format.timestamp(),
        format.printf(({ timestamp, level, message }) => {
          return `[${timestamp}] ${level.toUpperCase()}: ${message}`;
        }),
      ),
      transports: [
        new transports.Console(),
        new transports.File({ filename: 'logs/error.log', level: 'error' }),
        new transports.File({ filename: 'logs/combined.log' }),
      ],
    });
  }

  /**
   * Format a message to be logged, handling edge cases and circular references.
   * @param message The message to be logged.
   * @returns The formatted message.
   */
  private formatMessage(message: unknown): string {
    if (message === undefined) return 'undefined';
    if (message === null) return 'null';
    if (typeof message === 'function') return message.toString();
    if (typeof message === 'object') {
      try {
        return JSON.stringify(message);
      } catch {
        return 'Circular reference detected';
      }
    }
    return message.toString();
  }

  /**
   * Safely logs a message using the provided logging method, ensuring that any errors
   * encountered during the logging process are caught and handled. If an error occurs
   * while logging, an attempt is made to log the error message to the console. If
   * console logging also fails, the error is silently handled to prevent further
   * exceptions.
   *
   * @param logMethod - The logging method to use for logging the message.
   * @param message - The message to be logged, which can be of any type.
   */

  private logWithCatch(logMethod: (message: string) => void, message: unknown): void {
    try {
      logMethod(this.formatMessage(message));
    } catch (error) {
      try {
        console.error('Logging error:', this.formatMessage(error));
      } catch {
        // Silently handle console errors to prevent further throwing
      }
    }
  }

  info(message: unknown): void {
    this.logWithCatch(this.logger.info.bind(this.logger), message);
  }

  error(message: unknown): void {
    this.logWithCatch(this.logger.error.bind(this.logger), message);
  }

  warn(message: unknown): void {
    this.logWithCatch(this.logger.warn.bind(this.logger), message);
  }
}

export const defaultLogger = new WinstonLogger();
export const { info: logInfo, error: logError, warn: logWarn } = defaultLogger;
