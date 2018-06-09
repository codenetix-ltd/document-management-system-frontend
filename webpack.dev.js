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
    },
    proxy: {
      '/api': {
        target: 'http://localhost:8081',
        secure: false,
        bypass: (req, res, proxyOptions) => {
          if (req.url.indexOf('api') !== -1) {
            return false;
          }
          return req.url;
        }
      }
    }
  }
};

module.exports = merge(common, development);
