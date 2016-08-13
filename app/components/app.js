import { APP_ID } from '../util/constants'
import ZeroFrame from 'zeroframe'
import React, { Component } from 'react'
import { Router, browserHistory, Route } from 'react-router'

// Store
import GlobalStore from './store/global_store'

// Layouts
import MainLayout from './mainLayout'

// Pages
import Home from './home'
import Tutorial from './tutorial'
import AboutMe from './aboutMe'
import Messages from './messages'

var globalStore = new GlobalStore()

export default class App extends Component {
  getChildContext () {
    return {
      globalStore: globalStore
    }
  }

  render () {
    return (
      <Router history={browserHistory}>
        <Route component={MainLayout}>
          <Route path={`/${APP_ID}`} component={Home} />
          <Route path="tutorial" component={Tutorial} />
          <Route path="about-me" component={AboutMe} />
          <Route path="messages" component={Messages} />
          <Route from="*" to="{`/${APP_ID}`}" />
        </Route>
      </Router>
    )
  }
}

App.childContextTypes = {
  globalStore: React.PropTypes.object
}

ZeroFrame.route = function (cmd, message) {
  let info = message.params
  globalStore.site = info
}
