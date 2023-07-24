module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'body-max-line-length': [0, 'always', 'infinity'],
    'footer-max-line-length': [0, 'always', 'infinity']
  }
}
