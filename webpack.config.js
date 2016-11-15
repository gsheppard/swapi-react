const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

// POST CSS
const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');

module.exports = {
  entry: './src/app.jsx',
  devtool: 'inline-sourcemap',
  devServer: {
    inline: true
  },
  output: {
    path: path.join(__dirname, 'build'),
    filename: 'bundle.js'
  },
  resolve: {
    extensions: ['', '.js', '.jsx', '.json']
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      },
      {
        test: /\.scss$/,
        loader: ExtractTextPlugin.extract('style-loader', ['css-loader?url=false', 'postcss-loader', 'sass-loader'])
      }
    ]
  },
  plugins: [
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.optimize.UglifyJsPlugin({ mangle: false, sourcemap: false }),
    new ExtractTextPlugin('[name].css'),
  ],
  postcss: function() {
    return [
      cssnano({ autoprefixer: false, zindex: false }),
      autoprefixer({ browsers: ['last 2 versions'] })
    ];
  }
};
