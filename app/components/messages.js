import React, { Component } from 'react';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as ZeroFrameActions from '../actions';


class Messages extends Component {
  componentDidMount() {
    console.log(this.props);
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

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(ZeroFrameActions, dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Messages);
