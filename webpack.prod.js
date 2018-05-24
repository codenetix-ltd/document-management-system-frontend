/* eslint-disable */
const common = require('./webpack.config.js');
const merge = require('webpack-merge');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const MomentLocalesPlugin = require('moment-locales-webpack-plugin');
/* eslint-enable */

const production = {
  mode: 'production',
  optimization: {
    splitChunks: {
      chunks: 'all',
      minSize: 30000,
      minChunks: 1,
      maxAsyncRequests: 7,
      maxInitialRequests: 5,
      automaticNameDelimiter: '-',
      name: true,
      cacheGroups: {
        default: {
          minChunks: 2,
          priority: -20,
          reuseExistingChunk: true
        },
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          priority: -10
        }
      }
    }
  },
  plugins: [
    new CleanWebpackPlugin('dist', {}),
    new MomentLocalesPlugin(),
    new BundleAnalyzerPlugin({ openAnalyzer: false, analyzerMode: 'static' })
  ],
  devtool: 'source-map'
};

module.exports = merge(common, production);
