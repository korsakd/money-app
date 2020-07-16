import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/dist/MaterialCommunityIcons';

const SocialLoginButton = ({socialSignIn, socialIconName, socialName}) => {
  return (
    <View style={style.wrap}>
      <TouchableOpacity
        style={
          socialIconName === 'google'
            ? style.googleButton
            : socialIconName === 'facebook'
            ? style.facebookButton
            : style.twitterButton
        }
        onPress={() => socialSignIn()}>
        <Icon name={socialIconName} size={30} color="#fff" />
        <Text style={style.text}>{socialName}</Text>
      </TouchableOpacity>
    </View>
  );
};

const style = StyleSheet.create({
  facebookButton: {
    backgroundColor: '#4267B2',
    width: 370,
    height: 60,
    borderRadius: 7,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  twitterButton: {
    backgroundColor: '#1DA1F2',
    width: 370,
    height: 60,
    borderRadius: 7,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  googleButton: {
    backgroundColor: '#DB4437',
    width: 370,
    height: 60,
    borderRadius: 7,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  wrap: {marginTop: 10},
  text: {
    marginLeft: 10,
    color: '#fff',
    fontSize: 20,
    textTransform: 'uppercase',
  },
});

export default SocialLoginButton;
