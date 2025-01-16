module.exports = {
  env: {
    node: true, // Это включает глобальные переменные, такие как process, module и require
    es2023: true,
    mongo: true,
  },
  parserOptions: {
    sourceType: 'module',
    ecmaVersion: 'latest',
  },
  parser: '@typescript-eslint/parser',

  settings: {
    'import/resolver': {
      typescript: {
        project: './tsconfig.json',
      },
    },
  },
  plugins: ['@typescript-eslint', 'prettier', 'import', 'simple-import-sort'],
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:import/errors',
    'plugin:import/warnings',
    'plugin:import/typescript',
    'prettier',
  ],
  rules: {
    'prettier/prettier': 'error',
    'import/order': [
      'error',
      {
        groups: ['builtin', 'external', 'internal', 'parent', 'sibling', 'index'],
        pathGroups: [
          {
            pattern: '@lib/**',
            group: 'internal',
            position: 'before',
          },
          {
            pattern: '@config/**',
            group: 'internal',
            position: 'before',
          },
          {
            pattern: '@common/**',
            group: 'internal',
            position: 'before',
          },
          {
            pattern: '@database/**',
            group: 'internal',
            position: 'before',
          },
          {
            pattern: '@repository/**',
            group: 'internal',
            position: 'before',
          },
          {
            pattern: '@provider/**',
            group: 'internal',
            position: 'before',
          },
          {
            pattern: '@service/**',
            group: 'internal',
            position: 'before',
          },
          {
            pattern: '@type/**',
            group: 'internal',
            position: 'before',
          },
          {
            pattern: 'src/**',
            group: 'internal',
            position: 'after',
          },
        ],
        'newlines-between': 'always',
        alphabetize: {
          order: 'asc',
          caseInsensitive: true,
        },
      },
    ],
    'import/no-duplicates': 'warn',
    quotes: ['error', 'single'],
    'no-console': 'off',
    'no-var-requires': 'off',
    'no-debugger': 'off',
    'no-constant-condition': 'off', //todo fix
    '@typescript-eslint/no-unused-vars': 'off',
    '@typescript-eslint/ban-ts-comment': 'off', // todo fix
    '@typescript-eslint/no-explicit-any': 'off', // todo fix
    '@typescript-eslint/no-var-requires': 'off',
    'import/no-unresolved': 'off',
  },
}
