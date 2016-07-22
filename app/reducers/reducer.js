import { SITE_INFO } from '../constants/ActionTypes';

export default function reducer(state={}, action) {

  window.addEventListener("message", (data) => {
    if (data.data) {
      //console.log(data);
    }
  }, false);

  switch (action.type) {
  case SITE_INFO:
    return state;
  default:
    return state;
  }
}
