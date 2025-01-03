import { describe, expect, it } from 'vitest';
import { removeDuplicates, shuffle, unique } from '../src/utils/arrayUtils';

describe('ArrayUtils', () => {
  describe('unique', () => {
    it('should remove duplicates from an array', () => {
      const input = [1, 2, 2, 3];
      const result = unique(input);
      expect(result).toEqual([1, 2, 3]);
    });

    it('should return an empty array when given an empty array input', () => {
      const input: number[] = [];
      const result = removeDuplicates(input);
      expect(result).toEqual([]);
      expect(result).not.toBe(input); // Ensure a new array is returned
    });

    it('should return a new array instance, not modifying the original', () => {
      const input = [1, 2, 2, 3];
      const result = removeDuplicates(input);
      expect(result).not.toBe(input);
      expect(input).toEqual([1, 2, 2, 3]);
      expect(result).toEqual([1, 2, 3]);
    });

    it('should work correctly with an array of strings', () => {
      const input = ['apple', 'banana', 'apple', 'cherry', 'banana', 'date'];
      const result = unique(input);
      expect(result).toEqual(['apple', 'banana', 'cherry', 'date']);
      expect(result).not.toBe(input); // Ensure a new array is returned
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

    it('should return a new array instance, not modifying the original', () => {
      const input = [1, 2, 3, 4, 5];
      const result = shuffle(input);
      expect(result).not.toBe(input);
      expect(input).toEqual([1, 2, 3, 4, 5]);
      expect(result.sort()).toEqual(input.sort());
    });
  });
});
