import { describe, it, expect } from 'vitest';
import {
  isWeekend,
  dateDifference,
  isValidDate,
  addDays,
  subtractDays,
  formatDateAdvanced,
} from '../../utils/dates/advancedDateUtils';

describe('Advanced Date Utilities', () => {
  it('should check if a date is a weekend', () => {
    expect(isWeekend('2024-12-30')).toBe(false);
    expect(isWeekend('2024-12-31')).toBe(false);
    expect(isWeekend('2024-12-28')).toBe(true);
    expect(isWeekend('2024-12-29')).toBe(true);
  });

  it('should calculate date difference in days', () => {
    expect(dateDifference('2024-12-25', '2024-12-30')).toBe(5);
  });

  it('should validate if a date string is valid', () => {
    expect(isValidDate('2024-12-30')).toBe(true);
    expect(isValidDate('invalid-date')).toBe(false);
  });

  it('should add days to a date', () => {
    expect(addDays('2024-12-30', 5)).toBe('2025-01-04');
  });

  it('should subtract days from a date', () => {
    expect(subtractDays('2024-12-30', 5)).toBe('2024-12-25');
  });

  it('devrait formater une date avec un format personnalisé', () => {
    expect(formatDateAdvanced('2024-12-30', 'DD/MM/YYYY')).toBe('30/12/2024');
    expect(formatDateAdvanced('2024-12-30', 'YYYY.MM.DD')).toBe('2024.12.30');
  });
});
