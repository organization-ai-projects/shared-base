import { describe, it, expect } from 'vitest';
import * as Utils from '../index';

describe('Index exports', () => {
  it('should export all utilities', () => {
    expect(Utils).toHaveProperty('formatDate');
    expect(Utils).toHaveProperty('logInfo');
    expect(Utils).toHaveProperty('capitalize');
  });
});
