import { SITE_INFO } from '../constants/ActionTypes';

export default function reducer(state={}, action) {

  switch (action.type) {
  case SITE_INFO:
    return state;
  default:
    return state;
  }
}
