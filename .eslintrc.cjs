/* eslint-env node */
module.exports = {
  root: true,
  'extends': [
    'plugin:vue/vue3-essential',
    'eslint:recommended',
    '@vue/eslint-config-typescript',
    '@vue/eslint-config-prettier/skip-formatting'
  ],
  parserOptions: {
    ecmaVersion: 'latest'
  },
  rules: {
    'max-len': [2, { "code": 80 }],
    "indent": [
      "error",
      2,
      {
        "SwitchCase": 1
      }
    ],
    "semi": ["error", "never", { "beforeStatementContinuationChars": "never" }],
    "semi-spacing": ["error", { "after": true, "before": false }],
    "semi-style": ["error", "first"],
    "no-extra-semi": "error",
    "no-unexpected-multiline": "error",
    "no-unreachable": "error",
    "volar.inlayHints.eventArgumentInInlineHandlers": false
  }
}
