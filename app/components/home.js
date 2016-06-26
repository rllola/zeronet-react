import React from 'react';

const Home = React.createClass({
  render: function() {
    return (
      <div className="home-page">
        <h1>The app has React Router</h1>
        <p>
          While the <a href="https://css-tricks.com/learning-react-router/">CSS-Tricks article</a> for
          this guide covers an explanation of <strong>React Router</strong>, there
          are still many implementation details in this code that the article
          doesn't cover. For a better understanding of those details, see
          the <a href="https://github.com/bradwestfall/CSS-Tricks-React-Series">Github documentation</a> for
          this guide.
        </p>
        <p>
          As far as the [Search Title] and [Total Results] that you'll see on the results page,
          those are static for now. We will make them dynamic in the third guide.
        </p>
      </div>
    );
  }
});

export default Home;
