module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true
  },
  extends: 'eslint:recommended',
  overrides: [],
  parser: '@babel/eslint-parser',
  parserOptions: {
    requireConfigFile: false,
    ecmaVersion: 2022,
    sourceType: 'module'
  },
  rules: {
    indent: [2, 2],
    semi: [2, 'never'],
    quotes: [2, 'single']
  }
}
