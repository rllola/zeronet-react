import React, { Component } from 'react'
import { observer } from 'mobx-react'

@observer
class Home extends Component {
  render () {
    return (
      <article>
        <h1>This is the home page</h1>
        <p>
          Some description text.
        </p>
        <p>
          Next time I will be more creative.
        </p>
      </article>
    )
  }
}

export default Home
