import React from 'react';
import {View, StyleSheet} from 'react-native';
import {connect} from 'react-redux';
import {setUser} from '../redux/reducers/userReducer';
import LoginHome from '../Components/LoginHome';

const Settings = ({user, userState}) => {
  return (
    <View style={user ? null : styles.settingsWrap}>
      <View style={styles.logInContainer}>
        <LoginHome fromSettings={true} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  settingsWrap: {
    flex: 1,
    justifyContent: 'center',
  },
  logInContainer: {
    marginVertical: 10,
    marginHorizontal: 5,
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,

    elevation: 1,
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
