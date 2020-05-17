import React, {useState, useEffect} from 'react';
import {View} from 'react-native';
import LoginScreen from '../screens/LoginScreen';
import SignUpScreen from '../screens/SignUpScreen';
import AccountScreen from '../screens/AccountScreen';
import auth from '@react-native-firebase/auth';
import {connect} from 'react-redux';
import {setUser} from '../redux/reducers/userReduсer';
import LoadingScreen from '../screens/LoadingScreen';

const LoginHome = ({user, userState}) => {
  const [connectedTofirebase, setInitializing] = useState(true);
  const [error, setError] = useState();
  const [isSignup, setIsSignup] = useState(false);
  const [isLoadingScreen, setIsLoadingScreen] = useState(false);

  const handleLogIn = (email, password) => {
    if (email === '') {
      setError('Введите логин');
    } else if (password === '') {
      setError('Введите пароль');
    } else {
      setIsLoadingScreen(true);
      auth()
        .signInWithEmailAndPassword(email, password)
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
          setIsLoadingScreen(false);
          userState(currentUser.toJSON());
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
            user={user}
            isLoadingScreen={isLoadingScreen}
            setIsLoadingScreen={element => setIsLoadingScreen(element)}
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
      />
    );
  }
};

const mapStateToProps = state => {
  return {
    user: state.userReduсer.user,
  };
};
const mapDispatchToProps = dispatch => ({
  userState: user => dispatch(setUser(user)),
});
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(LoginHome);
