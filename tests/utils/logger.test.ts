import { describe, test, expect, vi } from 'vitest';
import { logMessage } from '../../src/utils/logger';

describe('logMessage', () => {
  test('logs the correct message', () => {
    console.log = vi.fn();
    logMessage('Test message');
    expect(console.log).toHaveBeenCalledWith('[LOG]: Test message');
  });
});
