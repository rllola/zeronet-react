import React from 'react'
import ReactDOM from 'react-dom'
import App from './components/app'
import ZeroFrame from 'zeroframe'
import { APP_ID } from './util/constants'

ReactDOM.render(
  <App />,
  document.getElementById('root')
)

window.history.pushState = (state, title, url) => {
  var relativeUrl = url.split(APP_ID).pop()
  ZeroFrame.cmd('wrapperPushState', [state, title, relativeUrl])
}

window.history.replaceState = (state, title, url) => {
  var relativeUrl = url.split(APP_ID).pop()
  ZeroFrame.cmd('wrapperReplaceState', [state, title, relativeUrl])
}
