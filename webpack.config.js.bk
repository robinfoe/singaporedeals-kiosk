var path = require('path');
var webpack = require('webpack');
var webpackTargetElectronRenderer = require('webpack-target-electron-renderer');

var BUILD_DIR = path.resolve(__dirname, 'build');
var APP_DIR = path.resolve(__dirname, 'src');
var ASSET_DIR = path.resolve(__dirname, 'asset');
var config = {
  entry: [
    APP_DIR + '/app/app',
  ],
  module: {
    loaders: [{
      test: /\.jsx?$/,
      loaders: ['babel-loader'],
      exclude: /node_modules/
    }, {
      test: /\.css$/,
      loader: 'style!css-loader?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]!postcss-loader'
    }, {
      test: /\.png|\.svg$/,
      loaders: ['file-loader']
    }, 
    {
      test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
      loader: 'url',
      query: {
       limit: 10000,
       name: path.join(ASSET_DIR, 'font/[name].[ext]')
      }
    }
    ]
  },
  output: {
    path: BUILD_DIR,
		filename: 'bundle.js'
  },
  resolve: {
    extensions: ['', '.js', '.jsx'],
    //alias : {'ngRoute': 'angular-route'}
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
  ]
};

config.target = webpackTargetElectronRenderer(config);
module.exports = config;
