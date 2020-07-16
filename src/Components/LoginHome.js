import React, {useState, useEffect} from 'react';
import {View} from 'react-native';
import LoginScreen from '../screens/LoginScreen';
import SignUpScreen from '../screens/SignUpScreen';
import AccountScreen from '../screens/AccountScreen';
import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';
import {connect} from 'react-redux';
import {setUser} from '../redux/reducers/userReducer';
import LoadingScreen from '../screens/LoadingScreen';
import {importBalanceFromDb} from '../redux/reducers/balanceReducer';
import {importCategoryFromDb} from '../redux/reducers/categoriesReducer';
import {regexpEmail} from '../utils/RegExpFunction';
import {writeUserData, importUserDataFromDB} from '../utils/LoginFunctions';
import FocusAwareStatusBar from '../utils/StatusBarColor';
import {HeaderBackButton} from '@react-navigation/stack';

const LoginHome = ({
  navigation,
  user,
  userState,
  balance,
  incomeCategory,
  costsCategory,
  addBalanceFromDb,
  addCategoryFromDb,
  route,
}) => {
  console.tron(route);
  const [connectedTofirebase, setInitializing] = useState(true);
  const [error, setError] = useState();
  const [isSignup, setIsSignup] = useState(false);
  const [isLoadingScreen, setIsLoadingScreen] = useState(false);
  function getUserData(uid) {
    return database()
      .ref('users/' + uid)
      .once('value');
  }

  const handleLogIn = (email, password) => {
    if (email === '') {
      setError('Введите логин');
    } else if (password === '') {
      setError('Введите пароль');
    } else if (!regexpEmail.test(email)) {
      setError('Некорректно введен E-mail');
    } else {
      setIsLoadingScreen(true);
      setError('');
      auth()
        .signInWithEmailAndPassword(email, password)
        .then(() => {
          const currentUser = auth().currentUser;
          return getUserData(currentUser.uid);
        })
        .then(dataSnapshot => {
          importUserDataFromDB(
            dataSnapshot,
            addBalanceFromDb,
            addCategoryFromDb,
          );
        })
        .catch(function(errorCode) {
          setIsLoadingScreen(false);
          setError(errorCode.code);
        });
    }
  };

  const handleSignUp = (email, password, userName) => {
    if (email === '') {
      setError('Введите E-mail');
    } else if (password === '') {
      setError('Введите пароль');
    } else if (userName === '') {
      setError('Введите имя пользователя');
    } else if (!regexpEmail.test(email)) {
      setError('Некорректно введен E-mail');
    } else if (password.length < 6) {
      setError('Пароль должен быть более 6 символов');
    } else {
      setIsLoadingScreen(true);
      setError('');
      auth()
        .createUserWithEmailAndPassword(email, password)
        .then(() => {
          const currentUser = auth().currentUser;
          return currentUser.updateProfile({
            displayName: userName,
          });
        })
        .then(() => {
          const currentUser = auth().currentUser;
          return writeUserData(
            currentUser.toJSON(),
            incomeCategory,
            costsCategory,
            balance,
            database,
            route.params.deviceId,
          );
        })
        .then(() => {
          const currentUser = auth().currentUser;
          userState(currentUser.toJSON());
          setIsLoadingScreen(false);
        })
        .catch(function(errorCode) {
          setIsLoadingScreen(false);
          setError(errorCode.code);
        });
    }
  };

  function onAuthStateChanged(user) {
    userState(user ? user.toJSON() : null);
    if (connectedTofirebase) {
      setInitializing(false);
    }
  }
  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (connectedTofirebase) {
    return null;
  }

  if (!user) {
    if (!isLoadingScreen) {
      navigation.setOptions({
        headerLeft: props => (
          <HeaderBackButton
            {...props}
            onPress={() => {
              navigation.navigate('LoginList');
            }}
          />
        ),
      });
      if (!isSignup) {
        return (
          <View style={{flex: 1, justifyContent: 'center'}}>
            {!route.params.fromSettings ? (
              <FocusAwareStatusBar
                backgroundColor="#470736"
                barStyle="light-content"
              />
            ) : (
              <FocusAwareStatusBar
                backgroundColor="#be935a"
                barStyle="light-content"
              />
            )}
            <LoginScreen
              setError={element => setError(element)}
              handleLogIn={(email, password) => handleLogIn(email, password)}
              error={error}
              setIsSignup={element => setIsSignup(element)}
              user={user}
              isLoadingScreen={isLoadingScreen}
              setIsLoadingScreen={element => setIsLoadingScreen(element)}
              fromSettings={route.params.fromSettings}
            />
          </View>
        );
      }
      if (isSignup) {
        return (
          <View style={{flex: 1, justifyContent: 'center'}}>
            {!route.params.fromSettings ? (
              <FocusAwareStatusBar
                backgroundColor="#470736"
                barStyle="light-content"
              />
            ) : (
              <FocusAwareStatusBar
                backgroundColor="#be935a"
                barStyle="light-content"
              />
            )}
            <SignUpScreen
              setError={element => setError(element)}
              handleSignUp={(email, password, userName) =>
                handleSignUp(email, password, userName)
              }
              error={error}
              isLoadingScreen={isLoadingScreen}
              setIsSignup={element => setIsSignup(element)}
              fromSettings={route.params.fromSettings}
            />
          </View>
        );
      }
    }
  }
  if (isLoadingScreen) {
    return (
      <View style={{flex: 1, justifyContent: 'center'}}>
        <LoadingScreen />
      </View>
    );
  }
  if (user && user.displayName) {
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
    return (
      <AccountScreen
        navigation={navigation}
        user={user}
        setIsLoadingScreen={element => setIsLoadingScreen(element)}
        fromSettings={route.params.fromSettings}
      />
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
)(LoginHome);
