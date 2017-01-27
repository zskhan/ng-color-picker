var webpack = require('webpack');
var webpackMerge = require('webpack-merge');
var coreConfig = require('./core');
var helpers = require('../helpers');

const ENV = process.env.ENV = process.env.ENV = 'development';

module.exports = webpackMerge(coreConfig, {

  entry: {
    'polyfills': './demo/polyfills.ts',
    'vendor': './demo/vendor.ts',
    'shell': './demo/main.ts'
  },
  devtool: 'cheap-module-eval-source-map',

  output: {
    path: helpers.root('dist'),
    filename: '[name].js',
    chunkFilename: '[id].chunk.js'
  },

  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        'ENV': JSON.stringify(ENV)
      }
    })
  ],

  devServer: {
    historyApiFallback: true,
    stats: 'minimal',
    host: '0.0.0.0',
    port: 9090
  }
});
