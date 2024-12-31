// Tests for envUtils
import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { getEnv, requireEnv } from '../utils/envUtils';

describe('EnvUtils', () => {
  const originalEnv = process.env;

  beforeEach(() => {
    process.env = { ...originalEnv };
  });

  afterEach(() => {
    process.env = originalEnv;
  });

  describe('getEnv', () => {
    it("devrait retourner la valeur de la variable d'environnement", () => {
      process.env.TEST_VAR = 'test-value';
      expect(getEnv('TEST_VAR')).toBe('test-value');
    });

    it("devrait retourner la valeur par défaut si la variable n'existe pas", () => {
      expect(getEnv('NONEXISTENT_VAR', 'default')).toBe('default');
    });

    it('devrait retourner une chaîne vide si pas de valeur par défaut', () => {
      expect(getEnv('NONEXISTENT_VAR')).toBe('');
    });
  });

  describe('requireEnv', () => {
    it('devrait retourner la valeur si la variable existe', () => {
      process.env.REQUIRED_VAR = 'required-value';
      expect(requireEnv('REQUIRED_VAR')).toBe('required-value');
    });

    it("devrait lancer une erreur si la variable n'existe pas", () => {
      expect(() => requireEnv('NONEXISTENT_VAR')).toThrow(
        'Environment variable "NONEXISTENT_VAR" is required but not defined.',
      );
    });

    it('devrait lancer une erreur si la variable est vide', () => {
      process.env.EMPTY_VAR = '';
      expect(() => requireEnv('EMPTY_VAR')).toThrow(
        'Environment variable "EMPTY_VAR" is required but not defined.',
      );
    });
  });
});
