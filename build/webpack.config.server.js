const path = require('path')
// const HTMLWebpackPlugin = require('html-webpack-plugin')//服务端渲染的时候就不要生成html了

module.exports = {
  target: 'node', //服务端渲染的时候，设置webpack打包后的文件要运行在哪个执行环境中，默认是web，是在浏览器环境中
  entry: {
    app: path.resolve(__dirname, '../client/server-entry.js')
  },
  output: {
    filename: 'server-entry.js', //顺带着这里的入口文件也要改变，因为不需要缓存了，所以取消[name],[hash]之类的配置，直接是一个文件名即可
    path: path.resolve(__dirname, '../dist'),
    publicPath: '/public',
    libraryTarget: 'commonjs2' //使用最新的模块加载方案，适用于nodejs环境
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
  //服务端渲染的时候就不要生成html了
  // plugins: [
  //   new HTMLWebpackPlugin()
  // ]
}