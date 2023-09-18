const rules = {
  ON: 2,
  OFF: 0,
  WARN: 1,
};

module.exports = {
  env: {
    browser: true,
    jest: true,
    es2022: true,
    node: true,
  },
  ignorePatterns: ['coverage/*', 'node_modules/*', 'dist/*', 'docs-build/*', 'public/*'],
  parser: '@typescript-eslint/parser',
  plugins: ['react', 'react-hooks', '@typescript-eslint', 'prettier'],
  parserOptions: {
    ecmaVersion: 6,
    ecmaFeatures: {
      jsx: true,
      impliedStrict: true,
    },
    sourceType: 'module',
  },
  extends: [
    'plugin:storybook/recommended',
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:@typescript-eslint/recommended',
    'prettier',
  ],
  rules: {
    '@typescript-eslint/naming-convention': [
      rules.ON,
      {
        format: ['StrictPascalCase'],
        prefix: ['I'],
        selector: 'interface',
      },
    ],
    'no-duplicate-imports': rules.ON,
    'react-hooks/rules-of-hooks': rules.ON,
    'react-hooks/exhaustive-deps': rules.OFF,
    'prettier/prettier': rules.ON,
  },
  overrides: [
    {
      files: ['*.ts', '*.tsx'],
      extends: ['plugin:@typescript-eslint/recommended-requiring-type-checking'],
      parserOptions: {
        project: ['./tsconfig.json'],
      },
    },
    {
      files: ['*.test.tsx', '*.test.ts'],
      rules: {
        '@typescript-eslint/no-empty-function': rules.OFF,
        '@typescript-eslint/no-unsafe-assignment': rules.OFF,
        '@typescript-eslint/no-unsafe-member-access': rules.OFF,
        '@typescript-eslint/no-var-requires': rules.OFF,
      },
    },
  ],
  settings: {
    react: {
      version: 'detect',
    },
  },
};
