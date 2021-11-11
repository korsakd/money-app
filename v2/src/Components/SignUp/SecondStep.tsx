import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  Pressable,
  FlatList,
  TextInput,
  StyleSheet,
} from 'react-native';
import { useColorScheme } from 'react-native-appearance';
import { getCurrentTheme } from '../../Theme';
import { Auth } from 'aws-amplify';
import { useDispatch } from 'react-redux';
import { signInWithEmailAndPassword } from '../../store/Thunks/loginThunks';
import NextButtonWithLoader from './NextButtonWithLoader';

type FirstStepType = {
  email: string;
  password: string;
  width: number;
  flatListRef: React.MutableRefObject<FlatList<any> | null>;
};

const SecondStep = ({ email, password, width, flatListRef }: FirstStepType) => {
  const scheme = useColorScheme();
  const { colors } = getCurrentTheme(scheme);
  const [code, setCode] = useState('');
  const [isResendAvailable, setIsResendAvailable] = useState(true);
  const [timer, setTimer] = useState(60);
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!isResendAvailable) {
      const interval = setInterval(() => {
        setTimer(timer => timer - 1);
      }, 1000);
      setTimeout(() => {
        setIsResendAvailable(true);
        clearInterval(interval);
        setTimer(60);
      }, 60000);
    }
  }, [isResendAvailable]);

  const confirmSignUp = async () => {
    try {
      setIsLoading(true);
      const response = await Auth.confirmSignUp('dkorsak@elinext.com', code);
      if (response === 'SUCCESS') {
        dispatch(signInWithEmailAndPassword(email, password));
      }
      if (flatListRef.current) {
        flatListRef.current.scrollToIndex({ index: 2, animated: true });
      }
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.tron({ 'error confirming sign up': error });
    }
  };

  const resendConfirmationCode = async () => {
    if (isResendAvailable) {
      setIsResendAvailable(false);
      try {
        await Auth.resendSignUp(email);
        setIsResendAvailable(false);
        console.log('code resent successfully');
      } catch (err) {
        console.log('error resending code: ', err);
      }
    }
  };

  return (
    <View style={[styles.mainWrap, { width }]}>
      <View style={styles.titleWrap}>
        <Text
          style={
            styles.titleText
          }>{`We sent a confirmation code to your email ${email}`}</Text>
      </View>
      <TextInput
        style={[
          styles.textInput,
          { borderColor: colors.border, color: colors.text },
        ]}
        value={code}
        onChangeText={setCode}
        placeholder={'Enter code'}
        blurOnSubmit
        keyboardType={'email-address'}
      />
      <Pressable style={styles.resendBtn} onPress={resendConfirmationCode}>
        <Text
          style={{
            color: isResendAvailable ? 'tomato' : 'grey',
            textDecorationLine: 'underline',
          }}>
          {'Resend confirmation code'}
        </Text>
        {!isResendAvailable && (
          <View style={styles.timer}>
            <Text style={styles.timerText}>{timer}</Text>
          </View>
        )}
      </Pressable>
      <NextButtonWithLoader
        title={'Next'}
        onPress={confirmSignUp}
        isLoading={isLoading}
      />
    </View>
  );
};

export default SecondStep;

const styles = StyleSheet.create({
  mainWrap: {
    flex: 1,
    paddingHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  titleWrap: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  titleText: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 17,
  },
  textInput: {
    width: '100%',
    borderBottomWidth: 1,
    fontSize: 17,
    padding: 0,
    marginBottom: 25,
  },
  resendBtn: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
    flexDirection: 'row',
  },
  timer: { position: 'absolute', right: '18%' },
  timerText: { color: 'grey' },
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
