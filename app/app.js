import Constants from './util/constants';
import ZeroFrame from './util/zeroframe';
import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import LocalStorage from './util/localstorage.js';
import { siteInfo } from './actions';

import Router from './router';
import rootReducer from './reducers';

//Create store
let store = createStore(rootReducer);

// Listen to fucking message from window
window.addEventListener('message', (data) => {
  store.dispatch(siteInfo(data.data));
  console.log(store.getState());
});

//postMessage to initialize fucking value (Not sure needed here)
let message = {
    "cmd": "siteInfo",
    "params": {},
    "wrapper_nonce": document.location.href.replace(/.*wrapper_nonce=([A-Za-z0-9]+).*/, "$1"),
    "id": 0,
    "next_message_id": 1
};
window.parent.postMessage(message, "*");

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
