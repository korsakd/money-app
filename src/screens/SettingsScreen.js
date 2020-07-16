import React from 'react';
import {View, Text} from 'react-native';
import {connect} from 'react-redux';
import {setUser} from '../redux/reducers/userReducer';
import FocusAwareStatusBar from '../utils/StatusBarColor';

const Settings = ({user}) => {
  return (
    <View style={{flex: 1}}>
      <FocusAwareStatusBar backgroundColor="#fff" barStyle="dark-content" />
      {/* <LoginList fromSetting={true} />
      <LoginHome fromSettings={true} /> */}
      <Text>123</Text>
    </View>
  );
};

const mapStateToProps = state => {
  return {
    user: state.userReducer.user,
  };
};

const mapDispatchToProps = dispatch => ({
  userState: user => dispatch(setUser(user)),
});
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Settings);
