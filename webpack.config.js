const wd = process.cwd()

const path = require('path')

const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')

module.exports = {
  entry: {
    tistory: [
      path.resolve(__dirname, './index.js')
    ]
  },
  output: {
    filename: 'dist/[name].js',
    publicPath: '/'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'eslint-loader'
      }
    ]
  },
  plugins: [
    new UglifyJsPlugin({
      uglifyOptions: {
        warnings: false,
        ecma: 5
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
