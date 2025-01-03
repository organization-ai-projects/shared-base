import { describe, expect, it } from 'vitest';
import { generateDateRange, isDateInRange } from '../../src/utils/dates/rangeUtils';

describe('Range Utilities', () => {
  it('should check if a date is in range', () => {
    expect(isDateInRange('2024-12-25', '2024-12-24', '2024-12-26')).toBe(true);
    expect(isDateInRange('2024-12-23', '2024-12-24', '2024-12-26')).toBe(false);
  });

  it('should generate a range of dates', () => {
    const range = generateDateRange('2024-12-25', '2024-12-28', 1);
    expect(range).toEqual(['2024-12-25', '2024-12-26', '2024-12-27']);
  });
});
