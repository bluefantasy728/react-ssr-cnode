const path = require('path')
const fs = require('fs')
const express = require('express')
const ReactSSR = require('react-dom/server') //注意这里要引入的SSR在react-dom/server里
const serverEntry = require('../dist/server-entry.js').default //引入打包后的服务端渲染后的js文件，因为在webpack里设置了libraryTarget: 'commonjs2'，而在server-entry里我们是export default这个是es6的语法，所以这里要多写.default才能得到真正的serverEntry的内容

const template = fs.readFileSync(path.resolve(__dirname, '../dist/index.html'), 'utf8') //指定utf-8的格式读出内容，而不是buffer

const app = express()

app.use('/public', express.static(path.resolve(__dirname, '../dist'))) //将dist这个目录作为静态目录，当浏览器访问/public这个url后，当做是读取静态文件。配合webpack.config里的publicPath这个配置，可以将读取静态文件单独设置出来。
//这一步写在下面的get前面，是为了区分浏览器在请求不同地址的时候做不同的处理

app.get('/', (req, res) => {
  // if(req.url === '/favicon.ico') {
    
  // }
  // console.log(req.url);
  const appString = ReactSSR.renderToString(serverEntry)
  const stringToSend = template.replace('<app></app>', appString) //将读取到的加入静态资源的文件后的模板文件中，将占位用的<app></app>替换成ReactSSR渲染的内容
  res.send(stringToSend)
})

app.listen(3333, () => {
  console.log('server start!!!');
})