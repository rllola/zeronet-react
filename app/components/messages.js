import React from 'react';

const Messages = React.createClass({

  componentDidMount: function() {
    var _this = this;
    ZeroFrame.log('Banana Pancake');
  },

  render: function() {
    return (
      <article>
        <h1>Leave me a message</h1>
        <p>
          Tell me what you think of it !
        </p>
      </article>
    );
  }
});

export default Messages;
