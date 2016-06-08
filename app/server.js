/* eslint no-console:0 */
'use strict'

const webpack = require('webpack')
const WebpackDevServer = require('webpack-dev-server')
const config = require('./webpack.config')

new WebpackDevServer(webpack(config), config.devServer)
  .listen(config.port, 'localhost', err => {
    if(err) console.log(err)

    console.log('Listening at localhost:', config.port);
    console.log('Opening your system browser...');
    console.log('http://localhost:', config.port, '/webpack-dev-server/');
  })
