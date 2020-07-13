module.exports = {
  env: {
    browser: true,
    jest: true
  },
  extends: [
    'airbnb-base',
    'plugin:react/recommended',
    'plugin:@typescript-eslint/recommended',
    'prettier/@typescript-eslint',
    'plugin:import/typescript',
    'prettier'
  ],
  parserOptions: {
    project: './tsconfig.json'
  },
  settings: {
    react: {
      version: 'detect' // Tells eslint-plugin-react to automatically detect the version of React to use
    },
    'import/resolver': {
      'babel-module': {}
    }
  },
  plugins: ['@typescript-eslint', 'react-hooks'],
  rules: {
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    'no-multiple-empty-lines': [2],
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'warn',
    'react/jsx-no-bind': [
      'error',
      {
        max: 1
      }
    ],
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'warn',
    'react/jsx-no-bind': [
      'error',
      {
        allowArrowFunctions: true
      }
    ],
    'react/jsx-wrap-multilines': [
      'error',
      {
        declaration: 'parens-new-line',
        assignment: 'parens-new-line',
        return: 'parens-new-line',
        arrow: 'parens-new-line',
        condition: 'parens-new-line',
        logical: 'parens-new-line',
        prop: 'parens-new-line'
      }
    ],
    'no-console': ['error', { allow: ['warn', 'error'] }],
    'react/prop-types': 'off',
    'comma-dangle': ['error', 'never'],
    'import/prefer-default-export': 0,
    'import/no-cycle': 0,
    'react/display-name': 0,
    'func-names': 0,
    'spaced-comment': 0,
    'no-underscore-dangle': 0,
    "import/extensions": 0,
    "@typescript-eslint/no-use-before-define": 0,
    "@typescript-eslint/no-empty-function": 0
  }
};
