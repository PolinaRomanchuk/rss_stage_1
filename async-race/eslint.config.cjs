const eslintPluginUnicorn = require('eslint-plugin-unicorn');
const eslintPluginTs = require('@typescript-eslint/eslint-plugin');
const eslintParserTs = require('@typescript-eslint/parser');

module.exports = [
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
    },
    rules: {
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
