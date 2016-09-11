
/**
 * DEVELOPMENT WEBPACK CONFIGURATION
 */
const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const nodeExternals = require('webpack-node-externals')

const base = require('./webpack.abstract.config')
const dev = require('./webpack.dev.config')

module.exports = Object.assign({}, base, {
  module: dev.module,

  target: 'node',
  externals: [nodeExternals()],
  devtool: 'source-map',
})
