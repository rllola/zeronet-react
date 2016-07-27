import * as types from '../constants/ActionTypes';

export function siteInfo(info) {
  return {
    type: types.SITE_INFO,
    info
  };
}
