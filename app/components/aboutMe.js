import React, { Component } from 'react'

export default class AboutMe extends Component {
  render () {
    return (
      <article>
        <h1>About Us</h1>
        <p>
          Not much to say here. Everyone can contribute. If you do don't, forget to add your name to the list:
        </p>
        <ul>
          <li>Lola</li>
          <li>Coda</li>
        </ul>
        <a href="https://github.com/rllola/zeronet-react">Here the link to the github.</a>
      </article>
    )
  }
}
