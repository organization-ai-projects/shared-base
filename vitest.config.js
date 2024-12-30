import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    globals: true,
    environment: 'node',
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
      reportsDirectory: './coverage',
      exclude: [
        '**/types/**',
        '**/interfaces/**',
        '**/*.config.js',
        '**/tests/mocks/**',
        '**/tests/**',
      ],
    },
  },
});