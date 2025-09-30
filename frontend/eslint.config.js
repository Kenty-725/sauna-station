import js from '@eslint/js'
import globals from 'globals'
import react from 'eslint-plugin-react'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import tseslint from 'typescript-eslint'
import prettier from 'eslint-config-prettier'
import { globalIgnores } from 'eslint/config'

export default tseslint.config(
  // Ignore generated and build artifacts
  globalIgnores(['dist', 'coverage', '.vite']),
  // App source (browser)
  {
    files: ['src/**/*.{ts,tsx}'],
    extends: [
      js.configs.recommended,
      tseslint.configs.recommended,
      // Use the flat-config variant of react rules
      react.configs.flat.recommended,
      // Enable React 17+ JSX runtime (no need to import React)
      react.configs.flat['jsx-runtime'],
      reactHooks.configs['recommended-latest'],
      reactRefresh.configs.vite,
      // Keep prettier last to disable conflicting stylistic rules
      prettier,
    ],
    settings: {
      react: { version: 'detect' },
    },
    languageOptions: {
      ecmaVersion: 'latest',
      globals: globals.browser,
    },
  },
  // Node-targeted config files
  {
    files: ['*.config.{js,ts}', 'vite.config.{js,ts}', 'eslint.config.js'],
    languageOptions: {
      ecmaVersion: 'latest',
      globals: globals.node,
    },
  },
)
