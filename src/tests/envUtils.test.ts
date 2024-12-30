// Tests for envUtils
import { describe, it, expect } from 'vitest';
import { getEnv, requireEnv } from '../utils/envUtils';

describe('envUtils', () => {
  it('should return the default value if the variable is not defined', () => {
    expect(getEnv('UNDEFINED_VAR', 'default')).toBe('default');
  });

  it('should return the value of a defined variable', () => {
    process.env.TEST_VAR = 'test-value';
    expect(getEnv('TEST_VAR')).toBe('test-value');
  });

  it('should throw an error if a required variable is not defined', () => {
    expect(() => requireEnv('UNDEFINED_VAR')).toThrowError(
      'Environment variable "UNDEFINED_VAR" is required but not defined.',
    );
  });
});
