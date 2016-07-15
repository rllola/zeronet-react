import React from 'react';

// import ZeroFrame module
import ZeroFrame from '../zeroframe/zeroframe';


const Messages = React.createClass({
  getInitialState: function() {
    return {
      auth: false,
      messages: []
    };
  },

  updateUser: function(e) {
    console.log(e.data);
    console.log('lol', this.state);
    if (e.data.params) {
      this.setState({auth: e.data.params.cert_user_id});
    } else if (e.data.results) {
      this.setState({auth: e.data.result.cert_user_id});
    }
  },

  componentDidMount: function() {
   window.addEventListener("message", this.updateUser, false);
   ZeroFrame.cmd("siteInfo", {}, function(data) {
     console.log(data);
   });
  },

  handleClick: function() {
    ZeroFrame.cmd("certSelect", [["zeroid.bit"]], null);
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
                <button type="button" className="btn btn-primary" onClick={this.handleClick}>Select user</button>
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
