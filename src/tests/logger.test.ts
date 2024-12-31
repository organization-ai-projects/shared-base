import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import type { ILogger } from '../utils/interfaces/ILogger';

const mockConsoleError = vi.fn();
vi.stubGlobal('console', { error: mockConsoleError });

const mockFs = vi.hoisted(() => ({
  existsSync: vi.fn(),
  mkdirSync: vi.fn(),
}));

const mockWinston = vi.hoisted(() => ({
  createLogger: vi.fn(),
  format: {
    combine: vi.fn(),
    timestamp: vi.fn(),
    printf: vi.fn(),
  },
  transports: {
    Console: vi.fn(),
    File: vi.fn(),
  },
}));

vi.mock('fs', () => ({
  ...mockFs,
  default: mockFs,
}));

vi.mock('winston', () => mockWinston);

import { WinstonLogger } from '../utils/logger';

interface CircularObject {
  self?: CircularObject;
}

describe('Logger', () => {
  let logger: ILogger;
  let mockLoggerInstance: { info: any; error: any; warn: any; };

  beforeEach(() => {
    vi.clearAllMocks();
    mockLoggerInstance = {
      info: vi.fn(),
      error: vi.fn(),
      warn: vi.fn(),
    };
    mockWinston.createLogger.mockReturnValue(mockLoggerInstance);
    logger = new WinstonLogger();
  });

  describe('Configuration', () => {
    let originalEnv: NodeJS.ProcessEnv;

    beforeEach(() => {
      originalEnv = process.env;
      process.env = { ...originalEnv };
      vi.clearAllMocks();
      mockFs.existsSync.mockReturnValue(true);
    });

    afterEach(() => {
      process.env = originalEnv;
    });

    it('should create the logs folder if it does not exist', () => {
      mockFs.existsSync.mockReturnValue(false);
      new WinstonLogger();
      expect(mockFs.mkdirSync).toHaveBeenCalledWith('logs');
    });

    it('should not create the logs folder if it already exists', () => {
      mockFs.existsSync.mockReturnValue(true);
      new WinstonLogger();
      expect(mockFs.mkdirSync).not.toHaveBeenCalled();
    });

    it('devrait utiliser le LOG_LEVEL de process.env si défini', () => {
      process.env.LOG_LEVEL = 'debug';
      new WinstonLogger();
      expect(mockWinston.createLogger).toHaveBeenCalledWith(
        expect.objectContaining({
          level: 'debug'
        })
      );
    });

    it('devrait utiliser "info" comme niveau par défaut', () => {
      delete process.env.LOG_LEVEL;
      new WinstonLogger();
      expect(mockWinston.createLogger).toHaveBeenCalledWith(
        expect.objectContaining({
          level: 'info'
        })
      );
    });

    it('devrait configurer les chemins de fichiers de log personnalisés', () => {
      process.env.ERROR_LOG = 'custom/error.log';
      process.env.COMBINED_LOG = 'custom/combined.log';
      
      new WinstonLogger();

      expect(mockWinston.transports.File).toHaveBeenCalledWith(
        expect.objectContaining({
          filename: 'custom/error.log',
          level: 'error'
        })
      );

      expect(mockWinston.transports.File).toHaveBeenCalledWith(
        expect.objectContaining({
          filename: 'custom/combined.log'
        })
      );
    });
  });

  describe('Logging functionality', () => {
    it('should log info messages correctly', () => {
      logger = new WinstonLogger();
      logger.info('Test info message');
      expect(mockLoggerInstance.info).toHaveBeenCalledWith('Test info message');
    });

    it('should log error messages correctly', () => {
      logger = new WinstonLogger();
      logger.error('Test error message');
      expect(mockLoggerInstance.error).toHaveBeenCalledWith('Test error message');
    });

    it('should log warning messages correctly', () => {
      logger = new WinstonLogger();
      logger.warn('Test warning message');
      expect(mockLoggerInstance.warn).toHaveBeenCalledWith('Test warning message');
    });
  });

  describe('Error handling', () => {
    it('should handle logging errors without crashing', () => {
      const error = new Error('Logging error');
      mockLoggerInstance.info.mockImplementation(() => {
        throw error;
      });

      logger = new WinstonLogger();
      expect(() => logger.info('test')).not.toThrow();

      expect(mockConsoleError).toHaveBeenCalledWith('Logging error:', error);
    });

    it('should handle folder creation errors', () => {
      const testError = new Error('Folder creation error');
      mockFs.existsSync.mockReturnValue(false);
      mockFs.mkdirSync.mockImplementation(() => {
        throw testError;
      });

      expect(() => new WinstonLogger()).not.toThrow();
      expect(mockConsoleError).toHaveBeenCalledWith('Error creating logs directory:', testError);
    });
  });

  describe('Message formatting', () => {
    beforeEach(() => {
      vi.clearAllMocks();
      mockFs.existsSync.mockReturnValue(true);
      logger = new WinstonLogger();
    });

    it('should handle null values', () => {
      logger.info(null);
      expect(mockLoggerInstance.info).toHaveBeenCalledWith('null');
    });

    it('should handle undefined values', () => {
      logger.info(undefined);
      expect(mockLoggerInstance.info).toHaveBeenCalledWith('undefined');
    });

    it('should format objects correctly', () => {
      const testObj = { key: 'value' };
      logger.info(testObj);
      expect(mockLoggerInstance.info).toHaveBeenCalledWith(JSON.stringify(testObj));
    });

    it('should handle circular objects', () => {
      const circularObj: any = { self: null };
      circularObj.self = circularObj;
      logger.info(circularObj);
      expect(mockLoggerInstance.info).toHaveBeenCalledWith('[Circular Object]');
    });

    it('should handle non-serializable objects gracefully', () => {
      const bigint = BigInt(1234567890123456789);
      logger.info(bigint);
      expect(mockLoggerInstance.info).toHaveBeenCalledWith(bigint.toString());
    });

    it('devrait formater correctement une Error avec stack', () => {
      const errorWithStack = new Error('Test error');
      errorWithStack.stack = 'Error: Test error\n    at Test.stack';
      logger.error(errorWithStack);
      expect(mockLoggerInstance.error).toHaveBeenCalledWith(errorWithStack.stack);
    });

    it('devrait formater correctement une Error sans stack', () => {
      const errorNoStack = new Error('Test error');
      errorNoStack.stack = undefined;
      logger.error(errorNoStack);
      expect(mockLoggerInstance.error).toHaveBeenCalledWith(errorNoStack.message);
    });

    it('devrait gérer le cas warn sans message', () => {
      logger.warn(undefined);
      expect(mockLoggerInstance.warn).toHaveBeenCalledWith('undefined');
    });

    beforeEach(() => {
      mockFs.existsSync.mockReturnValue(true);
      const timestampFn = () => '2024-03-14T12:00:00.000Z';
      mockWinston.format.timestamp.mockReturnValue(timestampFn);
      mockWinston.format.printf.mockImplementation(fn => {
        const result = fn({
          timestamp: timestampFn(),
          level: 'info',
          message: 'test message'
        });
        expect(result).toBe('[2024-03-14T12:00:00.000Z] INFO: test message');
        return result;
      });
    });

    it('devrait formater les messages avec timestamp et niveau', () => {
      new WinstonLogger();
      expect(mockWinston.format.printf).toHaveBeenCalled();
    });
  });

  describe('Gestion des erreurs', () => {
    beforeEach(() => {
      vi.clearAllMocks();
      mockFs.existsSync.mockReturnValue(true);
      mockLoggerInstance = {
        info: vi.fn(),
        error: vi.fn(),
        warn: vi.fn(),
      };
      mockWinston.createLogger.mockReturnValue(mockLoggerInstance);
      logger = new WinstonLogger();
    });

    it('devrait gérer les erreurs de logging pour info', () => {
      const erreur = new Error('Erreur info');
      mockLoggerInstance.info.mockImplementation(() => {
        throw erreur;
      });

      logger.info('test');
      expect(mockConsoleError).toHaveBeenLastCalledWith(
        'Logging error:',
        erreur
      );
    });

    it('devrait gérer les erreurs de logging pour error', () => {
      const erreur = new Error('Erreur error');
      mockLoggerInstance.error.mockImplementation(() => {
        throw erreur;
      });

      logger.error('test');
      expect(mockConsoleError).toHaveBeenLastCalledWith(
        'Logging error:',
        erreur
      );
    });

    it('devrait gérer les erreurs de logging pour warn', () => {
      const erreur = new Error('Erreur warn');
      mockLoggerInstance.warn.mockImplementation(() => {
        throw erreur;
      });

      logger.warn('test');
      expect(mockConsoleError).toHaveBeenLastCalledWith(
        'Logging error:',
        erreur
      );
    });

    it('devrait gérer les erreurs de formatage des objets circulaires', () => {
      const erreurCirculaire = new Error('Erreur de sérialisation JSON');
      const circularRef: CircularObject = {};
      circularRef.self = circularRef;
      
      logger.info(circularRef);
      expect(mockLoggerInstance.info).toHaveBeenCalledWith('[Circular Object]');
    });
  });
});
