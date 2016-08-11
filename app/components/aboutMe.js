import React, { Component } from 'react';
import { observer } from 'mobx-react';

@observer
export default class AboutMe extends Component {
  constructor() {
    super();

    this.changeName = this.changeName.bind(this);
  }

  changeName() {
    this.context.store.global.name = 'Coda';
  }

  render() {
    return (
      <article>
        <h1>About Me</h1>
        <p>
          My name is { this.context.store.global.name }
          <br /><br />
          <button onClick={this.changeName}>Change Name</button>
        </p>
      </article>
    );
  }
};

AboutMe.contextTypes = {
  store: React.PropTypes.object.isRequired
};