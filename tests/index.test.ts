import { describe, expect, it } from 'vitest';
import * as indexExports from '../src/index';

describe('Index exports', () => {
  it('devrait contenir les exports obligatoires', () => {
    const exportedKeys = Object.keys(indexExports);
    console.log('Exports disponibles:', exportedKeys);

    const requiredExports = [
      // Utils dates
      'dateDifferenceFromdifferenceUtils',
      'formatDateFromformatUtils',
      'addDaysFrommanipulationUtils',
      'subtractDaysFrommanipulationUtils',
      'isValidDateFromvalidationUtils',
      'isWeekendFromvalidationUtils',
      // Utils from direct exports
      'getEnv',
      'requireEnv',
      'CustomError',
      'readFile',
      'writeFile',
      'deleteFile',
      'WinstonLogger',
      'deepClone',
      'generateRandomNumber',
      'capitalize',
      'validateEmail',
      'validateUUID',
    ];

    requiredExports.forEach((requiredExport) => {
      expect(exportedKeys).toContain(requiredExport);
    });
  });

  it('devrait avoir une structure cohérente', () => {
    const exportStructure = Object.entries(indexExports)
      .filter(([_, value]) => value !== undefined)
      .map(([key]) => key)
      .sort();

    expect(exportStructure.length).toBeGreaterThan(0);
    expect(exportStructure).toEqual([...new Set(exportStructure)]);
  });
});
