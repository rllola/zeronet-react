import { SITE_INFO } from '../constants/ActionTypes';

export default function reducer(state={}, action) {

  switch (action.type) {
    case SITE_INFO:
      var shite = Object.assign({}, state, action.info.result);
      console.log(action);
      console.log("shite", shite);
	    return shite;
    default:
      return state;
  }
}
