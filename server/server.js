const express = require('express')
const ReactSSR = require('react-dom/server') //注意这里要引入的SSR在react-dom/server里
const serverEntry = require('../dist/server-entry.js') //引入打包后的服务端渲染后的js文件

const app = express()

app.get('*', (req, res) => {
  ReactSSR.render(serverEntry)
})