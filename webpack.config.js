const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  entry: './src/app.jsx',
  output: {
    path: path.join(__dirname, 'public'),
    filename: 'bundle.js',
  },

  resolve: {
    extensions: ['.js', '.jsx', '.json'],
  },

  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: 'babel-loader',
      },
      {
        test: /\.scss$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            'css-loader',
            'sass-loader',
          ],
        }),
      },
      {
        test: /\.svg$/,
        use: 'svg-inline-loader',
      },
    ],
  },

  plugins: [
    new ExtractTextPlugin('[name].css'),
  ],
};
