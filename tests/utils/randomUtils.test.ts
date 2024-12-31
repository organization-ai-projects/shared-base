import { generateRandomNumber } from './randomUtils';

test('generateRandomNumber generates a number within the range', () => {
  const random = generateRandomNumber(1, 10);
  expect(random).toBeGreaterThanOrEqual(1);
  expect(random).toBeLessThanOrEqual(10);
});
