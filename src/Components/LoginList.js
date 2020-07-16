import React, {useState, useEffect} from 'react';
import {View, Text, TouchableOpacity, NativeModules} from 'react-native';
import FocusAwareStatusBar from '../utils/StatusBarColor';
import {HeaderBackButton} from '@react-navigation/stack';
import auth from '@react-native-firebase/auth';
import {connect} from 'react-redux';
import {setUser} from '../redux/reducers/userReducer';
import {importBalanceFromDb} from '../redux/reducers/balanceReducer';
import {importCategoryFromDb} from '../redux/reducers/categoriesReducer';
import database from '@react-native-firebase/database';
import {LoginManager, AccessToken} from 'react-native-fbsdk';
import {writeUserData, importUserDataFromDB} from '../utils/LoginFunctions';
import SocialLoginButton from './SocialLoginButton';
import {GoogleSignin} from '@react-native-community/google-signin';
import LoadingScreen from '../screens/LoadingScreen';

const LoginList = ({
  navigation,
  userState,
  addBalanceFromDb,
  addCategoryFromDb,
  balance,
  incomeCategory,
  costsCategory,
  route,
}) => {
  const [deviceId, setDeviceId] = useState();
  const [isLoadingScreen, setIsLoadingScreen] = useState(false);
  var PushNotification = require('react-native-push-notification');

  useEffect(() => {
    PushNotification.configure({
      onRegister: function(token) {
        setDeviceId(token);
      },
    });
  }, [PushNotification]);

  function onAuthStateChanged(user) {
    if (user) {
      userState(user.toJSON());
      if (!route.params.fromSettings) {
        navigation.navigate('LoginHome');
        setIsLoadingScreen(false);
      } else {
        navigation.navigate('Main');
        setIsLoadingScreen(false);
      }
    }
  }
  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!route.params.fromSettings) {
    navigation.setOptions({
      headerLeft: props => (
        <HeaderBackButton
          {...props}
          onPress={() => {
            navigation.navigate('Main');
          }}
        />
      ),
    });
  }

  const facebookSignIn = async () => {
    LoginManager.logInWithPermissions(['public_profile', 'email'])
      .then(result => {
        if (!result.isCancelled) {
          setIsLoadingScreen(true);
          return AccessToken.getCurrentAccessToken();
        }
      })
      .then(data => {
        if (data) {
          const credential = auth.FacebookAuthProvider.credential(
            data.accessToken,
          );
          return auth().signInWithCredential(credential);
        } else {
          return null;
        }
      })
      .then(currentUser => {
        if (currentUser) {
          return database()
            .ref(`users/${currentUser.user.uid}`)
            .once('value');
        }
      })
      .then(async dataSnapshot => {
        if (dataSnapshot.toJSON()) {
          importUserDataFromDB(
            dataSnapshot,
            addBalanceFromDb,
            addCategoryFromDb,
          );
        } else {
          const currentUser = await auth().currentUser;
          writeUserData(
            currentUser,
            incomeCategory,
            costsCategory,
            balance,
            database,
            deviceId,
          );
        }
      });
  };

  const {RNTwitterSignIn} = NativeModules;
  const Constants = {
    TWITTER_COMSUMER_KEY: 'UUT9jxeR53i04u4fsH0m5vCEs',
    TWITTER_CONSUMER_SECRET:
      'A28bBUTA9ikavHEPmxiY0Yyq4GfmoytPzxrFtQExl5JwWegaXE',
  };
  const twitterSignIn = () => {
    RNTwitterSignIn.init(
      Constants.TWITTER_COMSUMER_KEY,
      Constants.TWITTER_CONSUMER_SECRET,
    );
    RNTwitterSignIn.logIn()
      .then(loginData => {
        if (loginData) {
          setIsLoadingScreen(true);
          const credential = auth.TwitterAuthProvider.credential(
            loginData.authToken,
            loginData.authTokenSecret,
          );
          return auth().signInWithCredential(credential);
        } else {
          return null;
        }
      })
      .then(currentUser => {
        if (currentUser) {
          return database()
            .ref(`users/${currentUser.user.uid}`)
            .once('value');
        }
      })
      .then(async dataSnapshot => {
        if (dataSnapshot.toJSON()) {
          importUserDataFromDB(
            dataSnapshot,
            addBalanceFromDb,
            addCategoryFromDb,
          );
        } else {
          const currentUser = await auth().currentUser;
          writeUserData(
            currentUser,
            incomeCategory,
            costsCategory,
            balance,
            database,
            deviceId,
          );
        }
      });
  };
  GoogleSignin.configure({
    webClientId:
      '837029674653-bao41219mm1v6bghpdavemchjscc4ipq.apps.googleusercontent.com',
  });
  const googleSignIn = () => {
    GoogleSignin.signIn()
      .then(data => {
        if (data) {
          setIsLoadingScreen(true);
          const credential = auth.GoogleAuthProvider.credential(data.idToken);
          return auth().signInWithCredential(credential);
        } else {
          return null;
        }
      })
      .then(currentUser => {
        if (currentUser) {
          return database()
            .ref(`users/${currentUser.user.uid}`)
            .once('value');
        }
      })
      .then(async dataSnapshot => {
        if (dataSnapshot.toJSON()) {
          importUserDataFromDB(
            dataSnapshot,
            addBalanceFromDb,
            addCategoryFromDb,
          );
        } else {
          const currentUser = await auth().currentUser;
          writeUserData(
            currentUser,
            incomeCategory,
            costsCategory,
            balance,
            database,
            deviceId,
          );
        }
      });
  };
  if (!isLoadingScreen) {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: '#fff',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        {route.params.fromSettings ? (
          <FocusAwareStatusBar backgroundColor="#fff" barStyle="dark-content" />
        ) : (
          <FocusAwareStatusBar
            backgroundColor="#470736"
            barStyle="light-content"
          />
        )}
        <TouchableOpacity
          style={{
            backgroundColor: route.params.fromSettings ? '#be935a' : '#470736',
            width: 370,
            height: 60,
            borderRadius: 7,
            alignItems: 'center',
            justifyContent: 'center',
          }}
          onPress={() => navigation.navigate('LoginHome', {deviceId})}>
          <Text
            style={{color: '#fff', fontSize: 20, textTransform: 'uppercase'}}>
            Login with E-mail and password
          </Text>
        </TouchableOpacity>
        <SocialLoginButton
          socialSignIn={() => facebookSignIn()}
          socialIconName={'facebook'}
          socialName={'Login with Facebook'}
        />
        <SocialLoginButton
          socialSignIn={() => twitterSignIn()}
          socialIconName={'twitter'}
          socialName={'Login with Twitter'}
        />
        <SocialLoginButton
          socialSignIn={() => googleSignIn()}
          socialIconName={'google'}
          socialName={'Login with Google'}
        />
      </View>
    );
  } else {
    return (
      <View style={{flex: 1, justifyContent: 'center'}}>
        <LoadingScreen fromSettings={route.params.fromSettings} />
      </View>
    );
  }
};

const mapStateToProps = state => {
  return {
    user: state.userReducer.user,
    balance: state.balanceReducer.balance,
    incomeCategory: state.categoriesReducer.income,
    costsCategory: state.categoriesReducer.costs,
  };
};
const mapDispatchToProps = dispatch => ({
  userState: user => dispatch(setUser(user)),
  addBalanceFromDb: balance => dispatch(importBalanceFromDb(balance)),
  addCategoryFromDb: (category, type) =>
    dispatch(importCategoryFromDb(category, type)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(LoginList);
