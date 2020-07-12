import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {GoogleSignin} from '@react-native-community/google-signin';
import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';
import {connect} from 'react-redux';
import {importBalanceFromDb} from '../redux/reducers/balanceReducer';
import {importCategoryFromDb} from '../redux/reducers/categoriesReducer';
import {writeUserData, importUserDataFromDB} from '../utils/LoginFunctions';

GoogleSignin.configure({
  webClientId:
    '837029674653-bao41219mm1v6bghpdavemchjscc4ipq.apps.googleusercontent.com',
});

const GoogleLoginButton = ({
  setIsLoadingScreen,
  addBalanceFromDb,
  addCategoryFromDb,
  balance,
  incomeCategory,
  costsCategory,
  deviceId,
  setError,
}) => {
  const googleLogin = () => {
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
      })
      .catch(error => {
        setIsLoadingScreen(false);
        setError(error);
      });
  };
  return (
    <View style={{marginTop: 10}}>
      <TouchableOpacity
        style={{
          backgroundColor: '#DB4437',
          width: 250,
          height: 45,
          borderRadius: 7,
          alignItems: 'center',
          justifyContent: 'center',
        }}
        onPress={() => googleLogin()}>
        <Text style={{color: '#fff', fontSize: 20}}>Login with Google</Text>
      </TouchableOpacity>
    </View>
  );
};

const mapStateToProps = state => {
  return {
    balance: state.balanceReducer.balance,
    incomeCategory: state.categoriesReducer.income,
    costsCategory: state.categoriesReducer.costs,
  };
};
const mapDispatchToProps = dispatch => ({
  addBalanceFromDb: balance => dispatch(importBalanceFromDb(balance)),
  addCategoryFromDb: (category, type) =>
    dispatch(importCategoryFromDb(category, type)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(GoogleLoginButton);
