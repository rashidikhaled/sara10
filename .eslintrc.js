module.exports = {
  root: true,
  // "test/**/*.spec.js",

  parserOptions: {
    parser: 'babel-eslint',
    ecmaVersion: 2020, // Allows for the parsing of modern ECMAScript features
    sourceType: 'module' // Allows for the use of imports
  },

  env: {
    browser: true
  },

  extends: [
    // https://github.com/vuejs/eslint-plugin-vue#priority-a-essential-error-prevention
    // consider switching to `plugin:vue/strongly-recommended` or `plugin:vue/recommended` for stricter rules.
    'plugin:vue/essential',
    '@vue/standard'
  ],

  // required to lint *.vue files
  plugins: [
    // "@babel/plugin-proposal-private-methods",
    'vue'
  ],

  globals: {
    'ga': true, // Google Analytics
    'cordova': true,
    '__statics': true,
    'process': true,
    'Capacitor': true,
    'chrome': true
  },

  // add your custom rules here
  rules: {
    // allow async-await
    'generator-star-spacing': 'off',
    // allow paren-less arrow functions
    'arrow-parens': 'off',
    'one-var': 'off',
    'import/first': 'off',
    'import/named': 'error',
    'import/namespace': 'error',
    'brace-style': 'off',
    'import/default': 'error',
    'import/export': 'error',
    'import/extensions': 'off',
    'vue/valid-v-bind': 'off',
    'vue/valid-v-model': 'off',
    'quotes': 'off',
    'import/no-unresolved': 'off',
    'import/no-extraneous-dependencies': 'off',
    'prefer-promise-reject-errors': 'off',
    'no-console': 'off', // process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-self-assign': 'off',
    'no-debugger': 'off' // process.env.NODE_ENV === 'production' ? 'error' : 'off',
  }
}
