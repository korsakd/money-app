import React from 'react';
import {View, Text, Image, TouchableOpacity, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/dist/MaterialCommunityIcons';
import auth from '@react-native-firebase/auth';
import {connect} from 'react-redux';
import {clearBalance} from '../redux/reducers/balanceReducer';
import {clearCategory} from '../redux/reducers/categoriesReducer';
import translate from '../translate/Translate';

const AccountScreen = ({
  user,
  setIsLoadingScreen,
  fromSettings,
  clearBalance,
  clearCategory,
}) => {
  if (!fromSettings) {
    return (
      <View style={styles.container}>
        <Image
          style={{
            width: 70,
            height: 70,
            backgroundColor: '#e8e8e8',
            borderRadius: 20,
          }}
          source={require('../img/user-picture.png')}
        />
        <Text>{`${translate('hello')} ${user.displayName || ''}`}</Text>
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            setIsLoadingScreen(false);
            auth()
              .signOut()
              .then(() => {
                clearBalance();
                clearCategory();
              });
          }}>
          <Text style={{color: '#fff', marginRight: 5, fontSize: 20}}>
            {translate('signOut')}
          </Text>
          <Icon name="logout" size={24} color="#fff" />
        </TouchableOpacity>
      </View>
    );
  }
  if (fromSettings) {
    return (
      <View
        style={{
          paddingVertical: 15,
        }}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-around',
          }}>
          <View style={{marginRight: 20, alignSelf: 'center'}}>
            <Image
              style={{
                width: 100,
                height: 100,
                backgroundColor: '#e8e8e8',
                borderRadius: 20,
              }}
              source={require('../img/user-picture.png')}
            />
          </View>
          <View style={{justifyContent: 'space-around'}}>
            <Text>{`${translate('name')}`}</Text>
            <Text>E-mail:</Text>
          </View>
          <View style={{justifyContent: 'space-around'}}>
            <Text>{user.displayName}</Text>
            <Text>{user.email}</Text>
          </View>
        </View>
        <View style={{width: '25%', alignSelf: 'center'}}>
          <TouchableOpacity
            style={styles.settingsButton}
            onPress={() => {
              setIsLoadingScreen(false);
              auth()
                .signOut()
                .then(() => {
                  clearBalance();
                  clearCategory();
                });
            }}>
            <Text style={{color: '#fff', marginRight: 5, fontSize: 20}}>
              {translate('signOut')}
            </Text>
            <Icon name="logout" size={24} color="#fff" />
          </TouchableOpacity>
        </View>
      </View>
    );
  }
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 15,
  },
  button: {
    backgroundColor: '#470736',
    flexDirection: 'row',
    marginTop: 10,
    paddingVertical: 10,
    paddingHorizontal: 10,
    alignItems: 'center',
    borderRadius: 5,
  },
  settingsButton: {
    backgroundColor: '#be935a',
    flexDirection: 'row',
    marginTop: 8,
    paddingVertical: 5,
    paddingHorizontal: 5,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
  },
});

const mapDispatchToProps = dispatch => {
  return {
    clearBalance: () => {
      dispatch(clearBalance());
    },
    clearCategory: () => {
      dispatch(clearCategory());
    },
  };
};

export default connect(
  null,
  mapDispatchToProps,
)(AccountScreen);
