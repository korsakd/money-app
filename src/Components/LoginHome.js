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
import {addBalance} from '../redux/reducers/balanceReducer';
import {importCategoryFromDb} from '../redux/reducers/categoriesReducer';

const LoginHome = ({
  user,
  userState,
  fromSettings,
  balance,
  incomeCategory,
  costsCategory,
  addBalanceFromDb,
  addCategoryFromDb,
}) => {
  const [connectedTofirebase, setInitializing] = useState(true);
  const [error, setError] = useState();
  const [isSignup, setIsSignup] = useState(false);
  const [isLoadingScreen, setIsLoadingScreen] = useState(false);

  function writeUserData(user) {
    incomeCategory.map(element => {
      return database()
        .ref(`users/${user.uid}/income/${element.id}`)
        .set(element);
    });
    costsCategory.map(element => {
      return database()
        .ref(`users/${user.uid}/costs/${element.id}`)
        .set(element);
    });
    balance.map(element => {
      return database()
        .ref(`users/${user.uid}/balance/${element.id}`)
        .set(element);
    });
    // return database()
    //   .ref('users/' + user.uid)
    //   .set({
    //     income: incomeCategory,
    //     costs: costsCategory,
    //     balance: balance.map(i => {
    //       return {...i, date: `${i.date}`};
    //     }),
    //   });
  }

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
    } else {
      setIsLoadingScreen(true);
      auth()
        .signInWithEmailAndPassword(email, password)
        .then(() => {
          const currentUser = auth().currentUser;
          return getUserData(currentUser.uid);
        })
        .then(dataSnapshot => {
          const balanceDb = dataSnapshot.toJSON().balance;
          const incomeDb = dataSnapshot.toJSON().income;
          const costsDb = dataSnapshot.toJSON().costs;
          if (balanceDb) {
            for (const value of Object.values(balanceDb)) {
              addBalanceFromDb(value);
              continue;
            }
          }
          addCategoryFromDb(Object.values(incomeDb), 'Income');
          addCategoryFromDb(Object.values(costsDb), 'Costs');
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
    } else {
      setIsLoadingScreen(true);
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
          return writeUserData(currentUser.toJSON());
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
    if (connectedTofirebase) setInitializing(false);
  }
  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (connectedTofirebase) return null;

  if (!user) {
    if (!isSignup) {
      return (
        <View>
          <LoginScreen
            handleLogIn={(email, password) => handleLogIn(email, password)}
            error={error}
            setIsSignup={element => setIsSignup(element)}
            user={user}
            isLoadingScreen={isLoadingScreen}
            setIsLoadingScreen={element => setIsLoadingScreen(element)}
            fromSettings={fromSettings}
          />
        </View>
      );
    }
    if (isSignup) {
      return (
        <View>
          <SignUpScreen
            handleSignUp={(email, password, userName) =>
              handleSignUp(email, password, userName)
            }
            error={error}
            isLoadingScreen={isLoadingScreen}
            setIsSignup={element => setIsSignup(element)}
            fromSettings={fromSettings}
          />
        </View>
      );
    }
  }
  if (user && user.displayName === null) {
    return <LoadingScreen />;
  }
  if (user && user.displayName) {
    return (
      <AccountScreen
        user={user}
        setIsLoadingScreen={element => setIsLoadingScreen(element)}
        fromSettings={fromSettings}
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
  addBalanceFromDb: balance => dispatch(addBalance(balance)),
  addCategoryFromDb: (category, type) =>
    dispatch(importCategoryFromDb(category, type)),
});
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(LoginHome);
