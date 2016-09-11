  /**
 * COMMON WEBPACK CONFIGURATION
 * This is not meant to be used directly by webpack.
 * Some key configuration is missing and is required to be provided.
 * This is intended to be a common configuration object.
 */
const path = require('path')
const webpack = require('webpack')

/* PostCSS plugins */
const cssImport = require('postcss-import')
const mixins = require('postcss-mixins')
const nested = require('postcss-nested')
const simpleVars = require('postcss-simple-vars')
const easings = require('postcss-easings')
const cssnext = require('postcss-cssnext')
const reporter = require('postcss-reporter')

const base = {
  node: {
    "fs": "empty",
  },
  output: {
    path: path.resolve(process.cwd(), 'build'),
    publicPath: '/',
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.(jpg|png|gif)$/,
        loader: 'file-loader',
      },
    ],
  },
  /*
   * Webpack plugins
   */
  plugins: [
    // Expose NODE_ENV
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(process.env.NODE_ENV),
      },
    }),
  ],

  /* Plugins used by postcss-loader
   * @see top of file for imports
   */
  postcss: (webpack) => ([
    cssImport({ path: base.resolve.root, addDependencyTo: webpack }),
    mixins(),
    nested(),
    simpleVars(),
    easings(),
    cssnext(),
    reporter(),
  ]),

  /* Module Resolving */
  resolve: {
    /* Module root entry points */
    modules: ['app', 'app/js', 'node_modules'],
    root: [ path.resolve('./app'), path.resolve('./app/js') ], // Needed for target: node (in testing), strangely `modules` key gets ignore there
    extensions: [
      '',
      '.js',
    ],
  },

  /* Formatting */
  stats: true,
  progress: true,
}

module.exports = base