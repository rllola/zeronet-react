import React, { Component } from 'react';
import ZeroFrame from 'zeroframe';
import { observer } from 'mobx-react';
import * as messagesActions from '../messages/actions';

@observer
export default class Messages extends Component {
  constructor(props) {
    super(props);

    this.handleTextChange = this.handleTextChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this)
    this.state = {};
  }

  componentWillMount() {
    ZeroFrame.cmd("dbQuery", ["SELECT * FROM message ORDER BY date_added"], (data) => {
      this.context.store.global.messages = data;
    });
  }

  handleClick() {
    ZeroFrame.cmd("certSelect", [["zeroid.bit"]], null);
  }

  handleTextChange(e) {
    this.setState({text: e.target.value});
  }

  handleSubmit(e) {
    e.preventDefault();
    var inner_path = "data/users/"+ this.context.store.global.site.auth_address +"/data.json";
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
      var json_raw = unescape(encodeURIComponent(JSON.stringify(data, undefined, '\t')));
      ZeroFrame.cmd("fileWrite", [inner_path, btoa(json_raw)], (res) => {
        if (res == "ok") {
          console.log('ok');
          ZeroFrame.cmd("sitePublish", {"inner_path": inner_path}, (res) => {
            console.log(res);
          });
          ZeroFrame.cmd("dbQuery", ["SELECT * FROM message ORDER BY date_added"], (data) => {
            this.context.store.global.messages = data;
          });
        } else {
          ZeroFrame.cmd("wrapperNotification", ["error", "File write error:" + res]);
        }
      });
    });
  }

  render() {
    return (
      <article>
        <h1>Leave a message</h1>
        <p>Tell me what you think of it!</p>
        { this.context.store.global.site.cert_user_id &&
          <form onSubmit={this.handleSubmit}>
            <h4>Glad to meet you {this.context.store.global.site.cert_user_id}</h4>
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
          </form> }
        { !this.context.store.global.site.cert_user_id &&
          <div>
            <p>Too bad you need to be authorized to post a message</p>
            <button className="btn btn-primary" onClick={this.handleClick}>Select User</button>
          </div>
        }

        <ul>
          {  this.context.store.global.messages.map((message) => {
               return (<li>{message.body}</li>)
             })
          }
        </ul>
      </article>
    )
  }
}

Messages.contextTypes = {
  store: React.PropTypes.object.isRequired
};


function mapStateToProps(state) {
  return {
    site: state.site,
    messages: state.messages
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(messagesActions, dispatch)
  };
}
