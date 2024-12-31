import { formatDate } from './dateUtils';

test('formatDate formats the date correctly', () => {
  const date = new Date('2023-12-31');
  expect(formatDate(date, 'YYYY-MM-DD')).toBe('12/31/2023');
  expect(formatDate(date, 'MM/DD')).toBe('12/31');
});
