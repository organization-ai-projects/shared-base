import { createLogger, format, transports } from 'winston';
import * as fs from 'fs';

const LOG_DIRECTORY = 'logs';

export class WinstonLogger {
  private logger;

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

  private initializeLogDirectory(): void {
    try {
      if (!fs.existsSync(LOG_DIRECTORY)) {
        fs.mkdirSync(LOG_DIRECTORY);
      }
    } catch (error) {
      console.error('Error creating logs directory:', error);
    }
  }

  info(message: unknown): void {
    try {
      this.logger.info(this.formatMessage(message));
    } catch (error) {
      console.error('Logging error:', error);
    }
  }

  error(message: unknown): void {
    try {
      this.logger.error(this.formatMessage(message));
    } catch (error) {
      console.error('Logging error:', error);
    }
  }

  warn(message: unknown): void {
    try {
      this.logger.warn(this.formatMessage(message));
    } catch (error) {
      console.error('Logging error:', error);
    }
  }

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
