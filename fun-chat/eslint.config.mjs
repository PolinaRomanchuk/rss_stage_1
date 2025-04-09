import eslintPluginUnicorn from 'eslint-plugin-unicorn';
import eslintPluginTs from '@typescript-eslint/eslint-plugin';
import eslintParserTs from '@typescript-eslint/parser';
import eslintPluginPrettier from 'eslint-plugin-prettier';

export default [
  {
    ignores: ['node_modules', 'dist']
  },
  {
    languageOptions: {
      parser: eslintParserTs,
      sourceType: 'module'
    },
    plugins: {
      '@typescript-eslint': eslintPluginTs,
      unicorn: eslintPluginUnicorn,
      prettier: eslintPluginPrettier
    },

    rules: {
      'prettier/prettier': ['error'],
      '@typescript-eslint/consistent-type-definitions': ['error', 'type'],
      'unicorn/no-inline-config': 'error',
      '@typescript-eslint/no-explicit-any': 'error'
    }
  }
];
