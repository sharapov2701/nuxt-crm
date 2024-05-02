module.exports = {
  root: true,
  env: {
    browser: true,
    node: true
  },
  parser: 'vue-eslint-parser',
  parserOptions: {
    parser: '@typescript-eslint/parser'
  },
  extends: ['@nuxt/eslint-config', 'plugin:prettier/recommended', 'prettier'],
  plugins: ['prettier', '@typescript-eslint', 'unused-imports'],
  rules: {
    'unused-imports/no-unused-imports-ts': 'error',
    '@typescript-eslint/no-explicit-any': 'off',
    'vue/v-on-event-hyphenation': [
      'error',
      'always',
      {
        autofix: true
      }
    ],
    'vue/require-default-prop': 'off',
    '@typescript-eslint/ban-ts-comment': 'off',
    'prettier/prettier': [
      'error',
      {
        endOfLine: 'auto'
      }
    ],
    '@typescript-eslint/no-var-requires': 0
  }
}
