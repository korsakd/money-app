import React, { useRef, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  TextInput,
  StyleSheet,
  Keyboard,
  Pressable,
} from 'react-native';
import { useDispatch } from 'react-redux';
import { signUpWithEmailAndPassword } from '../../store/Thunks/loginThunks';
import { validation } from '../../utils/validation';
import NextButtonWithLoader from './NextButtonWithLoader';
import UserInput from './UserInput';
import { StackActions, useNavigation } from '@react-navigation/core';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import ErrorInfo from '../ErrorInfo';

type FirstStepType = {
  width: number;
  flatListRef: React.MutableRefObject<FlatList<any> | null>;
  nextStep: (value: number) => void;
};

const FirstStep = ({ width, flatListRef, nextStep }: FirstStepType) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repPassword, setRepPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const passwordInputRef = useRef<TextInput>(null);
  const repPasswordInputRef = useRef<TextInput>(null);

  const signUp = async () => {
    try {
      setIsLoading(true);
      await dispatch(signUpWithEmailAndPassword(email, password));
      nextStep(2);
      if (flatListRef.current) {
        flatListRef.current.scrollToIndex({
          index: 1,
          animated: true,
        });
      }
      setIsLoading(false);
    } catch (error: any) {
      setIsLoading(false);
      setError(error.name);
    }
  };

  const onEmailNextPress = () => {
    if (passwordInputRef.current) {
      passwordInputRef.current.focus();
    }
  };
  const onPasswordNextPress = () => {
    if (repPasswordInputRef.current) {
      repPasswordInputRef.current.focus();
    }
  };
  const onRepPasswordNextPress = () => {
    Keyboard.dismiss();
  };

  const onNextPress = () => {
    if (validation(email, password, setError, repPassword)) {
      signUp();
    }
  };

  const onClosePress = () => {
    navigation.dispatch(StackActions.pop());
  };

  return (
    <KeyboardAwareScrollView
      bounces={false}
      showsVerticalScrollIndicator={false}
      keyboardShouldPersistTaps={'handled'}
      contentContainerStyle={[styles.mainContainer, { width }]}>
      <ErrorInfo error={error} />
      <UserInput
        title={'Email'}
        value={email}
        setValue={setEmail}
        containerStyle={styles.inputContainer}
        keyboardType={'email-address'}
        autoCapitalize={'none'}
        returnKeyType={'next'}
        onSubmitEditing={onEmailNextPress}
      />
      <UserInput
        ref={passwordInputRef}
        title={'Enter password'}
        value={password}
        setValue={setPassword}
        containerStyle={styles.inputContainer}
        secureTextEntry={true}
        autoCapitalize={'none'}
        returnKeyType={'next'}
        onSubmitEditing={onPasswordNextPress}
      />
      <UserInput
        ref={repPasswordInputRef}
        title={'Repeat password'}
        value={repPassword}
        setValue={setRepPassword}
        containerStyle={styles.inputContainer}
        secureTextEntry={true}
        autoCapitalize={'none'}
        returnKeyType={'done'}
        onSubmitEditing={onRepPasswordNextPress}
      />
      <NextButtonWithLoader
        title={'Next'}
        onPress={onNextPress}
        isLoading={isLoading}
      />
      <View style={styles.backButtonWrap}>
        <Pressable
          onPress={onClosePress}
          hitSlop={{ top: 10, right: 10, bottom: 10, left: 10 }}
          style={styles.backButton}>
          <Text style={styles.backButtonText}>{'Sign in'}</Text>
        </Pressable>
      </View>
    </KeyboardAwareScrollView>
  );
};

export default React.memo(FirstStep);

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    paddingHorizontal: 20,
    alignItems: 'center',
    marginTop: 30,
    width: '100%',
  },
  inputContainer: { marginBottom: 15 },
  closeButton: { position: 'absolute', top: -40, right: 10, zIndex: 1000 },
  backButtonWrap: { width: '100%' },
  backButton: { alignItems: 'flex-end', marginTop: 15 },
  backButtonText: { color: 'tomato', textDecorationLine: 'underline' },
});
