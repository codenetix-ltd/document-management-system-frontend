/* eslint-disable */
const common = require('./webpack.config.js');
const merge = require('webpack-merge');

const development = {
  mode: 'development',
  devtool: 'inline-source-map',
  devServer: {
    port: 8080,
    overlay: {
      warnings: true,
      errors: true
    }
  }
};

module.exports = merge(common, development);
