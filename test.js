const webpack = require('webpack')
const config = require('./build/webpack.config.server.js')
const MemoryFs = require('memory-fs')

// const compile = webpack(config)
// console.log(compile.watch.toString())
let mfs = new MemoryFs()

const str = mfs.readFileSync('./.babelrc', 'utf8')

console.log(str)