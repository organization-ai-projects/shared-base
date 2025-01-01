import fs from 'fs';
import winston from 'winston';
import { ILogger } from './interfaces/ILogger';

const LOG_DIRECTORY = process.env.LOG_DIRECTORY || 'logs';
const LOG_LEVEL = process.env.LOG_LEVEL || 'info';
const COMBINED_LOG = `${LOG_DIRECTORY}/combined.log`;

export class WinstonLogger implements ILogger {
  private logger: winston.Logger;

  constructor() {
    this.createLogDirectory();

    this.logger = winston.createLogger({
      level: LOG_LEVEL,
      format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.printf((info) => `[${info.timestamp}] ${info.level}: ${info.message}`),
      ),
      transports: [
        new winston.transports.Console({
          format: winston.format.combine(winston.format.colorize(), winston.format.simple()),
        }),
        new winston.transports.File({ filename: COMBINED_LOG }),
      ],
    });
  }

  private createLogDirectory(): void {
    if (!fs.existsSync(LOG_DIRECTORY)) {
      fs.mkdirSync(LOG_DIRECTORY, { recursive: true });
    }
  }

  info(message: unknown): void {
    this.logger.info(this.formatMessage(message));
  }

  error(message: unknown): void {
    this.logger.error(this.formatMessage(message));
  }

  warn(message: unknown): void {
    this.logger.warn(this.formatMessage(message));
  }

  private formatMessage(message: unknown): string {
    if (message instanceof Error) {
      return message.stack || message.message;
    }
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
}

export default WinstonLogger;
