import React, { useState } from 'react';
import { View, Text, FlatList, TextInput, StyleSheet } from 'react-native';
import { useColorScheme } from 'react-native-appearance';
import { getCurrentTheme } from '../../Theme';
import { Auth } from 'aws-amplify';
import { validation } from '../../utils/validation';
import NextButtonWithLoader from './NextButtonWithLoader';

type FirstStepType = {
  email: string;
  password: string;
  width: number;
  flatListRef: React.MutableRefObject<FlatList<any> | null>;
  setEmail: (value: string) => void;
  setPassword: (value: string) => void;
};

const FirstStep = ({
  email,
  password,
  width,
  flatListRef,
  setEmail,
  setPassword,
}: FirstStepType) => {
  const scheme = useColorScheme();
  const { colors } = getCurrentTheme(scheme);
  const [repPassword, setRepPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const signUp = async () => {
    try {
      setIsLoading(true);
      await Auth.signUp(email, password);
      if (flatListRef.current) {
        flatListRef.current.scrollToIndex({ index: 1, animated: true });
      }
      setIsLoading(false);
    } catch (error: any) {
      setIsLoading(false);
      setError(error.name);
      console.tron({ 'error signing up:': error });
    }
  };

  const onNextPress = () => {
    if (validation(email, password, setError, repPassword)) {
      signUp();
    }
  };

  return (
    <View style={[styles.mainContainer, { width }]}>
      <View style={styles.errorWrap}>
        <Text style={styles.errorText}>{error}</Text>
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          style={[
            styles.textInput,
            { borderColor: colors.border, color: colors.text },
          ]}
          value={email}
          onChangeText={setEmail}
          placeholder={'E-mail'}
          blurOnSubmit
          keyboardType={'email-address'}
          autoCapitalize={'none'}
        />
        <TextInput
          style={[
            styles.textInput,
            { borderColor: colors.border, color: colors.text },
          ]}
          value={password}
          onChangeText={setPassword}
          placeholder={'Enter password'}
          blurOnSubmit
          secureTextEntry
          autoCapitalize={'none'}
        />
        <TextInput
          style={[
            styles.textInput,
            { borderColor: colors.border, color: colors.text },
          ]}
          value={repPassword}
          onChangeText={setRepPassword}
          placeholder={'Repeat password'}
          blurOnSubmit
          secureTextEntry
          autoCapitalize={'none'}
        />
      </View>
      <NextButtonWithLoader
        title={'Next'}
        onPress={signUp}
        isLoading={isLoading}
      />
    </View>
  );
};

export default FirstStep;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    paddingHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  errorWrap: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    top: '30%',
  },
  errorText: { color: 'tomato', fontWeight: '700' },
  inputContainer: {
    width: '100%',
    marginBottom: 25,
    height: 150,
    justifyContent: 'space-between',
  },
  textInput: {
    width: '100%',
    borderBottomWidth: 1,
    fontSize: 17,
    padding: 0,
  },
  btnWrap: {
    backgroundColor: 'tomato',
    width: '100%',
    height: 40,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnText: { color: '#fff', fontWeight: '700', fontSize: 17 },
});
