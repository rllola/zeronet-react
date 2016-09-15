import React, { Component } from 'react'
import ZeroFrame from 'zeroframe'
import { resolve } from 'react-resolver'
import { observer } from 'mobx-react'

@resolve('messages', () => {
  const cmd = 'dbQuery'
  const query = 'SELECT * FROM message ORDER BY date_added'

  let promise = new Promise((resolve, reject) => {
    ZeroFrame.cmd(cmd, [query], (data) => {
      if (data.length >= 0) {
        resolve(data)
      } else {
        reject(Error('Cannot get messages'))
      }
    })
  })
  return promise
})
@observer
class Messages extends Component {
  static contextTypes = {
    store: React.PropTypes.object.isRequired
  }

  constructor (props) {
    super(props)

    this.handleTextChange = this.handleTextChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)

    this.state = {
      messages: this.props.messages
    }
  }

  handleClick () {
    ZeroFrame.cmd('certSelect', [['zeroid.bit']], null)
  }

  handleTextChange (e) {
    this.setState({text: e.target.value})
  }

  handleSubmit (e) {
    e.preventDefault()
    let innerPath = 'data/users/' + this.context.store.site.info.auth_address + '/data.json'
    ZeroFrame.cmd('fileGet', {'inner_path': innerPath, 'required': false}, (data) => {
      if (data) {
        data = JSON.parse(data)
      } else {
        data = { 'message': [] }
      }
      data.message.push({
        'body': this.state.text,
        'date_added': new Date()
      })
      var jsonRaw = unescape(encodeURIComponent(JSON.stringify(data, undefined, '\t')))
      ZeroFrame.cmd('fileWrite', [innerPath, window.btoa(jsonRaw)], (res) => {
        if (res === 'ok') {
          ZeroFrame.cmd('dbQuery', ['SELECT * FROM message ORDER BY date_added'], (data) => {
            this.setState({messages: data, text: ''})
          })
          ZeroFrame.cmd('sitePublish', {'inner_path': innerPath}, (res) => {
            console.log(res)
          })
        } else {
          ZeroFrame.cmd('wrapperNotification', ['error', 'File write error:' + res])
        }
      })
    })
  }

  render () {
    return (
      <article>
        <h1>Leave a message</h1>
        <p>Tell me what you think of it!</p>
        {this.context.store.site.info.cert_user_id &&
          <form onSubmit={this.handleSubmit}>
            <h4>Glad to meet you {this.context.store.site.info.cert_user_id}</h4>
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
          </form>}
        {!this.context.store.site.info.cert_user_id &&
          <div>
            <p>Too bad you need to be authorized to post a message</p>
            <button className="btn btn-primary" onClick={this.handleClick}>Select User</button>
          </div>
        }

        <ul>
          {this.state.messages.map((message) => {
            return (<li>{message.body}</li>)
          })}
        </ul>
      </article>
    )
  }
}

export default Messages
