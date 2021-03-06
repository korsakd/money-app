import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import LoadingScreen from './LoadingScreen';
import translate from '../translate/Translate';

const SignUpScreen = ({
  handleSignUp,
  error,
  isLoadingScreen,
  setIsSignup,
  fromSettings,
  setError,
}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [userName, setUserName] = useState('');

  if (!isLoadingScreen) {
    return (
      <View style={styles.container}>
        <Text style={styles.textHeader}>{translate('signUp')}</Text>
        <Text style={styles.textError}>
          {error === 'auth/email-already-in-use'
            ? 'Такой E-mail уже существует'
            : error === 'auth/invalid-email'
            ? 'Некорректно введен E-mail'
            : error === 'auth/weak-password'
            ? 'Пароль должен состоять из 6 символов'
            : error
            ? error
            : null}
        </Text>
        <TextInput
          placeholder="Email"
          autoCapitalize="none"
          keyboardType="email-address"
          style={
            error === 'auth/email-already-in-use'
              ? styles.textInputError
              : error === 'auth/invalid-email'
              ? styles.textInputError
              : error === 'Введите E-mail'
              ? styles.textInputError
              : error === 'Некорректно введен E-mail'
              ? styles.textInputError
              : styles.textInput
          }
          onChangeText={element => setEmail(element)}
          value={email}
        />
        <TextInput
          secureTextEntry
          placeholder={translate('password')}
          autoCapitalize="none"
          style={
            error === 'auth/weak-password'
              ? styles.textInputError
              : error === 'Введите пароль'
              ? styles.textInputError
              : error === 'Пароль должен быть более 6 символов'
              ? styles.textInputError
              : styles.textInput
          }
          onChangeText={pass => setPassword(pass)}
          value={password}
        />
        <TextInput
          placeholder={translate('userName')}
          autoCapitalize="none"
          style={
            error === 'Введите имя пользователя'
              ? styles.textInputError
              : styles.textInput
          }
          onChangeText={pass => setUserName(pass)}
          value={userName}
        />
        <TouchableOpacity
          onPress={() => {
            handleSignUp(email, password, userName);
          }}
          style={fromSettings ? styles.settingsButton : styles.button}>
          <Text style={styles.textButton}>{translate('signUp')}</Text>
        </TouchableOpacity>
        <View style={styles.signUpContainer}>
          <Text style={styles.logInText}>{translate('loginQuestion')}</Text>
          <TouchableOpacity
            style={{
              paddingVertical: 10,
              paddingRight: 5,
            }}
            onPress={() => {
              setError('');
              setIsSignup(false);
            }}>
            <Text style={styles.logInButton}>{translate('comeIn')}</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 15,
  },
  textInput: {
    height: 40,
    width: '90%',
    borderColor: 'gray',
    borderWidth: 1,
    marginTop: 8,
  },
  textInputError: {
    height: 40,
    width: '90%',
    borderColor: 'red',
    borderWidth: 1,
    marginTop: 8,
  },
  textHeader: {
    fontSize: 25,
    fontWeight: 'bold',
  },
  textError: {
    color: 'red',
  },
  button: {
    backgroundColor: '#1c2b59',
    marginTop: 15,
    width: 370,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
  },
  settingsButton: {
    backgroundColor: '#be935a',
    flexDirection: 'row',
    marginTop: 15,
    width: 370,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
  },
  textButton: {
    fontSize: 20,
    color: '#fff',
    textTransform: 'uppercase',
  },
  signUpContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    marginTop: 8,
  },
  logInText: {
    marginRight: 5,
    fontSize: 17,
  },
  logInButton: {
    color: '#18ABFF',
    textDecorationLine: 'underline',
    fontSize: 17,
  },
});

export default SignUpScreen;
