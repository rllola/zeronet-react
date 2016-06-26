import React from 'react';
import { Router, Route, browserHistory, IndexRoute } from 'react-router';

// Layouts
import MainLayout from './components/main.layout';

// Pages
import Home from './components/home';
import Tutorial from './components/tutorial';
import AboutMe from './components/about-me';
import Comments from './components/comments';


export default (
  <Router history={browserHistory}>
    <Route component={MainLayout}>
      <Route path="/1JfWHNDQeR71Uf8EtyRqCNJ1Ked5t1pukk/" component={Home} />

      <Route path="tutorial" component={Tutorial} />

      <Route path="about-me" component={AboutMe} />

      <Route path="comments" component={Comments} />

    </Route>
  </Router>
);
