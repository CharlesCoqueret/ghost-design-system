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
  ignorePatterns: ['**/*.stories.tsx', 'webpack.*.js', 'coverage/'],
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
    'prettier/@typescript-eslint',
    'eslint-config-prettier',
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
    'react-hooks/rules-of-hooks': rules.ON,
    'react-hooks/exhaustive-deps': rules.OFF,
    'prettier/prettier': rules.ON,
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
};
