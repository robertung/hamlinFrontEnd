module.exports = {
  // options...
  devServer: {
    proxy: 'http://localhost:2121/',
  },
  lintOnSave: false,
  chainWebpack: (config) => {
    config.module.rules.delete('eslint');
  },
};
