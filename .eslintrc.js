module.exports = {
  root: true,
  parserOptions: {
    ecmaVersion: 2020
  },
  rules: {
    '@typescript-eslint/no-explicit-any': ['off'],
    'prettier/prettier': ['error', { semi: false }],
    'no-console': 'warn',
    'no-debugger': 'warn'
  },
  env: {
    node: true
  },
  extends: [
    'plugin:vue/vue3-essential',
    'plugin:prettier/recommended',
    'eslint:recommended',
    '@vue/typescript/recommended',
    '@vue/prettier'
  ],
  overrides: [
    {
      files: [
        '**/__tests__/*.{j,t}s?(x)',
        '**/tests/unit/**/*.spec.{j,t}s?(x)'
      ],
      env: {
        jest: true
      }
    }
  ]
}
