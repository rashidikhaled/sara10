module.exports = {
  'presets': ['@quasar/babel-preset-app'],
  plugins: [
    '@babel/plugin-transform-nullish-coalescing-operator',
    '@babel/plugin-transform-optional-chaining',
    '@babel/plugin-proposal-optional-chaining',
    '@babel/plugin-proposal-nullish-coalescing-operator',
    '@babel/plugin-proposal-private-methods',
    '@babel/plugin-proposal-class-properties'
  ]
}
