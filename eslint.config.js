import typescriptPlugin from '@typescript-eslint/eslint-plugin';
import typescriptParser from '@typescript-eslint/parser';
import { defineConfig } from 'eslint-define-config';
import prettierPlugin from 'eslint-plugin-prettier';

export default defineConfig([
  {
    ignores: ['node_modules/**', 'dist/**', 'coverage/**'], // Ignorer certains dossiers
  },
  {
    files: ['**/*.ts', '**/*.tsx', '**/*.test.ts', '**/*.test.tsx'], // Cibler les fichiers TypeScript et de test
    languageOptions: {
      parser: typescriptParser,
      parserOptions: {
        ecmaVersion: 2022,
        sourceType: 'module',
      },
    },
    plugins: {
      '@typescript-eslint': typescriptPlugin,
      prettier: prettierPlugin,
    },
    rules: {
      'prettier/prettier': 'warn', // Appliquer Prettier en mode avertissement
      '@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
      '@typescript-eslint/no-explicit-any': 'error', // Éviter l'utilisation de `any`
      '@typescript-eslint/explicit-function-return-type': 'warn',
      '@typescript-eslint/no-empty-function': 'warn',
      'no-console': ['warn', { allow: ['warn', 'error'] }], // Autoriser `console.warn` et `console.error`
    },
  },
  {
    // Override spécifique pour les fichiers de test pour permettre `console.log`
    files: ['**/*.test.ts', '**/*.test.tsx'],
    rules: {
      'no-console': 'off', // Désactiver la règle `no-console` pour les fichiers de test
    },
  },
]);
