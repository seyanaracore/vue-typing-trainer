module.exports = {
  root: true,

  env: {
    browser: true,
    es2021: true,
    node: true,
  },

  extends: [
    'plugin:vue/vue3-strongly-recommended',
    '@vue/eslint-config-airbnb-with-typescript',
    'plugin:prettier/recommended',
    'eslint:recommended',
    'plugin:import/errors',
    'plugin:import/recommended',
    '@vue/typescript',
  ],

  plugins: ['import'],

  parserOptions: {
    parser: '@typescript-eslint/parser',
  },

  rules: {
    'prettier/prettier': 'error',
    'import/order': [
      'error',
      {
        groups: [
          'builtin',
          'external',
          'parent',
          'sibling',
          'index',
          'internal',
          'object',
          'unknown',
          'type',
        ],
      },
    ],
    'padding-line-between-statements': [
      'error',
      {
        blankLine: 'always',
        prev: 'import',
        next: '*',
      },
      {
        blankLine: 'any',
        prev: 'import',
        next: 'import',
      },
      {
        blankLine: 'always',
        prev: '*',
        next: 'block-like',
      },
      {
        blankLine: 'always',
        prev: 'block-like',
        next: '*',
      },
      {
        blankLine: 'always',
        prev: '*',
        next: ['const', 'let'],
      },
      {
        blankLine: 'always',
        prev: ['const', 'let'],
        next: '*',
      },
      {
        blankLine: 'never',
        prev: ['singleline-const', 'singleline-let'],
        next: ['singleline-const', 'singleline-let'],
      },
      {
        blankLine: 'always',
        prev: ['multiline-const', 'multiline-let'],
        next: ['multiline-const', 'multiline-let'],
      },
      {
        blankLine: 'always',
        prev: ['cjs-import'],
        next: '*',
      },
      {
        blankLine: 'any',
        prev: ['cjs-import'],
        next: ['cjs-import'],
      },
    ],
  },

  settings: {
    'import/resolver': {
      alias: {
        extensions: ['.js', '.jsx', '.json', '.ts'],
        map: [['@', './src']],
      },
    },
  },
}
