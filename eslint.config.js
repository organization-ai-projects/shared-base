import typescriptPlugin from '@typescript-eslint/eslint-plugin';
import typescriptParser from '@typescript-eslint/parser';
import { defineConfig } from 'eslint-define-config';
import prettierPlugin from 'eslint-plugin-prettier';

export default defineConfig([
  {
    ignores: ['node_modules/**', 'dist/**', 'coverage/**', 'build/**', 'tests/mocks/**'], // Respect ignored folders
  },
  {
    files: ['**/*.ts', '**/*.tsx'], // Target all TypeScript files
    languageOptions: {
      parser: typescriptParser,
      parserOptions: {
        ecmaVersion: 'latest', // Align with ESNext
        sourceType: 'module',
        ecmaFeatures: {
          jsx: true, // Enable JSX parsing
        },
      },
    },
    plugins: {
      '@typescript-eslint': typescriptPlugin,
      prettier: prettierPlugin,
    },
    rules: {
      'prettier/prettier': 'warn', // Apply Prettier as a warning
      '@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_' }], // Ignore unused vars starting with _
      '@typescript-eslint/no-explicit-any': 'error', // Avoid `any` usage
      '@typescript-eslint/explicit-function-return-type': ['warn', { allowExpressions: true }], // Enforce return types
      '@typescript-eslint/no-empty-function': 'warn', // Warn against empty functions
      'no-console': ['warn', { allow: ['warn', 'error'] }], // Allow specific console methods
      'no-debugger': 'warn', // Warn against using debugger
      'eqeqeq': ['error', 'always'], // Enforce strict equality
    },
  },
  {
    // Overrides specific to test files at the root
    files: ['tests/**/*.test.ts', 'tests/**/*.test.tsx'], // Test files at the root
    languageOptions: {
      parser: typescriptParser,
      parserOptions: {
        ecmaVersion: 'latest', // Align with ESNext for tests
        sourceType: 'module',
      },
    },
    rules: {
      'no-console': 'off', // Allow `console.log` in test files
      '@typescript-eslint/no-empty-function': 'off', // Allow empty functions in test files
    },
  },
]);
