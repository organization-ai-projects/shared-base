import { describe, expect, it } from 'vitest';
import { deepClone, deepMerge, type DeepPartial, mergeObjects } from '../src/utils/objectUtils';

describe('ObjectUtils', () => {
  describe('deepMerge', () => {
    it('should merge objects deeply', () => {
      const obj1 = { a: 1, b: { c: 2 } };
      const obj2: DeepPartial<typeof obj1 & { b: { d?: number }; e?: number }> = {
        b: { d: 3 },
        e: 4,
      }; // Typage explicite ici
      const merged = deepMerge(obj1, obj2);

      expect(merged).toEqual({
        a: 1,
        b: { c: 2, d: 3 },
        e: 4,
      });
    });

    it('should handle null values in source', () => {
      const obj1 = { a: 1, b: { c: 2 } };
      const obj2 = { b: null, e: 4 };
      const merged = deepMerge(obj1, obj2);

      expect(merged).toEqual({
        a: 1,
        b: null,
        e: 4,
      });
    });

    it('should handle empty objects', () => {
      const obj1 = {};
      const obj2 = { a: 1 };
      const merged = deepMerge(obj1, obj2);

      expect(merged).toEqual({ a: 1 });
    });
  });

  describe('deepClone', () => {
    it('should clone objects deeply', () => {
      const obj = { a: 1, b: { c: 2 } };
      const cloned = deepClone(obj);

      expect(cloned).toEqual(obj);
      expect(cloned).not.toBe(obj);
    });

    it('should handle arrays inside objects', () => {
      const obj = { a: 1, b: [1, 2, 3] };
      const cloned = deepClone(obj);

      expect(cloned).toEqual(obj);
      expect(cloned).not.toBe(obj);
    });
  });

  describe('mergeObjects', () => {
    it('should merge two objects', () => {
      const obj1 = { a: 1 };
      const obj2 = { b: 2 };
      const merged = mergeObjects(obj1, obj2);

      expect(merged).toEqual({ a: 1, b: 2 });
    });

    it('should handle undefined inputs', () => {
      const obj1 = { a: 1 };
      const merged = mergeObjects(obj1, undefined as unknown);

      expect(merged).toEqual({ a: 1 });
    });
  });
});
