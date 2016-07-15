import React from 'react';
import { render } from 'react-dom';

import { Provider } from 'react-redux';
import { createStore } from 'redux';

// Notice that we've organized all of our routes into a separate file.
import Router from './router';
import { reducer } from './reducers';

let store = createStore(reducer);

console.log(store);

// Now we can attach the router to the 'root' element like this:
render(
  <Provider store={store}>
    {Router}
  </Provider>,
  document.getElementById('root'));
