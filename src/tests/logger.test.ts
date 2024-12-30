import { describe, it, expect, vi, beforeEach } from 'vitest';
import '../tests/mocks/winston.mock'; // Important: importer d'abord le mock
import { WinstonLogger } from '../utils/logger';
import { mockLogger } from './mocks/winston.mock';

describe('Logger', () => {
  let logger: WinstonLogger;

  beforeEach(() => {
    logger = new WinstonLogger();
    vi.clearAllMocks();
  });

  it('should log info messages', () => {
    logger.info('Info message');
    expect(mockLogger.info).toHaveBeenCalledWith('Info message');
  });

  it('should log error messages', () => {
    logger.error('Error message');
    expect(mockLogger.error).toHaveBeenCalledWith('Error message');
  });

  it('should log warning messages', () => {
    logger.warn('Warning message');
    expect(mockLogger.warn).toHaveBeenCalledWith('Warning message');
  });

  it('should handle logging of non-string messages', () => {
    const numberMessage = 42;
    const objectMessage = { key: 'value' };

    logger.info(numberMessage);
    expect(mockLogger.info).toHaveBeenCalledWith('42');

    logger.info(objectMessage);
    expect(mockLogger.info).toHaveBeenCalledWith(JSON.stringify(objectMessage));
  });

  it('should handle logging of undefined messages', () => {
    logger.warn(undefined);
    expect(mockLogger.warn).toHaveBeenCalledWith('undefined');
  });

  it('should handle logging of null messages', () => {
    logger.warn(null);
    expect(mockLogger.warn).toHaveBeenCalledWith('null');
  });

  it('should handle logging of function messages', () => {
    const functionMessage = (): string => 'Function message';
    logger.warn(functionMessage);
    expect(mockLogger.warn).toHaveBeenCalledWith(functionMessage.toString());
  });

  it('should gracefully handle circular references', () => {
    const circularObj: Record<string, unknown> = {};
    circularObj.circularRef = circularObj;

    logger.info(circularObj);
    expect(mockLogger.info).toHaveBeenCalledWith('Circular reference detected');
  });

  it('should handle errors during transport logging', () => {
    mockLogger.info.mockImplementation(() => {
      throw new Error('Transport error');
    });

    expect(() => logger.info('Message that fails')).not.toThrow();
    expect(mockLogger.info).toHaveBeenCalledWith('Message that fails');
  });

  it('should not throw even if both logging and error handling fail', () => {
    const consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => {
      throw new Error('Console error failed');
    });

    mockLogger.warn.mockImplementation(() => {
      throw new Error('Logging error');
    });

    expect(() => logger.warn('Test message')).not.toThrow();

    consoleErrorSpy.mockRestore();
  });
});
