import React, { useState } from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import LoginInput from '../Components/LoginInput';
import { useColorScheme } from 'react-native-appearance';
import { getCurrentTheme } from '../Theme';
import { NavigationProp, useNavigation } from '@react-navigation/core';
import { MainStackParamList } from '../Navigation';
import { useDispatch } from 'react-redux';
import { signInWithEmailAndPassword } from '../store/Thunks/loginThunks';

const LoginScreen = () => {
  const scheme = useColorScheme();
  const { colors } = getCurrentTheme(scheme);
  const navigation = useNavigation<NavigationProp<MainStackParamList>>();
  const [text, setText] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();

  const signIn = async () => {
    dispatch(signInWithEmailAndPassword(text, password, navigation));
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={styles.textInputContainer}>
        <LoginInput title={'Email'} value={text} setValue={setText} />
        <LoginInput
          title={'Password'}
          value={password}
          setValue={setPassword}
        />
        <View style={styles.buttonContainer}>
          <Pressable style={styles.button} onPress={signIn}>
            <Text style={[styles.buttonText, { color: colors.text }]}>
              SIGN IN
            </Text>
          </Pressable>
          <Pressable
            style={styles.button}
            onPress={() => {
              navigation.navigate('SignUp');
            }}>
            <Text style={[styles.buttonText, { color: colors.text }]}>
              SIGN UP
            </Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textInputContainer: {
    width: '80%',
    marginBottom: 10,
    justifyContent: 'space-between',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  button: {
    borderColor: 'tomato',
    borderWidth: 1,
    width: '49%',
    alignItems: 'center',
    padding: 10,
    borderRadius: 5,
  },
  buttonText: { fontWeight: 'bold' },
});
