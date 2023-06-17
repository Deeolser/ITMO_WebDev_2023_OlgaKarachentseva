module.exports = {
  root: true,
  parser: 'vue-eslint-parser',
  parserOptions: {
    parser: '@typescript-eslint/parser',
  },
  extends: [
    // add more generic rulesets here, such as:
    'eslint:recommended',
    'plugin:vue/vue3-recommended',
    '@vue/typescript/recommended',
    // 'plugin:vue/recommended' // Use this if you are using Vue.js 2.x.
  ],
  plugins: ['@typescript-eslint'],
  rules: {
    // override/add rules settings here, such as:
    // 'vue/no-unused-vars': 'error'
    '@typescript-eslint/no-explicit-any': 0,
    '@typescript-eslint/no-non-null-assertion': 0,
    semi: ['error', 'always'],
    quotes: ['error', 'single'],
    indent: ['warn', 2],
    'vue/max-attributes-per-line': ['error', {
      'singleline': {
        'max': 1,
      },
      'multiline': {
        'max': 1,
      },
    }],
  },
};