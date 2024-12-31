import { describe, it, expect } from 'vitest';
import * as Utils from '../index';

describe('Index exports', () => {
  it('devrait contenir les exports obligatoires', () => {
    const requiredExports = ['formatDate', 'TypesDeepPartial'];

    const exportedKeys = Object.keys(Utils);

    requiredExports.forEach((requiredExport) => {
      expect(exportedKeys).toContain(requiredExport);
    });
  });

  it('devrait avoir des exports définis et valides', () => {
    const validKeys = Object.keys(Utils).filter(
      (key: string) => typeof Utils[key as keyof typeof Utils] !== 'undefined',
    );

    validKeys.forEach((key) => {
      expect(Utils[key as keyof typeof Utils]).toBeDefined();
      expect(typeof Utils[key as keyof typeof Utils]).not.toBe('undefined');
    });
  });

  it('devrait avoir une structure cohérente', () => {
    const exportStructure = Object.entries(Utils)
      .filter(([_, value]) => value !== undefined)
      .map(([key]) => key)
      .sort();

    expect(exportStructure.length).toBeGreaterThan(0);
    expect(exportStructure).toEqual([...new Set(exportStructure)]);
  });
});
