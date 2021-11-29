"use strict";

const path = require("path");
const { merge } = require("webpack-merge");
const { default: getJSConfig } = require("pd-js-config");
const { default: getCssConfig } = require('pd-css-config');
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = merge(
  {
    entry: "./src/main.js",
    context: path.resolve(__dirname),
    mode: 'production',
    output: {
      path: path.resolve(__dirname, "dist"),
      filename: "bundle.js",
    },
    module: {
      rules: [],
    },
    resolve: {
      extensions: [".jsx", ".js", ".css"],
    },
    devtool: "source-map",
    plugins: [
      new HtmlWebpackPlugin({
        template: path.resolve(__dirname, "./index.html"),
      }),
    ],
  },
  getJSConfig({
    jsx: true,
    env: "development",
  }),
  getCssConfig({
    env: 'development',
    cssSplit: {
      enable: true
    },
    useCssModule: false,
    preCompile: 'none'
  })
);
