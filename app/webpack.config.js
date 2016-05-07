/**
 * Created by YikaJ on 16/5/6.
 */

'use strict';
let path = require('path');
let webpack = require('webpack');
let port = 8000;
let srcPath = path.join(__dirname, 'src');
let publicPath = '/';

module.exports = {
  port: port,
  debug: true,
  entry: './src/index',
  cache: true,
  devtool: 'source-map',
  plugins: [
    new webpack.NoErrorsPlugin()
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
        loader: 'babel-loader',
        include: [srcPath]
      },
      {
        test: /\.css$/,
        loader: 'style-loader!css-loader!postcss-loader'
      },
      {
        test: /\.scss/,
        loader: 'style-loader!css-loader!postcss-loader!sass-loader?outputStyle=expanded'
      },
      {
        test: /\.(png|jpg|gif|woff|woff2)$/,
        loader: 'url-loader?limit=8192'
      }
    ]
  }
};