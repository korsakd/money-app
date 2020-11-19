import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {LoginManager, AccessToken} from 'react-native-fbsdk';
import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';
import {connect} from 'react-redux';
import {importBalanceFromDb} from '../redux/reducers/balanceReducer';
import {importCategoryFromDb} from '../redux/reducers/categoriesReducer';
import {writeUserData, importUserDataFromDB} from '../utils/LoginFunctions';
import Icon from 'react-native-vector-icons/dist/MaterialCommunityIcons';

const FacebookLogin = ({
  addBalanceFromDb,
  addCategoryFromDb,
  balance,
  incomeCategory,
  costsCategory,
  deviceId,
}) => {
  const login = async () => {
    LoginManager.logInWithPermissions(['public_profile', 'email'])
      .then(result => {
        if (!result.isCancelled) {
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
  return (
    <View style={{marginTop: 10}}>
      <TouchableOpacity
        style={{
          backgroundColor: '#4267B2',
          width: 370,
          height: 60,
          borderRadius: 7,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
        }}
        onPress={() => login()}>
        <Icon name="facebook" size={30} color="#fff" />
        <Text
          style={{
            marginLeft: 10,
            color: '#fff',
            fontSize: 20,
            textTransform: 'uppercase',
          }}>
          Login with Facebook
        </Text>
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
)(FacebookLogin);
