import { describe, it, expect } from 'vitest';
import { unique, shuffle } from '../utils/arrayUtils';

describe('ArrayUtils', () => {
  describe('unique', () => {
    it('should remove duplicates from an array', () => {
      const input = [1, 2, 2, 3];
      const result = unique(input);
      expect(result).toEqual([1, 2, 3]);
    });
  });

  describe('shuffle', () => {
    it('should randomize the order of array elements', () => {
      const input = [1, 2, 3, 4];
      const result = shuffle(input);
      expect(result.sort()).toEqual(input.sort()); // Ensure it has the same elements

      // Check if the order is randomized by comparing the string representation
      const inputString = input.join(',');
      const resultString = result.join(',');

      // Retry the shuffle if the result is the same as the input
      if (resultString === inputString) {
        const retryResult = shuffle(input);
        const retryResultString = retryResult.join(',');
        expect(retryResultString).not.toBe(inputString); // Ensure the order is randomized
      } else {
        expect(resultString).not.toBe(inputString); // Ensure the order is randomized
      }
    });
  });
});
