import { describe, it, expect } from 'vitest';
import { formatDate, formatLocalized, formatDateDifference } from '../../utils/dates/formatUtils';

describe('FormatUtils', () => {
  describe('formatDate', () => {
    it('devrait formater la date avec le format par défaut', () => {
      expect(formatDate('2024-01-15')).toBe('2024-01-15');
    });

    it('devrait formater la date avec un format personnalisé', () => {
      expect(formatDate('2024-01-15', 'DD/MM/YYYY')).toBe('15/01/2024');
    });

    it('devrait gérer les formats complexes', () => {
      expect(formatDate('2024-01-15', 'dddd D MMMM YYYY')).toBe('lundi 15 janvier 2024');
    });
  });

  describe('formatLocalized', () => {
    it('devrait formater une date avec les options par défaut', () => {
      expect(formatLocalized(new Date('2024-01-15'))).toBe('15 janvier 2024');
    });

    it('devrait formater une date avec une locale différente', () => {
      expect(formatLocalized(new Date('2024-01-15'), 'en-US')).toBe('January 15, 2024');
    });

    it('devrait formater une date avec des options personnalisées', () => {
      expect(
        formatLocalized(new Date('2024-01-15'), 'fr-FR', {
          year: 'numeric',
          month: 'short',
          day: 'numeric',
        }),
      ).toBe('15 janv. 2024');
    });

    it('devrait accepter une date sous forme de chaîne', () => {
      expect(formatLocalized('2024-01-15')).toBe('15 janvier 2024');
    });

    it('devrait lancer une erreur pour une date invalide', () => {
      expect(() => formatLocalized('invalid-date')).toThrow('Invalid date provided');
    });
  });

  describe('formatDateDifference', () => {
    it('devrait formater la différence pour le même jour', () => {
      expect(formatDateDifference('2024-01-01', '2024-01-01')).toBe('0 years, 0 months, 0 days');
    });

    it('devrait formater la différence pour des jours différents', () => {
      expect(formatDateDifference('2024-01-01', '2024-01-15')).toBe('0 years, 0 months, 14 days');
    });

    it('devrait formater la différence pour des mois différents', () => {
      expect(formatDateDifference('2024-01-01', '2024-03-01')).toBe('0 years, 2 months, 0 days');
    });

    it('devrait formater la différence pour des années différentes', () => {
      expect(formatDateDifference('2024-01-01', '2025-01-01')).toBe('1 years, 0 months, 0 days');
    });

    it('devrait formater la différence complexe', () => {
      expect(formatDateDifference('2024-01-01', '2025-03-15')).toBe('1 years, 2 months, 14 days');
    });

    it('devrait gérer les dates négatives', () => {
      expect(formatDateDifference('2025-01-01', '2024-01-01')).toBe('-1 years, 0 months, 0 days');
    });
  });
});
