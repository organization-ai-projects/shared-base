import { describe, it, expect, vi, afterEach } from 'vitest';
import { CustomError, handleError } from '../utils/error';

describe('CustomError', () => {
  it('devrait créer une erreur avec un code et un message', () => {
    const error = new CustomError('ERR_CODE', 'An error occurred');
    expect(error.code).toBe('ERR_CODE');
    expect(error.message).toBe('An error occurred');
    expect(error.name).toBe('CustomError');
  });

  it('devrait capturer la stack trace pour le débogage', () => {
    const error = new CustomError('ERR_CODE', 'An error occurred');
    expect(error.stack).toBeDefined();
  });
});

describe('handleError', () => {
  const consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => undefined);

  afterEach(() => {
    consoleErrorSpy.mockClear();
  });

  it("devrait logger le message d'erreur avec le code pour CustomError", () => {
    const error = new CustomError('ERR_CODE', 'An error occurred');
    handleError(error);
    expect(consoleErrorSpy).toHaveBeenCalledWith('[ERR_CODE]: An error occurred');
  });

  it("devrait logger le message d'erreur standard pour Error", () => {
    const error = new Error('Standard error');
    handleError(error);
    expect(consoleErrorSpy).toHaveBeenCalledWith('[Error]: Standard error');
  });
});
