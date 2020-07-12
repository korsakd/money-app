import React from 'react';
import {View, Text, TouchableOpacity, NativeModules} from 'react-native';
import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';
import {connect} from 'react-redux';
import {importBalanceFromDb} from '../redux/reducers/balanceReducer';
import {importCategoryFromDb} from '../redux/reducers/categoriesReducer';
import {writeUserData, importUserDataFromDB} from '../utils/LoginFunctions';

const {RNTwitterSignIn} = NativeModules;
const Constants = {
  TWITTER_COMSUMER_KEY: 'UUT9jxeR53i04u4fsH0m5vCEs',
  TWITTER_CONSUMER_SECRET: 'A28bBUTA9ikavHEPmxiY0Yyq4GfmoytPzxrFtQExl5JwWegaXE',
};

const TwitterLoginButton = ({
  setIsLoadingScreen,
  addBalanceFromDb,
  addCategoryFromDb,
  balance,
  incomeCategory,
  costsCategory,
  deviceId,
  setError,
}) => {
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
          backgroundColor: '#1DA1F2',
          width: 250,
          height: 45,
          borderRadius: 7,
          alignItems: 'center',
          justifyContent: 'center',
        }}
        onPress={() => twitterSignIn()}>
        <Text style={{color: '#fff', fontSize: 20}}>Login with Twitter</Text>
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
)(TwitterLoginButton);
