const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  entry: './src/app.jsx',
  output: {
    path: path.join(__dirname, '../', 'public'),
    filename: 'bundle.js',
  },
  resolve: {
    extensions: ['', '.js', '.jsx', '.json'],
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
      },
      {
        test: /\.scss$/,
        loader: ExtractTextPlugin.extract('style-loader', ['css-loader?url=false', 'postcss-loader', 'sass-loader']),
      },
      {
        test: /\.svg$/,
        loader: 'svg-inline',
      },
    ],
  },
  plugins: [
    new ExtractTextPlugin('[name].css'),
  ],
};
