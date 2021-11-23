import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  Pressable,
  FlatList,
  StyleSheet,
  LayoutAnimation,
  ActivityIndicator,
} from 'react-native';
import { useColorScheme } from 'react-native-appearance';
import { getCurrentTheme } from '../../Theme';
import auth from '@react-native-firebase/auth';
import NextButtonWithLoader from './NextButtonWithLoader';
import UserInput from './UserInput';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { regexpEmail } from '../../utils/regExp';
import ErrorInfo from '../ErrorInfo';

type FirstStepType = {
  width: number;
  flatListRef: React.MutableRefObject<FlatList<any> | null>;
  nextStep: (value: number) => void;
};

const SecondStep = ({ width, flatListRef, nextStep }: FirstStepType) => {
  const scheme = useColorScheme();
  const { colors } = getCurrentTheme(scheme);
  const [email, setEmail] = useState('');
  const [toggleChangeEmail, setToggleChangeEmail] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(user => {
      if (user && user.email) {
        setEmail(user.email);
        setIsLoading(false);
      }
    });
    return subscriber; // unsubscribe on unmount
  }, []);

  useEffect(() => {
    const unsubscribeSetInterval = setInterval(async () => {
      auth().currentUser?.reload();
    }, 5000);
    const unsubscribeOnUserChanged = auth().onUserChanged(response => {
      console.tron({ response });
      if (response?.emailVerified) {
        clearInterval(unsubscribeSetInterval);
        nextStep(3);
        if (flatListRef.current) {
          flatListRef.current.scrollToIndex({
            index: 2,
            animated: true,
          });
        }

        return unsubscribeOnUserChanged();
      }
    });
    return () => unsubscribeOnUserChanged();
  }, []);

  const onChangeEmailPress = async () => {
    if (!email || !regexpEmail.test(email)) {
      setError(!email ? 'Enter email' : 'incorrectly-email');
      return;
    }
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setToggleChangeEmail(false);
    const user = await auth().currentUser;
    if (user) {
      await user?.updateEmail(email);
      const updatedUser = await auth().currentUser;
      await updatedUser?.sendEmailVerification();
    }
  };

  if (isLoading) {
    return (
      <View style={[styles.mainContainer, { width }]}>
        <ActivityIndicator />
      </View>
    );
  }

  return (
    <KeyboardAwareScrollView
      bounces={false}
      showsVerticalScrollIndicator={false}
      keyboardShouldPersistTaps={'handled'}
      contentContainerStyle={[styles.mainContainer, { width }]}>
      {toggleChangeEmail ? (
        <>
          <ErrorInfo error={error} />
          <UserInput
            title={'Email'}
            value={email}
            setValue={setEmail}
            containerStyle={styles.inputContainer}
            keyboardType={'email-address'}
            autoCapitalize={'none'}
          />
          <NextButtonWithLoader
            title={'Change email'}
            onPress={onChangeEmailPress}
          />
          <View style={styles.backButtonWrap}>
            <Pressable
              onPress={() => {
                LayoutAnimation.configureNext(
                  LayoutAnimation.Presets.easeInEaseOut,
                );
                setToggleChangeEmail(false);
              }}
              hitSlop={{ top: 10, right: 10, bottom: 10, left: 10 }}
              style={styles.backButton}>
              <Text style={styles.backButtonText}>{'Back'}</Text>
            </Pressable>
          </View>
        </>
      ) : (
        <>
          <View style={styles.titleWrap}>
            <Text style={[styles.titleText, { color: colors.text }]}>
              {'Confirm email'}
            </Text>
            <Text style={[styles.titleText, { color: colors.text }]}>
              {email}
            </Text>
          </View>
          <View style={styles.textWrap}>
            <Text style={styles.wrongText}>{'Wrong email?'}</Text>
            <Pressable
              onPress={() => {
                LayoutAnimation.configureNext(
                  LayoutAnimation.Presets.easeInEaseOut,
                );
                setToggleChangeEmail(true);
              }}>
              <Text style={styles.changeText}>{'Change it!'}</Text>
            </Pressable>
          </View>
        </>
      )}
    </KeyboardAwareScrollView>
  );
};

export default React.memo(SecondStep);

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    paddingHorizontal: 20,
    alignItems: 'center',
    paddingTop: '20%',
  },
  titleWrap: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  titleText: {
    textAlign: 'center',
    fontSize: 17,
  },
  inputContainer: { marginBottom: 15 },
  backButtonWrap: { width: '100%' },
  backButton: { alignItems: 'flex-end', marginTop: 15 },
  backButtonText: { color: 'tomato', textDecorationLine: 'underline' },
  textWrap: { flexDirection: 'row' },
  wrongText: { color: 'tomato', marginRight: 5 },
  changeText: {
    color: 'tomato',
    textDecorationLine: 'underline',
  },
});
