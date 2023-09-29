const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackPwaManifest = require('webpack-pwa-manifest');
const path = require('path');
const { InjectManifest } = require('workbox-webpack-plugin');

module.exports = () => {
  return {
    mode: 'development',
    entry: {
      main: '/develop/client/src/js/index.js',
      install: '/develop/client/src/js/install.js',
    },
    output: {
      filename: '[name].bundle.js',
      path: path.resolve(__dirname, 'dist'),
    },
    plugins: [
      new InjectManifest({
        swSrc: '/develop/client/src/js/sw.js',
        swDest: 'sw.js',
      }),
      new WebpackPwaManifest({
        name: 'Just Another Text Editor',
        short_name: 'JATE',
        description: 'An application that allows you to input and edit text!',
        background_color: '#ffffff',
        crossorigin: 'use-credentials', 
        icons: [
          {
            src: path.resolve('/develop/client/src/images/logo.png'),
            sizes: [96, 128, 192, 256, 384, 512],
          },
        ],
      }),
    ],

    module: {
      rules: [
        {
          test: /\.css$/i,
          use: ['style-loader', 'css-loader'],
        },
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env'],
            },
          },
        },
      ],
    },
  };
};

