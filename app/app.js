import Constants from './util/constants';
import ZeroFrame from './util/zeroframe';
import React from 'react';
import ReactDOM from 'react-dom';
import LocalStorage from './util/localstorage.js';

// Notice that we've organized all of our routes into a separate file.
import Router from './router';

// Now we can attach the router to the 'root' element like this:
ReactDOM.render(Router, document.getElementById('root'));


window.history.pushState = function(state, title, url) {
  var relative_url = url.split(Constants.APP_ID).pop();
  ZeroFrame.cmd("wrapperPushState", [state, title, relative_url]);
};
window.history.replaceState = function(state, title, url) {
  var relative_url = url.split(Constants.APP_ID).pop();
  ZeroFrame.cmd("wrapperReplaceState", [state, title, relative_url]);
};
