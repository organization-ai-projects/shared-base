import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: './vitest.setup.ts',
    include: ['tests/**/*.test.{ts,tsx}', 'tests/**/*.spec.{ts,tsx}'],
    exclude: [
      '**/node_modules/**',
      '**/dist/**',
      '**/*.d.ts',
      '**/types/**',
      '**/interfaces/**',
      '**/tests/mocks/**',
      '**/generateIndex.ts',
      '**/release.config.mjs',
    ],
    coverage: {
      provider: 'v8',
      reportsDirectory: './coverage',
      all: true,
      include: ['src/**/*.{ts,tsx}'],
      exclude: [
        '**/node_modules/**',
        '**/dist/**',
        '**/*.d.ts',
        '**/types/**',
        '**/interfaces/**',
        '**/tests/mocks/**',
        '**/generateIndex.ts',
        '**/release.config.mjs',
      ],
      reporter: ['text', 'html', 'json', 'lcov', 'cobertura'],
      thresholds: {
        statements: 80,
        branches: 80,
        functions: 80,
        lines: 80,
      },
    },
    reporters: ['default'],
    watch: true,
    clearMocks: true,
    silent: true,
  },
});
