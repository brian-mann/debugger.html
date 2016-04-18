"use strict";

const path = require("path");
const ExtractTextPlugin = require("extract-text-webpack-plugin");

let environment;
try {
  environment = require("./environment");
} catch (e) {
  environment = {};
}

let config = {
  entry: "./js/main.js",
  devtool: "source-map",
  output: {
    path: path.join(__dirname, "build"),
    filename: "bundle.js"
  },
  resolve: {
    alias: {
      "devtools": "ff-devtools-libs",
      "sdk": "ff-devtools-libs/sdk"
    },
    extensions: ["", ".js", ".jsm"],
    root: path.join(__dirname, "node_modules")
  },
  module: {
    loaders: [
      {
        test: /\.json$/,
        loader: "json-loader"
      },
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract("style-loader", "css-loader")
      }
    ]
  },
  plugins: [
    new ExtractTextPlugin("styles.css")
  ]
};

// NOTE: This is only needed to fix a bug with chrome devtools' debugger and
// destructuring params https://github.com/jlongster/debugger.html/issues/67
if (environment.transformParameters) {
  config.module.loaders.push({
    test: /\.js$/,
    exclude: /(node_modules|bower_components)/,
    loader: "babel",
    query: {
      plugins: ["transform-es2015-parameters"]
    }
  });
}

module.exports = config;
