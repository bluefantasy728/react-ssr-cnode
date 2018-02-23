const path = require('path')
const webpack = require('webpack')
const HTMLWebpackPlugin = require('html-webpack-plugin')

const isDev = process.env.NODE_ENV === 'development' //在package.json里的script可以配置设置当前的运行环境，这里是可以获取到的
// console.log(isDev)

const config = {
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

//设置了contentBase之后，相当于所有访问localhost:8888/filename这样的访问都是可以以静态的方式访问到，
if(isDev) {
  config.entry = { //在使用HMR时要对入口文件进行一个多入口配置
    app: [
      'react-hot-loader/patch',
      path.resolve(__dirname, '../client/app.js')
    ]
  }
  config.devServer = { //如果是开发环境，那就在config中多一个配置项，配置webpack-dev-server
    host: '0.0.0.0', //代表可以用任何方式进行访问，比如localhost, 127.0.0.1或者本机的ip地址，这样利于同一个局域网，其他机器访问这个服务器
    port: '8899',
    contentBase: path.resolve(__dirname, '../dist'), //webpack编译后的文件是到dist目录下，应该设置这个服务的静态文件的位置为output下面的path里制定的目录
    hot: true, //启动hot module replacement功能，但是前提是一定要在react文件中配置相关的hot module replacement的模块，因为HMR会在js中注入一部分HMR相关的代码，但是因为没有配置这样就会找不到相关的代码，导致语法错误
    overlay: {
      errors: true //设置，如果在编译过程中发生任何问题，都直接在网页上呈现黑色背景的错误提示，这里的errors:true说明只显示错误的信息
    },
    publicPath: '/public', //这个配置相当于，通过devServer访问静态文件，都需要通过/public的路径才能访问静态文件
    historyApiFallback: {
      index: '/public/index.html', //本身这个设置是为了避免客户端那边请求了错误地址出现404，有了这个配置，就会所有访问不到的页面都会请求index.html，又因为这里加了/public，相当于请求了静态目录下的index.html文件。这里还有一个坑，因为之前有编译打包过文件到硬盘本地的dist目录，dist这个目录已经存在，这个devServer会先从硬盘本地找对应的静态文件，比如打包后的js文件， 而不是访问devServer动态编译的那个js文件了，这样因为在文件名中设置了hash码，这样每次动态编译的js文件名肯定和本地已经存在的文件名不一样，这样就访问不到这个js文件了，所以应该要把dist目录删除！！！
    }
  }
  config.plugins.push(new webpack.HotModuleReplacementPlugin())
}

module.exports = config