const path = require('path')
const HTMLWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  entry: {
    app: path.resolve(__dirname, '../client/app.js')
  },
  output: {
    filename: '[name].[hash].js',
    path: path.resolve(__dirname, '../dist')
  },
  module: {
    rules: [
      {
        test: /.(js|jsx)$/,
        exclude: path.resolve(__dirname, '../node_modules'),
        loader: 'babel-loader'
      }
      
    ]
  },
  plugins: [
    new HTMLWebpackPlugin()
  ]
}