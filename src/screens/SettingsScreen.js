import React from 'react';
import {View, StyleSheet} from 'react-native';
import {connect} from 'react-redux';
import {setUser} from '../redux/reducers/userReducer';
import LoginHome from '../Components/LoginHome';
import FocusAwareStatusBar from '../utils/StatusBarColor';

const Settings = ({user}) => {
  return (
    <View style={user ? styles.settingsUserWrap : styles.settingsWrap}>
      <FocusAwareStatusBar backgroundColor="#fff" barStyle="dark-content" />
      <View style={styles.logInContainer}>
        <LoginHome fromSettings={true} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  settingsUserWrap: {
    backgroundColor: '#fff',
    flex: 1,
  },
  settingsWrap: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  logInContainer: {
    marginVertical: 10,
    marginHorizontal: 5,
    borderColor: '#000',
    shadowColor: '#000',
    elevation: 2,
  },
});

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
