import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import LoadingScreen from './LoadingScreen';

const SignUpScreen = ({
  handleSignUp,
  error,
  user,
  isLoadingScreen,
  setIsLoadingScreen,
}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [userName, setUserName] = useState('');

  if (!isLoadingScreen) {
    return (
      <View style={styles.container}>
        <Text style={styles.textHeader}>Sign Up</Text>
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
              : styles.textInput
          }
          onChangeText={element => setEmail(element)}
          value={email}
        />
        <TextInput
          secureTextEntry
          placeholder="Password"
          autoCapitalize="none"
          style={
            error === 'auth/weak-password'
              ? styles.textInputError
              : error === 'Введите пароль'
              ? styles.textInputError
              : styles.textInput
          }
          onChangeText={pass => setPassword(pass)}
          value={password}
        />
        <TextInput
          placeholder="User name"
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
          style={styles.button}>
          <Text style={styles.textButton}>Регистрация</Text>
        </TouchableOpacity>
      </View>
    );
  }
  if (isLoadingScreen) {
    return <LoadingScreen />;
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
    marginTop: 8,
    paddingVertical: 5,
    paddingHorizontal: 5,
    alignItems: 'center',
    borderRadius: 5,
  },
  textButton: {
    color: '#fff',
  },
});

export default SignUpScreen;
