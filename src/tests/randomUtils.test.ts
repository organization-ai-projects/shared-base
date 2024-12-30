// Tests for randomUtils
import { describe, it, expect } from 'vitest';
import { randomString, randomNumber, generateUUID } from '../utils/randomUtils';

describe('randomUtils', () => {
  it('should generate a random string of the correct length', () => {
    const result = randomString(10);
    expect(result).toHaveLength(10);
  });

  it('should generate a random number within the range', () => {
    const result = randomNumber(1, 100);
    expect(result).toBeGreaterThanOrEqual(1);
    expect(result).toBeLessThanOrEqual(100);
  });

  it('should generate a valid UUID', () => {
    const uuid = generateUUID();
    expect(uuid).toMatch(/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/);
  });
});
