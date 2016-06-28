import React from 'react';

// import ZeroFrame module
import ZeroFrame from '../zeroframe/zeroframe';


const Messages = React.createClass({
  getInitialState: function() {
    return {
      auth: false,
      messages: []
    }
  },

  componentDidMount: function() {
    var _this = this;
    ZeroFrame.cmd("siteInfo", {}, function(info) {
      if info.cert_user_id === null {
        _this.state.auth = false;
      } else {
        _this.state.auth = info.cert_user_id;
      }
    });
  },

  render: function() {
    var form;
    if (this.state.auth) {
      form =  <form>
                <h4>Glad to meet you {this.state.auth}</h4>
                <fieldset className="form-group">
                  <label htmlFor="message">Your message</label>
                  <textarea type="text" className="form-control" id="message">
                  </textarea>
                </fieldset>
                <button type="submit" className="btn btn-primary">Submit</button>
              </form>
    } else {
      form =  <p>Too bad you need to be auth to post a message.<br/>
                <a>Select user</a>
              </p>
    }
    return (
      <article>
        <h1>Leave me a message</h1>
        <p>
          Tell me what you think of it !
        </p>
        { form }
      </article>
    );
  }
});

export default Messages;
