import React from 'react';

const Comments = React.createClass({

  componentDidMount: function() {
    var _this = this;
    console.log('Banana pancakes');
  },

  render: function() {
    return (
      <article>
        <h1>Leave me a comment</h1>
        <p>
          Leave me a comment on this tutorial.
        </p>
      </article>
    );
  }
});

export default Comments;
