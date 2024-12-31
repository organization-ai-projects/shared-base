import { describe, test, expect } from 'vitest';
import { generateRandomNumber } from '../../src/utils/randomUtils';

describe('generateRandomNumber', () => {
  test('generates a number within the range', () => {
    const random = generateRandomNumber(1, 10);
    expect(random).toBeGreaterThanOrEqual(1);
    expect(random).toBeLessThanOrEqual(10);
  });
});
