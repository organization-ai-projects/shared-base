import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    coverage: {
      provider: 'v8',
      reportsDirectory: './coverage',
      all: true,
      include: ['src/**/*.ts'],
      exclude: [
        'node_modules/**',
        'dist/**',
        '**/types/**',
        '**/interfaces/**',
        '**/generateIndex.ts',
        '**/release.config.mjs',
        '**/tests/**',
      ],
      reporter: ['text', 'html', 'json'],
      threshold: {
        statements: 80,
        branches: 80,
        functions: 80,
        lines: 80,
      },
    },
  },
});
