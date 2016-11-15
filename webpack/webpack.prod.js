const webpack = require('webpack');

/* Base Config */
const config = require('./webpack.base.js');

/* Post CSS */
const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');

config.plugins = config.plugins.concat([
  new webpack.optimize.DedupePlugin(),
  new webpack.optimize.OccurenceOrderPlugin(),
  new webpack.optimize.UglifyJsPlugin({ mangle: false, sourcemap: false }),
]);

config.postcss = () => [
  cssnano({ autoprefixer: false, zindex: false }),
  autoprefixer({ browsers: ['last 2 versions'] }),
];

module.exports = config;
