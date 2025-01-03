import { describe, expect, it } from 'vitest';
import { formatDate } from '../../src/utils/dates/dateUtils';

describe('formatDate', () => {
  it("should format date in French when locale is 'fr-FR'", () => {
    const date = new Date('2024-12-25');
    expect(formatDate(date, 'fr-FR')).toBe('25 décembre 2024');
  });

  it("should format date in English when locale is 'en-US'", () => {
    const date = new Date('2024-12-25');
    expect(formatDate(date, 'en-US')).toBe('December 25, 2024');
  });

  it('should allow custom options (e.g., short month)', () => {
    const date = new Date('2024-12-25');
    const options: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    };
    expect(formatDate(date, 'en-US', options)).toBe('Dec 25, 2024');
  });

  it('should throw an error for invalid dates', () => {
    expect(() => formatDate(new Date('invalid-date'))).toThrow('Invalid date provided.');
  });

  it('should handle string date inputs', () => {
    expect(formatDate('2024-12-25', 'fr-FR')).toBe('25 décembre 2024');
  });
});
