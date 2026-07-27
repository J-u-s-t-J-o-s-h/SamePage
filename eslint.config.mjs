// @ts-check
import js from '@eslint/js';
import tseslint from 'typescript-eslint';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import prettier from 'eslint-config-prettier';
import globals from 'globals';

export default tseslint.config(
  {
    // Paths ESLint should never look at.
    ignores: [
      '**/dist/**',
      '**/build/**',
      '**/coverage/**',
      '**/node_modules/**',
      'playwright-report/**',
      'test-results/**',
      'apps/web/public/**',
    ],
  },

  // Base JS + TypeScript recommended rules for all source files.
  js.configs.recommended,
  ...tseslint.configs.recommended,

  // Web app (browser + React) source.
  {
    files: ['apps/web/**/*.{ts,tsx}'],
    languageOptions: {
      globals: { ...globals.browser },
    },
    plugins: {
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],
    },
  },

  // API server (Node) source.
  {
    files: ['apps/api/**/*.ts'],
    languageOptions: {
      globals: { ...globals.node },
    },
  },

  // Tooling / config files that run under Node.
  {
    files: ['**/*.{mjs,cjs,js}', '**/*.config.{ts,mts}', 'scripts/**/*.{mjs,js}'],
    languageOptions: {
      globals: { ...globals.node },
    },
  },

  // Turn off stylistic rules that Prettier owns. Keep this last.
  prettier,
);
