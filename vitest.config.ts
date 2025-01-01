import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: './vitest.setup.ts',
    include: ['src/**/*.test.{ts,tsx}', 'src/**/*.spec.{ts,tsx}'],
    exclude: [
      '**/node_modules/**',
      '**/dist/**',
      '**/*.d.ts',
      '**/types/**',
      '**/interfaces/**',
      '**/generateIndex.ts',
      '**/release.config.mjs',
      '**/tests/mocks/**',
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
        '**/*.{test,spec}.{ts,tsx}', // Évite les doublons avec la configuration des tests
        '**/types/**',
        '**/interfaces/**',
        '**/generateIndex.ts',
        '**/release.config.mjs',
        '**/tests/mocks/**',
      ],
      reporter: ['text', 'html', 'json', 'lcov'],
      thresholds: {
        statements: 80,
        branches: 80,
        functions: 80,
        lines: 80,
      },
    },
    reporters: ['default'],
    watch: false,
    isolate: true,
  },
});
