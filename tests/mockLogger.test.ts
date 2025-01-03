import { describe, expect, it } from 'vitest';
import { MockLogger } from './mocks/MockLogger';

describe('MockLogger', () => {
  it('should log messages in the correct categories', () => {
    const mockLogger = new MockLogger();

    mockLogger.info('Info message');
    mockLogger.error('Error message');
    mockLogger.warn('Warning message');

    expect(mockLogger.logs.info).toContain('Info message');
    expect(mockLogger.logs.error).toContain('Error message');
    expect(mockLogger.logs.warn).toContain('Warning message');
  });

  it('should clear logs when clearLogs is called', () => {
    const mockLogger = new MockLogger();

    mockLogger.info('Info message');
    mockLogger.error('Error message');
    mockLogger.warn('Warning message');

    mockLogger.clearLogs();

    expect(mockLogger.logs.info).toEqual([]);
    expect(mockLogger.logs.error).toEqual([]);
    expect(mockLogger.logs.warn).toEqual([]);
  });
});
