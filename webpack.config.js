const path = require('path');

const webpack = require('webpack');

module.exports = (env, args) => {
  const isProduction = args.mode === 'production';
  const isDevelopment = args.mode === 'development';

  const config = {
    target: 'electron-main',
    entry: './src/main/main.js',
    output: {
      path: path.resolve(__dirname, 'dist/main'),
      filename: 'main.js'
    },
    module: {
      rules: [
        {
          test: /\.js/,
          exclude: /node_modules/,
          use: 'babel-loader'
        }
      ]
    }
  };

  if (isDevelopment)
    config.devtool = 'source-map';

  return config;
};
