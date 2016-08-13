import ZeroFrame from 'zeroframe'
import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import { updateInfo } from './site/actions'
import Router from './router'
import rootReducer from './reducers'

//  Create store
let store = createStore(rootReducer)

//  Update store with data site info.
ZeroFrame.cmd('siteInfo', {}, (info) => {
  store.dispatch(updateInfo(info))
})

// Now we can attach the router to the 'root' element like this:
render(
  <Provider store={store}>
    {Router}
  </Provider>,
  document.getElementById('root')
)

ZeroFrame.route = function (cmd, message) {
  let info = message.params
  store.dispatch(updateInfo(info))
  return ZeroFrame.log('Store updated with')
}
