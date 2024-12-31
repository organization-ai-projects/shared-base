import { describe, test, expect } from 'vitest';
import { removeDuplicates } from '../../src/utils/arrayUtils';

describe('removeDuplicates', () => {
  test('removes duplicate elements', () => {
    const input = [1, 2, 2, 3, 4, 4];
    const output = removeDuplicates(input);
    expect(output).toEqual([1, 2, 3, 4]);
  });
});
