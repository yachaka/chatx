/**
 * DEVELOPMENT WEBPACK CONFIGURATION
 */
const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')

const base = require('./webpack.abstract.config')

module.exports = Object.assign({}, base, {
  entry: [
    /* Hot reloading */
    'react-hot-loader/patch',
    'webpack-hot-middleware/client',

    /* Entry point */
    path.join(process.cwd(), 'app/run.js'),
  ],

  output: Object.assign({}, base.output, {
    filename: '[name].js',
    chunkFilename: '[name].chunk.js',
  }),

  module: Object.assign({}, base.module, {
    loaders: base.module.loaders.slice().concat([
      {
        // Transform our own CSS
        test: /\.css$/,
        exclude: /node_modules/,
        loaders: [
          'style-loader',
          'css-loader?localIdentName=[local]--[hash:base64:5]&importLoaders=1&modules&camelCase',
          'postcss-loader',
        ]
      },
      {
        test: /\.css$/,
        include: /node_modules/,
        loaders: [
          'style-loader',
          'css-loader'
        ]
      }
    ])
  }),

  plugins: base.plugins.concat([

    new webpack.optimize.OccurrenceOrderPlugin(),

    new webpack.optimize.CommonsChunkPlugin({ name: 'common' }),

    // Hot Reloading
    new webpack.HotModuleReplacementPlugin(),

    new webpack.NoErrorsPlugin(),

    new HtmlWebpackPlugin({
      template: 'app/index.html',
      inject: true,
    }),
  ]),

  devtool: 'source-map',
})
