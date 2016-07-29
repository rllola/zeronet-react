import Constants from './util/constants';
import ZeroFrame from './util/zeroframe';
import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import LocalStorage from './util/localstorage.js';

import Router from './router';
import rootReducer from './reducers';

//Create store
let store = createStore(rootReducer);

// Listener for zeronet message
window.addEventListener('message', (data) => {
  var response = data.data;

  // Dispatch the cmd as the action type.
  store.dispatch({
    type: response.cmd,
    response
  });
});

ZeroFrame.cmd("siteInfo", {}, (data)=> {
  console.log(data);
});

ZeroFrame.route = function(cmd, message) {
  return this.log("Fucking Update store here !", message);
};

// Now we can attach the router to the 'root' element like this:
render(
  <Provider store={store}>
    {Router}
  </Provider>,
  document.getElementById('root')
);

window.history.pushState = function(state, title, url) {
  var relative_url = url.split(Constants.APP_ID).pop();
  ZeroFrame.cmd("wrapperPushState", [state, title, relative_url]);
};
window.history.replaceState = function(state, title, url) {
  var relative_url = url.split(Constants.APP_ID).pop();
  ZeroFrame.cmd("wrapperReplaceState", [state, title, relative_url]);
};
