const path = require('path')
const HTMLWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  entry: {
    app: path.resolve(__dirname, '../client/app.js')
  },
  output: {
    filename: '[name].[hash].js',
    path: path.resolve(__dirname, '../dist'),
    publicPath: '/public',
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
    new HTMLWebpackPlugin({
      template: path.resolve(__dirname, '../client/template.html') //会在该模板文件中插入入口文件对应的打包好的资源文件
    })
  ]
}