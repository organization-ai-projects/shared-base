import { describe, expect, it } from 'vitest';
import { isPublicHoliday, isValidDate, isWeekend } from '../../src/utils/dates/validationUtils';

describe('Validation Utilities', () => {
  describe('isValidDate', () => {
    it('devrait valider les dates en anglais', () => {
      expect(isValidDate('2024-12-25')).toBe(true);
      expect(isValidDate('invalid-date')).toBe(false);
    });

    it('devrait valider les dates en français', () => {
      expect(isValidDate('25/12/2024', 'fr', 'DD/MM/YYYY')).toBe(true);
      expect(isValidDate('invalid-date', 'fr', 'DD/MM/YYYY')).toBe(false);
    });

    it('devrait valider les dates avec format personnalisé', () => {
      expect(isValidDate('15-01-2024', 'fr', 'DD-MM-YYYY')).toBe(true);
      expect(isValidDate('15/01/24', 'fr', 'DD/MM/YY')).toBe(true);
    });
  });

  describe('isWeekend', () => {
    it('devrait identifier les jours de semaine', () => {
      expect(isWeekend('2024-01-02')).toBe(false);
      expect(isWeekend('2024-01-03')).toBe(false);
      expect(isWeekend('2024-01-04')).toBe(false);
      expect(isWeekend('2024-01-05')).toBe(false);
    });

    it('devrait identifier les week-ends', () => {
      expect(isWeekend('2024-01-06')).toBe(true);
      expect(isWeekend('2024-01-07')).toBe(true);
    });

    it('devrait gérer les dates invalides', () => {
      expect(isWeekend('invalid-date')).toBe(false);
    });

    it('devrait gérer les formats personnalisés', () => {
      expect(isWeekend('06/01/2024', 'fr', 'DD/MM/YYYY')).toBe(true);
      expect(isWeekend('07/01/2024', 'fr', 'DD/MM/YYYY')).toBe(true);
    });
  });

  describe('isPublicHoliday', () => {
    it('devrait identifier les jours fériés', () => {
      expect(isPublicHoliday('2024-01-01')).toBe(true);
      expect(isPublicHoliday('2024-05-01')).toBe(true);
      expect(isPublicHoliday('2024-12-25')).toBe(true);
    });

    it('devrait identifier les jours non fériés', () => {
      expect(isPublicHoliday('2024-01-02')).toBe(false);
      expect(isPublicHoliday('2024-12-26')).toBe(false);
    });

    it('devrait gérer les dates invalides', () => {
      expect(isPublicHoliday('invalid-date')).toBe(false);
    });
  });
});
