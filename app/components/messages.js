import React, { Component } from 'react';
import { connect } from 'react-redux';
import ZeroFrame from '../util/zeroframe'

class Messages extends Component {
  componentDidMount() {
    ZeroFrame.cmd("certSelect", [["zeroid.bit"]], this.updateUser);
    ZeroFrame.cmd("ping");
    console.log(this.props);
  }

  updateUser(data) {
    console.log(data);
    console.log('Update User');
  }

  render() {
    return (
      <p>Hi {this.props.info.cert_user_id}</p>
  )}
};


function mapStateToProps(state) {
  return {
    info: state.zeroframe
  };
}

export default connect(
  mapStateToProps
)(Messages);
