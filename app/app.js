import React from 'react';
import ReactDOM from 'react-dom';

// Notice that we've organized all of our routes into a separate file.
import Router from './router';

import ZeroFrame from './zeroframe/zeroframe';

// Now we can attach the router to the 'root' element like this:
ReactDOM.render(Router, document.getElementById('root'));
