import { describe, expect, it } from 'vitest';
import { removeDuplicates, shuffle, unique } from '../src/utils/arrayUtils';

describe('ArrayUtils', () => {
  describe('unique', () => {
    it("devrait supprimer les doublons d'un tableau", () => {
      const input = [1, 2, 2, 3];
      const result = unique(input);
      expect(result).toEqual([1, 2, 3]);
    });

    it('devrait retourner un tableau vide pour un tableau vide en entrée', () => {
      const input: number[] = [];
      const result = removeDuplicates(input);
      expect(result).toEqual([]);
      expect(result).not.toBe(input);
    });

    it("devrait retourner une nouvelle instance du tableau sans modifier l'original", () => {
      const input = [1, 2, 2, 3];
      const result = removeDuplicates(input);
      expect(result).not.toBe(input);
      expect(input).toEqual([1, 2, 2, 3]);
    });
  });

  describe('shuffle', () => {
    it('devrait mélanger les éléments du tableau', () => {
      const input = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
      const result = shuffle(input);

      // Vérifier que tous les éléments sont présents
      expect(result.sort()).toEqual(input.sort());

      // Vérifier que l'ordre a changé (avec une tolérance pour les cas rares)
      const originalOrder = input.join(',');

      let differentOrder = false;
      for (let i = 0; i < 10; i++) {
        const newResult = shuffle(input);
        if (newResult.join(',') !== originalOrder) {
          differentOrder = true;
          break;
        }
      }

      expect(differentOrder).toBe(true);
    });

    it('devrait retourner une copie du tableau pour un tableau à un élément', () => {
      const input = [1];
      const result = shuffle(input);
      expect(result).toEqual(input);
      expect(result).not.toBe(input);
    });

    it('devrait gérer un tableau vide', () => {
      const input: number[] = [];
      const result = shuffle(input);
      expect(result).toEqual([]);
      expect(result).not.toBe(input);
    });
  });
});
