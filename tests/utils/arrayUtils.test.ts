import { removeDuplicates } from './arrayUtils';

test('removeDuplicates removes duplicate elements', () => {
  const input = [1, 2, 2, 3, 4, 4];
  const output = removeDuplicates(input);
  expect(output).toEqual([1, 2, 3, 4]);
});
