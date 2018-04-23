/* eslint-disable */
const apiMocker = require('connect-api-mocker');
const common = require('./webpack.config.js');
const merge = require('webpack-merge');
/* eslint-enable */

const development = {
  mode: 'development',
  devtool: 'inline-source-map',
  devServer: {
    overlay: {
      warnings: true,
      errors: true
    },
    before: app => {
      app.use(apiMocker('/api', 'mocks/api'));
    }
  }
};

module.exports = merge(common, development);
