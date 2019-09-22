module.exports = {
  type: 'react-component',
  npm: {
    esModules: true,
    umd: {
      global: 'ReactContextmenu',
      externals: {
        react: 'React'
      }
    }
  }
}
