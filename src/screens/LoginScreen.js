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

const LoginScreen = ({
  handleLogIn,
  setIsSignup,
  error,
  user,
  isLoadingScreen,
  setIsLoadingScreen,
}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  if (!isLoadingScreen) {
    return (
      <View style={styles.container}>
        <Text style={styles.textHeader}>Login</Text>
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
          placeholder="Password"
          onChangeText={pass => setPassword(pass)}
          value={password}
        />
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            handleLogIn(email, password);
          }}>
          <Text style={styles.textButton}>Войти</Text>
          <Icon name="login" size={24} color="#fff" />
        </TouchableOpacity>
        <View style={styles.signUpContainer}>
          <Text style={styles.signUpText}>Ещё не зарегистрированы?</Text>
          <TouchableOpacity
            onPress={() => {
              setIsSignup(true);
            }}>
            <Text style={styles.signUpButton}>Регистрация</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
  if (isLoadingScreen) {
    if (!user) {
      return <LoadingScreen />;
    }
    if (user && user.displayName) {
      setIsLoadingScreen(false);
    }
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
    fontSize: 20,
    fontWeight: 'bold',
  },
  textError: {
    color: 'red',
  },
  button: {
    backgroundColor: '#470736',
    flexDirection: 'row',
    marginTop: 8,
    paddingVertical: 5,
    paddingHorizontal: 5,
    alignItems: 'center',
    borderRadius: 5,
  },
  textButton: {
    color: '#fff',
    marginRight: 5,
  },
  signUpContainer: {
    flexDirection: 'row',
    marginTop: 8,
  },
  signUpText: {
    marginRight: 5,
  },
  signUpButton: {
    color: '#18ABFF',
    textDecorationLine: 'underline',
  },
});

export default LoginScreen;
