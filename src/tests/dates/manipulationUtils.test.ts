import { describe, it, expect } from 'vitest';
import {
  addDays,
  subtractDays,
  addMonths,
  subtractMonths,
} from '../../utils/dates/manipulationUtils';

describe('ManipulationUtils', () => {
  describe('addDays', () => {
    it('devrait ajouter des jours à une date', () => {
      expect(addDays('2024-01-15', 5)).toBe('2024-01-20');
      expect(addDays('2024-01-31', 1)).toBe('2024-02-01');
      expect(addDays('2024-12-31', 1)).toBe('2025-01-01');
    });
  });

  describe('subtractDays', () => {
    it('devrait soustraire des jours à une date', () => {
      expect(subtractDays('2024-01-15', 5)).toBe('2024-01-10');
      expect(subtractDays('2024-02-01', 1)).toBe('2024-01-31');
      expect(subtractDays('2024-01-01', 1)).toBe('2023-12-31');
    });
  });

  describe('addMonths', () => {
    it('devrait ajouter des mois à une date', () => {
      expect(addMonths('2024-01-15', 1)).toBe('2024-02-15');
      expect(addMonths('2024-12-15', 1)).toBe('2025-01-15');
      expect(addMonths('2024-01-31', 1)).toBe('2024-02-29');
    });
  });

  describe('subtractMonths', () => {
    it('devrait soustraire des mois à une date', () => {
      expect(subtractMonths('2024-02-15', 1)).toBe('2024-01-15');
      expect(subtractMonths('2024-01-15', 1)).toBe('2023-12-15');
      expect(subtractMonths('2024-03-31', 1)).toBe('2024-02-29');
    });
  });
});
