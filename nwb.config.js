module.exports = {
  type: 'react-component',
  npm: {
    esModules: true,
    umd: {
      global: 'ReactAuthForm',
      externals: {
        react: 'React'
      }
    }
  }
}
