import { vi } from 'vitest';

export const mockLogger = {
  info: vi.fn(),
  error: vi.fn(),
  warn: vi.fn(),
};

const mockWinston = {
  createLogger: (): typeof mockLogger => mockLogger,
  format: {
    combine: vi.fn(),
    timestamp: vi.fn(),
    printf: vi.fn(),
  },
  transports: {
    Console: vi.fn(),
    File: vi.fn(),
  },
};

vi.mock('winston', () => mockWinston);

export default mockWinston;
