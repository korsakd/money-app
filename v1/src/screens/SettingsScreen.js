import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {connect} from 'react-redux';
import {setUser} from '../redux/reducers/userReducer';
import FocusAwareStatusBar from '../utils/StatusBarColor';

const Settings = ({user}) => {
  const data = {email: 'dimacy95@mail.ru', code: '524342'};
  const sendCode = () => {
    fetch('https://us-central1-moneyapp-d88f3.cloudfunctions.net/checkCode', {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(resp => resp.json())
      .then(data => console.tron(data));
  };
  return (
    <View style={{flex: 1}}>
      <FocusAwareStatusBar backgroundColor="#fff" barStyle="dark-content" />
      {/* <LoginList fromSetting={true} />
      <LoginHome fromSettings={true} /> */}
      {/* <TouchableOpacity onPress={() => sendEmail()}>
        <Text>Email</Text>
      </TouchableOpacity> */}
      <TouchableOpacity onPress={() => sendCode()}>
        <Text>Code</Text>
      </TouchableOpacity>
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
