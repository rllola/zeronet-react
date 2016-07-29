import { UPDATE_MESSAGES } from './constants';

const initialState = [];

export default function site(state=initialState, action) {

  switch (action.type) {
    case UPDATE_MESSAGES:
      console.log(action.messages);
      let result = Object.assign([], state, action.messages);
      console.log(result);
      return result;
    default:
      return state;
  }
}
