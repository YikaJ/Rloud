"use strict";

let webpack = require('webpack');
let path = require('path');

module.exports = {
  devtool: 'source-map',
  entry: path.join(__dirname, "public", "js", "app", "entry.js"),
  output: {
    path: path.join(__dirname, "public", "js"),
    filename: "app_bundle.js",
    publicPath: path.join(__dirname, "public", "js")
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        loader: "babel",
        query: {
          presets: ['es2015'],
          plugins: ["transform-regenerator"]
        }
      },
      {
        test: /\.scss/,
        exclude: /(node_modules|bower_components)/,
        loader: "style!css!sass"
      }
    ]
  },

  externals: {
    "socket.io": "io"
  }
};