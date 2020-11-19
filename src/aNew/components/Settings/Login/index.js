import React, { useEffect, useState } from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import LoginButton from './LoginButton';
import { facebookSignIn, twitterSignIn, googleSignIn } from './loginFunctions';
import { GoogleSignin } from '@react-native-community/google-signin';
import LoginInput from './LoginInput';
import styles from './styles';

const LoginScreen = ({ navigation }) => {
  const [text, setText] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    GoogleSignin.configure({
      scopes: ['email'],
      webClientId:
        '837029674653-bao41219mm1v6bghpdavemchjscc4ipq.apps.googleusercontent.com',
      offlineAccess: true,
    });
  }, []);

  const buttonArray = [
    {
      label: 'Facebook',
      iconName: 'facebook',
      color: '#4267B2',
      onPress: facebookSignIn,
    },
    {
      label: 'Google',
      iconName: 'google',
      color: '#DB4437',
      onPress: googleSignIn,
    },
    {
      label: 'Twitter',
      iconName: 'twitter',
      color: '#1DA1F2',
      onPress: twitterSignIn,
    },
  ];

  return (
    <View style={styles.container}>
      <View style={styles.textInputContainer}>
        <LoginInput title={'Login'} value={text} setValue={setText} />
        <LoginInput
          title={'Password'}
          value={password}
          setValue={setPassword}
        />
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>LOGIN</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              navigation.navigate('SignIn');
            }}>
            <Text style={styles.buttonText}>SIGN IN</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={{ width: '80%' }}>
        {buttonArray.map(button => {
          return (
            <View key={button.label}>
              <LoginButton button={button} />
            </View>
          );
        })}
      </View>
    </View>
  );
};

export default LoginScreen;
