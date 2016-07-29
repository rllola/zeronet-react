const initialState = {
  url: null,
  waiting_cb: {},
  wrapper_nonce: document.location.href.replace(/.*wrapper_nonce=([A-Za-z0-9]+).*/, "$1"),
  next_message_id: 1
};

const cmd = () => {
  console.log("Create a command");
};

export default function zeroframe(state=initialState, action) {

  switch (action.type) {
    case 'wrapperOpenedWebsocket':
      console.log("[ZeroFrame] Websocket open");
      return state;
    case 'wrapperReady':
      console.log("[ZeroFrame] wrapperReady");
      return state;
    case 'response':
      console.log("[ZeroFrame] response :", action);
	    return Object.assign({}, state, action.response.result);
    default:
      return state;
  }
}
