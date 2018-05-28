const path = require('path');
// const webpack = require('webpack');
const WebpackBar = require('webpackbar');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const { resolve, join } = path;
// const NODE_ENV = JSON.stringify(process.env.NODE_ENV);
const paths = {
  DIST: resolve(__dirname, 'dist'),
  SRC: resolve(__dirname, 'src'),
  JS: resolve(__dirname, 'src', 'js'),
  SCSS: resolve(__dirname, 'src', 'scss'),
};

module.exports = {
  entry: {
    app: join(paths.JS, 'app.jsx')
  },
  output: {
    path: paths.DIST,
    filename: '[name].bundle.js?[hash]'
  },
  plugins: [
    new WebpackBar(),
    // new webpack.DefinePlugin({ 'process.env': { NODE_ENV } }),
    new MiniCssExtractPlugin({ filename: '[name].css?[hash]' }),
    new HtmlWebpackPlugin({ template: join(paths.SRC, 'index.html') })
  ],
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ['babel-loader']
      },
      {
        test: /\.(js|jsx)$/,
        enforce: 'pre',
        exclude: /node_modules/,
        use: [{ loader: 'eslint-loader', options: { emitError: true, failOnError: true } }]
      },
      {
        test: /(\.css|\.scss)$/,
        use: [
          {
            loader: 'style-loader'
          }, {
            loader: MiniCssExtractPlugin.loader
          }, {
            loader: 'css-loader',
            options: { sourceMap: true }
          }, {
            loader: 'postcss-loader',
            options: { ident: 'postcss', plugins: () => [require('autoprefixer')], sourceMap: true }
          }, {
            loader: 'sass-loader',
            options: { includePaths: [paths.SCSS], sourceMap: true }
          }
        ]
      },
      {
        test: /\.eot(\?v=\d+.\d+.\d+)?$/,
        use: ['file-loader']
      },
      {
        test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        use: [{ loader: 'url-loader', options: { limit: 10000, mimetype: 'application/font-woff' } }]
      },
      {
        test: /\.[ot]tf(\?v=\d+.\d+.\d+)?$/,
        use: [{ loader: 'url-loader', options: { limit: 10000, mimetype: 'application/octet-stream' } }]
      },
      {
        test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
        use: [{ loader: 'url-loader', options: { limit: 10000, mimetype: 'image/svg+xml' } }]
      },
      {
        test: /\.(jpe?g|png|gif|ico)$/i,
        use: [{ loader: 'file-loader', options: { name: '[name].[ext]' } }]
      }
    ]
  },
  resolve: {
    modules: [paths.SRC, 'node_modules'],
    extensions: ['.js', '.jsx'],
    // aliases used for prod and dev. test env uses moduleNameMapper in package.json
    alias: {
      Config: resolve(__dirname, 'src', 'config/'),
      Images: resolve(__dirname, 'src', 'images/'),
      Store: resolve(__dirname, 'src', 'js', 'store/'),
      Services: resolve(__dirname, 'src', 'js', 'services/'),
      Components: resolve(__dirname, 'src', 'js', 'components/'),
      Routes: resolve(__dirname, 'src', 'js', 'components', 'routes/')
    }
  }
};
