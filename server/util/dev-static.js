const axios = require('axios')
const path = require('path')
const webpack = require('webpack')
const MemoryFs = require('memory-fs') //fs的扩展功能，可以将fs读取的内容写入内存中，而不是磁盘中，加快读取速度
const proxy = require('http-proxy-middleware')
const ReactDOMServer = require('react-dom/server')
const serverConfig = require('../../build/webpack.config.server.js') //服务端的webpack配置文件
const getTemplate = () => { //这个方法可以实时地拿到最新编译的template文件
  return new Promise((resolve, reject) => {
    axios.get('http://localhost:8899/public/index.html') //这个就是动态打包后在内存中生成的html文件
      .then(res => {
        resolve(res.data)
      })
      .catch(reject)
  })
}
const Module = module.constructor

const mfs = new MemoryFs
//实时获取bundle.js文件，是通过webpack.config.server.js这个配置文件，将它传入webpack方法，实时编译从而获取内容
const serverCompiler = webpack(serverConfig) //这里得到的是一个编译器对象，我们要用到里面的watch方法，实时监听，并且设置回调函数
serverCompiler.outputFileSystem = mfs //配置webpack读取文件系统是通过MemoryFs，而不是node自带的fs模块
let serverBundle
serverCompiler.watch({}, (err, stats) => {
  if(err) throw err
  stats = stats.toJson()
  stats.errors.forEach(err => console.log(err))
  stats.warnings.forEach(warn => console.log(warn))

  const bundlePath = path.resolve( //bundlePath就是内存中编译好的bundle.js文件
    serverConfig.output.path,
    serverConfig.output.filename
  )

  const bundleFileStr = mfs.readFileSync(bundlePath, 'utf8')
  const m = new Module()
  m._compile(bundleFileStr, 'server.js')
  serverBundle = m.exports.default //因为再watch里，每次代码更新，这个serverBundle都会更新，内容就是bundle.js

})

module.exports = (app) => {
  app.use('/public', proxy({
    target: 'http://localhost:8899' //因为这个服务中我们并没有静态出任何文件，所以这里借用http-proxy-middleware这个包来做代理，将所有访问/public的请求都代理到localhost:8899里
  }))

  //获取template文件，因为现在是实时更新，编译后的代码其实都在内存中，这里是获取到这个内容
  app.get('/', (req, res) => {
    getTemplate().then(template => {
      const content = ReactDOMServer.renderToString(serverBundle)
      res.send(template.replace('<!-- app -->', content))
    })
  })
}
