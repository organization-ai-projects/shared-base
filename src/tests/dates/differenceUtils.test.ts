import { describe, it, expect } from 'vitest';
import { dateDifference } from '../../utils/dates/differenceUtils';

describe('DifferenceUtils', () => {
  it('devrait calculer la différence en jours', () => {
    expect(dateDifference('2024-01-01', '2024-01-05')).toBe(4);
    expect(dateDifference('2024-01-01', '2024-01-01')).toBe(0);
    expect(dateDifference('2024-01-01', '2023-12-31')).toBe(-1);
  });

  it('devrait calculer la différence en mois', () => {
    expect(dateDifference('2024-01-01', '2024-03-01', 'months')).toBe(2);
    expect(dateDifference('2024-01-01', '2023-12-01', 'months')).toBe(-1);
    expect(dateDifference('2024-01-15', '2024-02-15', 'months')).toBe(1);
  });

  it('devrait calculer la différence en années', () => {
    expect(dateDifference('2024-01-01', '2025-01-01', 'years')).toBe(1);
    expect(dateDifference('2024-01-01', '2023-01-01', 'years')).toBe(-1);
    expect(dateDifference('2024-06-15', '2025-06-15', 'years')).toBe(1);
  });

  it('devrait gérer les dates à cheval sur les mois', () => {
    expect(dateDifference('2024-01-31', '2024-03-01', 'months')).toBe(1);
  });

  it('devrait gérer les années bissextiles', () => {
    expect(dateDifference('2024-02-28', '2024-03-01')).toBe(2);
  });
});
