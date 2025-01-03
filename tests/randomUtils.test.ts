// Tests for randomUtils
import { describe, expect, it } from 'vitest';
import { generateRandomNumber, generateUUID, randomString } from '../src/utils/randomUtils';

describe('randomUtils', () => {
  it('should generate a random string of specified length', () => {
    const length = 10;
    const result = randomString(length);
    expect(result).toHaveLength(length);
    expect(result).toMatch(/^[A-Za-z0-9]+$/);
  });

  it('should generate a random number within the specified range', () => {
    const min = 1;
    const max = 10;
    const result = generateRandomNumber(min, max);
    expect(result).toBeGreaterThanOrEqual(min);
    expect(result).toBeLessThanOrEqual(max);
  });

  it('should generate a valid UUID', () => {
    const uuid = generateUUID();
    expect(uuid).toMatch(/^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i);
  });
});
