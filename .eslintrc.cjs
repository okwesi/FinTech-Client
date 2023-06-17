module.exports = {
  root: true,
  parserOptions: {
    ecmaVersion: 2021,
    sourceType: 'module',
    ecmaFeatures: {
      modules: true,
      jsx: true,
    },
  },
  parser: '@typescript-eslint/parser',
  extends: ['prettier', 'plugin:react/recommended', 'plugin:import/recommended'],
  settings: {
    react: {
      version: '17.0.1',
    },
  },
  rules: {
    'react/jsx-filename-extension': [
      1,
      {
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
      },
    ],
    '@typescript-eslint/no-unused-vars': 'warn',
    'prettier/prettier': [
      'error',
      {
        singleQuote: true,
        bracketSpacing: true,
        useTabs: true,
        tabWidth: 4,
        printWidth: 120,
      },
    ],
    'import/named': ['off'],
    'import/no-unresolved': ['off'],
    'import/no-webpack-loader-syntax': ['off'],
  },
  plugins: ['@typescript-eslint', 'react', 'prettier'],
};
