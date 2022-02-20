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
  ignorePatterns: ['**/*.stories.tsx', 'webpack.*.js'],
  parser: '@typescript-eslint/parser',
  plugins: ['react-hooks'],
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
    'prettier/@typescript-eslint',
    'eslint-config-prettier',
  ],
  rules: {
    'react-hooks/rules-of-hooks': rules.ON,
    'react-hooks/exhaustive-deps': rules.OFF,
    // 'prefer-spread': rules.WARN,
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
};
