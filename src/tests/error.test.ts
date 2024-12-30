import { describe, it, expect, vi, afterEach, afterAll } from 'vitest';
import { CustomError, handleError } from '../utils/error';

describe('CustomError', () => {
  it('should create an error with a code and message', () => {
    const error = new CustomError('ERR_CODE', 'An error occurred');
    expect(error.code).toBe('ERR_CODE');
    expect(error.message).toBe('An error occurred');
    expect(error.name).toBe('CustomError');
  });

  it('should capture stack trace for debugging', () => {
    const error = new CustomError('ERR_CODE', 'An error occurred');
    expect(error.stack).toBeDefined();
  });
});

describe('handleError', () => {
  const consoleErrorMock = vi.spyOn(console, 'error').mockImplementation((_message) => {
    // Implémentation de mock pour console.error
    // Mocked console.error: ${message}
  });

  afterEach(() => {
    consoleErrorMock.mockClear();
  });

  afterAll(() => {
    consoleErrorMock.mockRestore();
  });

  it('should log the error message', () => {
    const error = new CustomError('ERR_CODE', 'An error occurred');
    handleError(error);
    expect(consoleErrorMock).toHaveBeenCalledWith('[Error]: An error occurred');
  });
});
