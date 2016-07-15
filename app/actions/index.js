import * as types from '../constants/ActionTypes';

export function changeUser(name) {
  return {
    type: types.ADD_FRIEND,
    name
  };
}
