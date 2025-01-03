import { vi } from 'vitest';

const mockFormat = {
  combine: vi.fn().mockReturnThis(),
  timestamp: vi.fn().mockReturnThis(),
  printf: vi.fn().mockReturnThis(),
  colorize: vi.fn().mockReturnThis(),
  simple: vi.fn().mockReturnThis(),
  json: vi.fn().mockReturnThis(),
};

const mockConsoleTransport = vi.fn();
const mockFileTransport = vi.fn();

const mockLogger = {
  info: vi.fn(),
  error: vi.fn(),
  warn: vi.fn(),
};

const winston = {
  createLogger: vi.fn().mockReturnValue(mockLogger),
  format: mockFormat,
  transports: {
    Console: mockConsoleTransport,
    File: mockFileTransport,
  },
};

export { winston as default, mockLogger, mockConsoleTransport, mockFileTransport };
