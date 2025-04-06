import eslintPluginUnicorn from 'eslint-plugin-unicorn';
import eslintPluginTs from '@typescript-eslint/eslint-plugin';
import eslintParserTs from '@typescript-eslint/parser';
import eslintPluginPrettier from 'eslint-plugin-prettier';

export default [
  {
    ignores: ['node_modules', 'dist'],
  },
  {
    languageOptions: {
      parser: eslintParserTs,
      sourceType: 'module',
    },
    plugins: {
      '@typescript-eslint': eslintPluginTs,
      unicorn: eslintPluginUnicorn,
      prettier: eslintPluginPrettier,
    },

    rules: {
      'prettier/prettier': ['error'],
      '@typescript-eslint/consistent-type-definitions': ['error', 'type'],
      'unicorn/no-array-callback-reference': 'off',
      'unicorn/no-array-for-each': 'off',
      'unicorn/no-array-reduce': 'off',
      'unicorn/no-null': 'off',
      'unicorn/number-literal-case': 'off',
      'unicorn/numeric-separators-style': 'off',
      'unicorn/prevent-abbreviations': [
        'error',
        {
          allowList: {
            acc: true,
            env: true,
            i: true,
            j: true,
            props: true,
            Props: true,
          },
        },
      ],
    },
  },
];
