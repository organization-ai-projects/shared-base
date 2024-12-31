import { describe, it, expect } from 'vitest';
import { validateEmail } from '../../utils/validation/emailUtils';

describe('EmailUtils', () => {
  it('devrait valider les adresses email correctes', () => {
    expect(validateEmail('test@example.com')).toBe(true);
    expect(validateEmail('user.name+tag@example.co.uk')).toBe(true);
    expect(validateEmail('test.email@subdomain.example.com')).toBe(true);
  });

  it('devrait rejeter les adresses email invalides', () => {
    expect(validateEmail('invalid-email')).toBe(false);
    expect(validateEmail('@example.com')).toBe(false);
    expect(validateEmail('test@')).toBe(false);
    expect(validateEmail('')).toBe(false);
    expect(validateEmail('test@example')).toBe(false);
  });
});
