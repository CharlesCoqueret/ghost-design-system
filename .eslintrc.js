const rules = {
  ON: 2,
  OFF: 0,
  WARN: 1,
};

module.exports = {
  env: {
    browser: true,
    jest: true,
    node: true,
  },
  ignorePatterns: ['coverage/*', 'node_modules/*', 'dist/*', 'docs-build/*', 'public/*'],
  parser: '@typescript-eslint/parser',
  plugins: ['react-hooks', 'prettier'],
  parserOptions: {
    ecmaVersion: 2018,
    ecmaFeatures: {
      jsx: true,
    },
    sourceType: 'module',
  },
  extends: [
    'plugin:@typescript-eslint/recommended',
    'plugin:react/recommended',
    'eslint-config-prettier',
    'prettier',
    'plugin:storybook/recommended',
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
    'react-hooks/rules-of-hooks': rules.ON,
    'react-hooks/exhaustive-deps': rules.OFF,
    'prettier/prettier': rules.ON,
  },
  overrides: [
    {
      files: ['*.test.tsx', '*.test.ts'],
      rules: {
        '@typescript-eslint/no-var-requires': rules.OFF,
        '@typescript-eslint/no-empty-function': rules.OFF,
      },
    },
  ],
  settings: {
    react: {
      version: 'detect',
    },
  },
};
