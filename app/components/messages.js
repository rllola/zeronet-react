import React, { Component } from 'react';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as ZeroFrameActions from '../actions';

// import ZeroFrame module
import ZeroFrame from '../zeroframe/zeroframe';


class Messages extends Component {
  constructor(props, context) {
    super(props, context);
    this.updateUser = this.updateUser.bind(this);
    this.updateMessages = this.updateMessages.bind(this);
    this.handleTextChange = this.handleTextChange.bind(this);
    this.state = {
      auth: false,
      auth_address: null,
      messages: []
    };
  }

  updateUser(e) {
    console.log(e.data);
    if (e.data.params) {
      this.setState({auth: e.data.params.cert_user_id, auth_address: e.data.params.auth_address});
    } else if (e.data.result) {
      if (e.data.result.cert_user_id !== undefined) {
        this.setState({auth: e.data.result.cert_user_id, auth_address: e.data.result.auth_address});
      }
    }
  }

  updateMessages(messages) {
    this.setState({messages: messages});
  }

  componentDidMount() {
   window.addEventListener("message", this.updateUser, false);
   console.log(this.props.actions.siteInfo());
   /*ZeroFrame.cmd("siteInfo", {}, function(data) {
     console.log(data);
   });*/
   ZeroFrame.cmd("dbQuery", ["SELECT * FROM message ORDER BY date_added"], this.updateMessages);
  }

  handleClick() {
    ZeroFrame.cmd("certSelect", [["zeroid.bit"]], null);
  }

  handleTextChange(e) {
    this.setState({text: e.target.value});
  }

  handleSubmit(e) {
    e.preventDefault();
    console.log(this.state.auth_address);
    var inner_path = "data/users/"+ this.state.auth_address +"/data.json";
    ZeroFrame.cmd("fileGet", {"inner_path": inner_path, "required": false}, (data) => {
      if (data) {
        data = JSON.parse(data);
      } else {
        data = { "message": [] };
      }
      data.message.push({
          "body": this.state.text,
          "date_added": new Date()
      });
      var json_raw = unescape(encodeURIComponent(JSON.stringify(data, undefined, '\t')))
      ZeroFrame.cmd("fileWrite", [inner_path, btoa(json_raw)], (res) => {
        if (res == "ok") {
          console.log('ok');
        } else {
          ZeroFrame.cmd("wrapperNotification", ["error", "File write error:" + res]);
        }
      });
    });
  }

  render() {
    var form, messageArr;
    if (this.state.auth) {
      form =  <form onSubmit={this.handleSubmit}>
                <h4>Glad to meet you {this.state.auth}</h4>
                <fieldset className="form-group">
                  <label htmlFor="message">Your message</label>
                  <textarea
                    id="message"
                    type="text"
                    className="form-control"
                    value={this.state.text}
                    onChange={this.handleTextChange} >
                  </textarea>
                </fieldset>
                <button type="submit" className="btn btn-primary">Submit</button>
              </form>
    } else {
      form =  <p>Too bad you need to be auth to post a message.<br/>
                <button type="button" className="btn btn-primary" onClick={this.handleClick}>Select user</button>
              </p>
    }

    messageArr = this.state.messages.map(function(message) {
           return <li>{message.body}</li>;
    });

    return (
      <article>
        <h1>Leave me a message</h1>
        <p>
          Tell me what you think of it !
        </p>
        { form }
        <ul>
        { messageArr }
        </ul>
      </article>
    );
  }
};


function mapStateToProps(state) {
  return {
    info: state.info
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(ZeroFrameActions, dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Messages);;
