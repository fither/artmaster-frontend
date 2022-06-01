import FuseSplashScreen from '@fuse/core/FuseSplashScreen';
import { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from '@reduxjs/toolkit';
import { hideMessage, showMessage } from 'app/store/fuse/messageSlice';

import { setUserData, logoutUser } from './store/userSlice';

// eslint-disable-next-line react/prefer-stateless-function
class Auth extends Component {
  render() {
    return !this.props.authCompleted ? <FuseSplashScreen /> : <>{this.props.children}</>;
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      logout: logoutUser,
      setUserData,
      showMessage,
      hideMessage,
    },
    dispatch
  );
}

function mapStateToProps(state) {
  return {
    authCompleted: state.auth.user.authCompleted,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Auth);
