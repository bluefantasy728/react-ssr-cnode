import React from 'react'
import ReactDOM from 'react-dom'
import { AppContainer } from 'react-hot-loader' // eslint-disable-line
import App from './App.jsx'

// ReactDOM.hydrate( //这里的hydrate代替render，是因为在react16版本之后，如果是服务端渲染，则使用hydrate
// react会对比服务端和客户端的代码的差别，如果有差别，会认为服务端的代码有问题，则会使用客户端的内容替换服务端内容
//   <App />,
//   document.getElementById('root')
// )

// console.log(module.hot)
const ndRoot = document.getElementById('root')
const render = (Component) => {
  const myRender = module.hot ? ReactDOM.render : ReactDOM.hydrate
  myRender(
    <AppContainer>
      <Component />
    </AppContainer>,
    ndRoot,
  )
}

render(App)

if (module.hot) {
  module.hot.accept('./App.jsx', () => {
    const NextApp = require('./App.jsx').default
    render(NextApp)
  })
}
