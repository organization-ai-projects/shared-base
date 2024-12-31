import { describe, it, expect } from 'vitest';
import { validateUUID } from '../../utils/validation/uuidUtils';

describe('UUIDUtils', () => {
  it('devrait valider les UUIDs corrects', () => {
    expect(validateUUID('123e4567-e89b-12d3-a456-426614174000')).toBe(true);
    expect(validateUUID('87e3004a-bb01-4b6f-8c3e-d506ad96c5f5')).toBe(true);
    expect(validateUUID('987FBC97-4BED-5078-AF07-9141BA07C9F3')).toBe(true);
  });

  it('devrait rejeter les UUIDs invalides', () => {
    expect(validateUUID('invalid-uuid')).toBe(false);
    expect(validateUUID('')).toBe(false);
    expect(validateUUID('123e4567-e89b-12d3-a456')).toBe(false);
    expect(validateUUID('123e4567-e89b-12d3-a456-42661417400')).toBe(false);
    expect(validateUUID('123e4567-e89b-12d3-a456-4266141740000')).toBe(false);
  });
});
