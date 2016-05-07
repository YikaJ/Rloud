/**
 * Created by YikaJ on 16/5/6.
 */

'use strict';
let path = require('path');
let webpack = require('webpack');
let port = 8000;
let srcPath = path.join(__dirname, 'src');
let publicPath = 'http://127.0.0.1:8000/assets/';

module.exports = {
  port: port,
  debug: true,
  entry: [
    'webpack-dev-server/client?http://127.0.0.1:8000', // WebpackDevServer host and port
    'webpack/hot/only-dev-server', // "only" prevents reload on syntax errors
    './src' // Your appʼs entry point
  ],
  devServer: {
    contentBase: './src',
    historyApiFallback: true,
    hot: true,
    port: port,
    publicPath: publicPath,
    noInfo: false
  },
  cache: true,
  devtool: 'eval',
  plugins: [
    new webpack.NoErrorsPlugin(),
    new webpack.HotModuleReplacementPlugin()
  ],
  output: {
    path: path.join(__dirname, '../node/public/js'),
    filename: 'bundle.js',
    publicPath: publicPath
  },
  resolve: {
    extensions: [
      '',
      '.js',
      '.jsx'
    ],
    alias: {
      action: path.join(srcPath, 'action'),
      component: path.join(srcPath, 'component'),
      actionType: path.join(srcPath, 'constant', 'actionType.js'),
      util: path.join(srcPath, 'util')
    }
  },
  module: {
    loaders: [
      {
        test: /\.(js|jsx)$/,
        loader: 'react-hot-loader!babel-loader',
        include: [srcPath]
      },
      {
        test: /\.css$/,
        loader: 'style-loader!css-loader!postcss-loader'
      },
      {
        test: /\.scss/,
        loaders: [
          'style?sourceMap',
          'css?modules&importLoaders=1&localIdentName=[path]___[name]__[local]___[hash:base64:5]',
          'sass-loader?outputStyle=expanded'
        ]
      },
      {
        test: /\.(png|jpg|gif|woff|woff2)$/,
        loader: 'url-loader?limit=8192'
      }
    ]
  }
};