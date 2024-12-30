import { describe, it, expect } from 'vitest';
import { MockLogger } from './mocks/MockLogger';

describe('MockLogger', () => {
  it('should log messages in the correct categories', () => {
    const mockLogger = new MockLogger();

    // Ajouter des messages
    mockLogger.info('Info message');
    mockLogger.error('Error message');
    mockLogger.warn('Warning message');

    // Vérifier les logs
    expect(mockLogger.logs.info).toContain('Info message');
    expect(mockLogger.logs.error).toContain('Error message');
    expect(mockLogger.logs.warn).toContain('Warning message');
  });

  it('should clear logs when clearLogs is called', () => {
    const mockLogger = new MockLogger();

    // Ajouter des messages
    mockLogger.info('Info message');
    mockLogger.error('Error message');
    mockLogger.warn('Warning message');

    // Réinitialiser les logs
    mockLogger.clearLogs();

    // Vérifier que les logs sont vides
    expect(mockLogger.logs.info).toEqual([]);
    expect(mockLogger.logs.error).toEqual([]);
    expect(mockLogger.logs.warn).toEqual([]);
  });
});
