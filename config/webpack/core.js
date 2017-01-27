var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var helpers = require('../helpers');
var path = require('path');

module.exports = {

  resolve: {
    extensions: ['.js', '.ts']
  },

  module: {
    loaders: [
      {
        test: /\.ts$/,
        loaders: ['awesome-typescript-loader?config=tsconfig.json', 'angular2-template-loader']
      },
      {
        test: /\.html$/,
        loader: 'html-loader'
      },
      {
        test: /\.(png|jpe?g|gif|svg|woff|woff2|ttf|eot|ico)$/,
        loader: 'file-loader?name=assets/[name].[hash].[ext]'
      },
      {
        test: /\.(scss|sass)$/,
        include: [ helpers.root('src'), helpers.root('theme'), helpers.root('auth') ],
        loaders: ['exports-loader?module.exports.toString()', 'css-loader', 'sass-loader']
      }
    ]
  },

  plugins: [
    new webpack.optimize.CommonsChunkPlugin({
      name: ['app', 'vendor', 'polyfills']
    }),

    new webpack.ContextReplacementPlugin(
        // The (\\|\/) piece accounts for path separators in *nix and Windows
        /angular(\\|\/)core(\\|\/)(esm(\\|\/)src|src)(\\|\/)linker/,
        helpers.root('./src') // location of your src
    ),

    new HtmlWebpackPlugin({
      template: 'src/index.html'
    }),

  ]
};
