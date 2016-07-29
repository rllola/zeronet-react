import { wrapperOpenedWebsocket, SITE_INFO } from '../constants/ActionTypes';

const initialState = {
  url: null,
  waiting_cb: {},
  wrapper_nonce: document.location.href.replace(/.*wrapper_nonce=([A-Za-z0-9]+).*/, "$1"),
  next_message_id: 1
};

const cmd = () => {
  
};

export default function zeroframe(state=initialState, action) {

  switch (action.type) {
    case wrapperOpenedWebsocket:
      console.log("[ZeroFrame] Websocket open");
      return state;
    case wrapperReady:
      console.log();
      return state;
    case SITE_INFO:
	    return Object.assign({}, state, action.info.result);
    default:
      return state;
  }
}
