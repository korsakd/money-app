import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/dist/MaterialCommunityIcons';
import LoadingScreen from './LoadingScreen';
import translate from '../translate/Translate';

const LoginScreen = ({
  handleLogIn,
  setIsSignup,
  error,
  user,
  isLoadingScreen,
  setIsLoadingScreen,
  fromSettings,
  setError,
}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  if (!isLoadingScreen) {
    return (
      <View style={styles.container}>
        <Text style={styles.textHeader}>{translate('login')}</Text>
        <Text style={styles.textError}>
          {error === 'auth/invalid-email'
            ? 'Неверный E-mail'
            : error === 'auth/user-not-found'
            ? 'Такого пользователя не существует или неверный E-mail'
            : error === 'auth/wrong-password'
            ? 'Неверный пароль'
            : error === 'auth/user-disabled'
            ? 'Пользователь отключен'
            : error}
        </Text>
        <TextInput
          style={
            error === 'auth/invalid-email'
              ? styles.textInputError
              : error === 'Введите логин'
              ? styles.textInputError
              : error ===
                'Такого пользователя не существует или неверный E-mail'
              ? styles.textInputError
              : error === 'Некорректно введен E-mail'
              ? styles.textInputError
              : styles.textInput
          }
          autoCapitalize="none"
          keyboardType="email-address"
          placeholder="Email"
          onChangeText={element => setEmail(element)}
          value={email}
        />
        <TextInput
          secureTextEntry
          style={
            error === 'auth/wrong-password'
              ? styles.textInputError
              : error === 'Введите пароль'
              ? styles.textInputError
              : styles.textInput
          }
          autoFocus={error === 'Введите пароль' ? true : false}
          autoCapitalize="none"
          placeholder={translate('password')}
          onChangeText={pass => setPassword(pass)}
          value={password}
        />
        <TouchableOpacity
          style={fromSettings ? styles.settingsButton : styles.button}
          onPress={() => {
            handleLogIn(email, password);
          }}>
          <Text style={styles.textButton}>{translate('comeIn')}</Text>
          <Icon name="login" size={24} color="#fff" />
        </TouchableOpacity>
        <View style={styles.signUpContainer}>
          <Text style={styles.signUpText}>{translate('signUpQuestion')}</Text>
          <TouchableOpacity
            style={{
              paddingVertical: 10,
              paddingRight: 5,
            }}
            onPress={() => {
              setError('');
              setIsSignup(true);
            }}>
            <Text style={styles.signUpButton}>{translate('signUp')}</Text>
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
    backgroundColor: '#470736',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 15,
    width: 370,
    height: 60,
    borderRadius: 7,
  },
  settingsButton: {
    backgroundColor: '#be935a',
    flexDirection: 'row',
    marginTop: 15,
    width: 370,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 7,
  },
  textButton: {
    fontSize: 20,
    color: '#fff',
    marginRight: 5,
    textTransform: 'uppercase',
  },
  signUpContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    marginTop: 8,
  },
  signUpText: {
    marginRight: 5,
    fontSize: 17,
  },
  signUpButton: {
    color: '#18ABFF',
    textDecorationLine: 'underline',
    fontSize: 17,
  },
});

export default LoginScreen;
