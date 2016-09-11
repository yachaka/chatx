
const chalk = require('chalk')
const express = require('express')
const webpack = require('webpack')
const webpackConfig = require('../internals/webpack/webpack.dev.config.js')

const app = express()

const compiler = webpack(webpackConfig)

app
  // Webpack dev server + hot reloading
  .use(require('webpack-dev-middleware')(compiler, {
    publicPath: webpackConfig.output.publicPath,
    noInfo: true,
    stats: {
      colors: true,
    },
  }))
  .use(require('webpack-hot-middleware')(compiler))
  .listen(8080, (err) => {
    if (err) {
      console.error(chalk.red('App server: Error occured :'), err)
    } else {
      console.log(`${chalk.blue('App served at')} ${chalk.magenta('http://localhost:8080/')} ${chalk.green('✓')}`)
    }
  })
