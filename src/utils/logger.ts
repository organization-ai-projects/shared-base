import { createLogger, format, transports } from 'winston';
import * as fs from 'fs';

const LOG_DIRECTORY = 'logs';

export class WinstonLogger {
  private logger;

  /**
   * Constructs a new instance of the WinstonLogger.
   * Initializes the logging directory and sets up the logger with specified transports and format.
   * Uses environment variables for log levels and file locations, providing defaults as necessary.
   */

  constructor() {
    this.initializeLogDirectory();

    this.logger = createLogger({
      level: process.env.LOG_LEVEL || 'info',
      format: format.combine(
        format.timestamp(),
        format.printf(({ timestamp, level, message }) => {
          return `[${timestamp}] ${level.toUpperCase()}: ${message}`;
        }),
      ),
      transports: [
        new transports.Console(),
        new transports.File({
          filename: process.env.ERROR_LOG || `${LOG_DIRECTORY}/error.log`,
          level: 'error',
        }),
        new transports.File({
          filename: process.env.COMBINED_LOG || `${LOG_DIRECTORY}/combined.log`,
        }),
      ],
    });
  }

  /**
   * Initializes the logging directory.  If the directory does not exist,
   * an attempt is made to create it.  If the directory cannot be created,
   * an error message is logged to the console.
   */
  private initializeLogDirectory(): void {
    try {
      if (!fs.existsSync(LOG_DIRECTORY)) {
        fs.mkdirSync(LOG_DIRECTORY);
      }
    } catch (error) {
      console.error('Error creating logs directory:', error);
    }
  }

  /**
   * Logs an informational message to the console and to the combined log file.
   * This method catches and logs any exceptions that occur during the logging
   * process.
   * @param message The message to log.
   */
  info(message: unknown): void {
    try {
      this.logger.info(this.formatMessage(message));
    } catch (error) {
      console.error('Logging error:', error);
    }
  }

  /**
   * Logs an error message to the console and to the error log file.
   * This method catches and logs any exceptions that occur during the logging
   * process.
   * @param message The message to log.
   */
  error(message: unknown): void {
    try {
      this.logger.error(this.formatMessage(message));
    } catch (error) {
      console.error('Logging error:', error);
    }
  }

  /**
   * Logs a warning message to the console and to the combined log file.
   * This method catches and logs any exceptions that occur during the logging
   * process.
   * @param message The message to log.
   */

  warn(message: unknown): void {
    try {
      this.logger.warn(this.formatMessage(message));
    } catch (error) {
      console.error('Logging error:', error);
    }
  }

  /**
   * Converts various types of input messages into a string format suitable for logging.
   * - Returns 'null' for null values.
   * - Returns 'undefined' for undefined values.
   * - For Error instances, returns the stack trace if available, otherwise the error message.
   * - For objects, attempts to convert to a JSON string; returns '[Circular Object]' if serialization fails.
   * - Converts all other types to their string representation.
   *
   * @param message - The message to format, which can be of any type.
   * @returns The formatted string representation of the message.
   */

  private formatMessage(message: unknown): string {
    if (message === null) return 'null';
    if (message === undefined) return 'undefined';
    if (message instanceof Error) {
      return message.stack || message.message;
    }
    if (typeof message === 'object') {
      try {
        return JSON.stringify(message);
      } catch {
        return '[Circular Object]';
      }
    }
    return String(message);
  }
}
