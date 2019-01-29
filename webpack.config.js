const path = require('path');

const webpack = require('webpack');

const VueLoaderPlugin = require('vue-loader/lib/plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = (env, args) => {
  const isProduction = args.mode === 'production';
  const isDevelopment = args.mode === 'development';

  const mainConfig = {
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

  const rendererConfig = {
    target: 'electron-render',
    entry: './src/renderer/main.js',
    output: {
      path: path.resolve(__dirname, 'dist/renderer'),
      filename: 'renderer.js'
    },
    module: {
      rules: [
        {
          test: /\.vue$/,
          use: 'vue-loader',
        },
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: "babel-loader"
        },
        {
          test: /\.css$/,
          use: ExtractTextPlugin.extract({
            fallback: "style-loader",
            use: `css-loader${isProduction ? "?minimize" : ""}`
          })
        }
      ]
    },
    resolve: {
      alias: {
        "vue$": "vue/dist/vue.esm.js"
      },
      extensions: [".vue", ".js"]
    },
    plugins: [
      new VueLoaderPlugin(),
      new ExtractTextPlugin("main.css")
    ]
  };

  if (isDevelopment)
    mainConfig.devtool = 'source-map';

  return mainConfig;
};
