import { APP_ID } from '../util/constants'
import ZeroFrame from 'zeroframe'
import React, { Component } from 'react'
import { Router, browserHistory, Route } from 'react-router'

// Store
import Site from './store/site'

// Layouts
import MainLayout from './mainLayout'

// Pages
import Home from './home'
import Tutorial from './tutorial'
import AboutMe from './aboutMe'
import Messages from './messages'

let site = new Site()

/* So ZeroFrame can update the information in the store */
ZeroFrame.route = (cmd, message) => {
  site.info = message.params
}

class App extends Component {
  static childContextTypes = {
    store: React.PropTypes.object
  }
  getChildContext () {
    return {
      store: {
        site: site
      }
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

export default App
