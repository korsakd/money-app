import React, { useState } from 'react';
import { View, Text, Pressable } from 'react-native';
import LoginInput from './LoginInput';
import { useColorScheme } from 'react-native-appearance';
import { FACEBOOK, GOOGLE, TWITTER } from '../../../Constants';
import { getCurrentTheme } from '../../../Theme';
import LoginButton from './LoginButton';
import styles from './styles';

const LoginScreen = () => {
  const scheme = useColorScheme();
  const { colors } = getCurrentTheme(scheme);
  const [text, setText] = useState('');
  const [password, setPassword] = useState('');

  const buttonArray = [
    {
      // label: 'Facebook',
      iconName: 'facebook',
      color: FACEBOOK,
      onPress: () => {},
    },
    {
      // label: 'Google',
      iconName: 'google',
      color: GOOGLE,
      onPress: () => {},
    },
    {
      // label: 'Twitter',
      iconName: 'twitter',
      color: TWITTER,
      onPress: () => {},
    },
  ];

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={styles.textInputContainer}>
        <LoginInput title={'Login'} value={text} setValue={setText} />
        <LoginInput
          title={'Password'}
          value={password}
          setValue={setPassword}
        />
        <View style={styles.buttonContainer}>
          <Pressable style={styles.button}>
            <Text style={[styles.buttonText, { color: colors.text }]}>
              SIGN IN
            </Text>
          </Pressable>
          <Pressable style={styles.button} onPress={() => {}}>
            <Text style={[styles.buttonText, { color: colors.text }]}>
              SIGN UP
            </Text>
          </Pressable>
        </View>
      </View>
      {/* <View
        style={{
          width: '80%',
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}>
        {buttonArray.map(button => {
          return (
            <View key={button.color}>
              <LoginButton button={button} />
            </View>
          );
        })}
      </View> */}
    </View>
  );
};

export default LoginScreen;
