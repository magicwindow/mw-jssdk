'use strict';

var path = require('path');
var webpack = require('webpack');
var baseConfig = require('./webpack.config');

var config = Object.create(baseConfig);

config.module.loaders.push({
  test: /apis\.js$/,
  loader: 'string-replace',
  query: {
    search: '{{HOST_NAME}}',
    replace: 'http://stats.magicwindow.cn'
  }
});

module.exports = config;
