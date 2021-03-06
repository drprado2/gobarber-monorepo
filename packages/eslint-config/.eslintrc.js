module.exports = {
  env: {
    browser: true,
    es2020: true,
    node: true,
    jest: true,
    "es6": true
  },
  extends: [
    "plugin:react/recommended",
    "airbnb-base",
    "plugin:@typescript-eslint/recommended",
    "prettier/@typescript-eslint",
    "plugin:prettier/recommended"
  ],
  "globals": {
    "Atomics": "readonly",
    "SharedArrayBuffer": "readonly",
    "__DEV__": "readonly"
  },
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true
    },
    "ecmaVersion": 2018,
    sourceType: 'module'
  },
  plugins: ['react', '@typescript-eslint', 'prettier', "better-styled-components", "react-hooks"],
  rules: {
    "react-hooks/rules-of-hooks": "error",
    "react-hooks/exhaustive-deps": "warn",
    "react/jsx-filename-extension": [1, { "extensions": [".tsx"] }],
    "import/prefer-default-export": "off",
    "no-use-before-define": "off",
    "prettier/prettier": "error",
    "better-styled-components/sort-declarations-alphabetically": 2,
    "import/extensions": [
      "error",
      "ignorePackages",
      {
        "ts": "never",
        "tsx": "never"
      }
    ]
  },
  settings: {
    'import/resolver': {
      typescript: {}
    },
    react: {
      version: 'detect'
    }
  }
}
