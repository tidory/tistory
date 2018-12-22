/**
 * @author Mansu Jeong
 * @description 
 * Copyright (c) Mansu Jeong. All rights reserved.
 * 
 * Ref. https://webpack.js.org/configuration/dev-server/
 * Webpack. https://webpack.js.org/
 * 
 * Author. Mansu Jeong
 * Homepage. http://www.tidory.com
 * Github. https://github.com/pronist/
 */

const wd = process.cwd();

const path = require('path');

const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = {
  entry: {
    "tistory": [ 
      path.resolve(__dirname, './index.js') 
    ]
  },
  devtool: 'inline-source-map',
  devServer: {
    index: 'index.html',
    watchContentBase: true,
    open: 'http://localhost:8080',
    stats: "errors-only",
    watchOptions: {
      poll: true
    }
  },
  output: {
		filename: 'dist/[name].js',
    publicPath: "/"
  },
  plugins: [
    new UglifyJsPlugin({
      uglifyOptions: {
        warnings: false,
        ecma: 5,
      },
      sourceMap: true
    }),
    new CleanWebpackPlugin(['dist'], {
      root: wd,
      verbose: false,
      dry: false
    })
  ]
}