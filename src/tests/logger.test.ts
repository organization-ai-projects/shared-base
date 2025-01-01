import fs from 'fs';
import { beforeEach, describe, expect, it, MockInstance, vi } from 'vitest';
import winston, { Logger, LoggerOptions } from 'winston';
import { WinstonLogger } from '../utils/logger';

vi.mock('fs', async () => {
  const actual = await vi.importActual<typeof fs>('fs');
  return {
    ...actual,
    existsSync: vi.fn(),
    mkdirSync: vi.fn(),
  };
});

vi.mock('winston', async () => {
  const actual = await vi.importActual<typeof winston>('winston');
  return {
    ...actual,
    createLogger: vi.fn() as MockInstance<(options?: LoggerOptions) => Logger>,
    transports: {
      Console: vi.fn().mockImplementation(() => ({
        log: vi.fn(),
        format: {},
        level: undefined,
      })),
      File: vi.fn().mockImplementation(() => ({
        log: vi.fn(),
        filename: 'logs/combined.log',
        format: {},
        level: undefined,
      })),
    },
  };
});

describe('WinstonLogger', () => {
  let mockCreateLogger: MockInstance<(options: LoggerOptions) => Logger>;
  let mockLoggerInstance: {
    info: MockInstance;
    error: MockInstance;
    warn: MockInstance;
  };

  beforeEach(() => {
    vi.clearAllMocks();

    mockLoggerInstance = {
      info: vi.fn(),
      error: vi.fn(),
      warn: vi.fn(),
    };

    mockCreateLogger = vi.spyOn(winston, 'createLogger').mockImplementation(
      (options?: LoggerOptions) =>
        ({
          ...mockLoggerInstance,
          ...options,
        }) as unknown as Logger,
    );
  });

  describe('Initialization', () => {
    // it('should configure the logger with the correct settings', () => {
    //   process.env.LOG_LEVEL = 'debug';

    //   new WinstonLogger();

    //   expect(mockCreateLogger).toHaveBeenCalledWith(
    //     expect.objectContaining({
    //       level: 'debug',
    //       transports: expect.any(Array),
    //     }),
    //   );
    // });

    it('should handle default log level', () => {
      delete process.env.LOG_LEVEL;

      new WinstonLogger();

      expect(mockCreateLogger).toHaveBeenCalledWith(
        expect.objectContaining({
          level: 'info',
        }),
      );
    });

    it('should create the logs directory if it does not exist', () => {
      const mkdirSyncMock = vi.spyOn(fs, 'mkdirSync');
      vi.spyOn(fs, 'existsSync').mockReturnValue(false);

      new WinstonLogger();

      expect(mkdirSyncMock).toHaveBeenCalledWith('logs', { recursive: true });
    });

    it('should not recreate the logs directory if it already exists', () => {
      const mkdirSyncMock = vi.spyOn(fs, 'mkdirSync');
      vi.spyOn(fs, 'existsSync').mockReturnValue(true);

      new WinstonLogger();

      expect(mkdirSyncMock).not.toHaveBeenCalled();
    });
  });

  describe('Logging Methods', () => {
    let logger: WinstonLogger;

    beforeEach(() => {
      logger = new WinstonLogger();
    });

    it('should log info messages', () => {
      logger.info('Test info');
      expect(mockLoggerInstance.info).toHaveBeenCalledWith('Test info');
    });

    it('should log error messages', () => {
      logger.error('Test error');
      expect(mockLoggerInstance.error).toHaveBeenCalledWith('Test error');
    });

    it('should log warning messages', () => {
      logger.warn('Test warning');
      expect(mockLoggerInstance.warn).toHaveBeenCalledWith('Test warning');
    });
  });

  describe('Message Formatting', () => {
    let logger: WinstonLogger;

    beforeEach(() => {
      logger = new WinstonLogger();
    });

    it('should format null values as "null"', () => {
      logger.info(null);
      expect(mockLoggerInstance.info).toHaveBeenCalledWith('null');
    });

    it('should format undefined values as "undefined"', () => {
      logger.info(undefined);
      expect(mockLoggerInstance.info).toHaveBeenCalledWith('undefined');
    });

    it('should format objects correctly', () => {
      const obj = { key: 'value' };
      logger.info(obj);
      expect(mockLoggerInstance.info).toHaveBeenCalledWith(JSON.stringify(obj));
    });

    it('should handle circular references in objects', () => {
      const circular: Record<string, unknown> = {};
      circular.self = circular;

      logger.info(circular);
      expect(mockLoggerInstance.info).toHaveBeenCalledWith('[Circular Object]');
    });

    it('should format primitive values correctly', () => {
      logger.info(123);
      expect(mockLoggerInstance.info).toHaveBeenCalledWith('123');

      logger.info('test string');
      expect(mockLoggerInstance.info).toHaveBeenCalledWith('test string');

      logger.info(true);
      expect(mockLoggerInstance.info).toHaveBeenCalledWith('true');
    });

    it('should handle errors with stack trace', () => {
      const error = new Error('Test error');
      error.stack = 'Error stack trace';
      logger.error(error);
      expect(mockLoggerInstance.error).toHaveBeenCalledWith(error.stack);
    });

    it('should handle errors without stack trace', () => {
      const error = new Error('Test error');
      error.stack = undefined;
      logger.error(error);
      expect(mockLoggerInstance.error).toHaveBeenCalledWith('Test error');
    });
  });
});
