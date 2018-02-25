const path = require('path')

module.exports = {
	module: {
    rules: [
      {
        enforce: 'pre', //强制在编译代码前先执行eslint代码检测
        test: /.(js|jsx)$/,
        loader: 'eslint-loader',
        exclude: path.resolve(__dirname, '../node_modules'),
      },
      {
        test: /.(js|jsx)$/,
        exclude: path.resolve(__dirname, '../node_modules'),
        loader: 'babel-loader'
      }

    ]
	},
	resolve: {
		extensions: ['.js', '.jsx']
	},
	output: {
    path: path.resolve(__dirname, '../dist'),
    publicPath: '/public/',
  },
}
