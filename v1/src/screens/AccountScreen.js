import React from 'react';
import {View, Text, Image, TouchableOpacity, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/dist/MaterialCommunityIcons';
import auth from '@react-native-firebase/auth';
import {connect} from 'react-redux';
import {clearBalance} from '../redux/reducers/balanceReducer';
import {clearCategory} from '../redux/reducers/categoriesReducer';
import translate from '../translate/Translate';
import FocusAwareStatusBar from '../utils/StatusBarColor';

const AccountScreen = ({
  navigation,
  user,
  fromSettings,
  clearBalance,
  clearCategory,
}) => {
  if (!fromSettings) {
    return (
      <View style={styles.container}>
        <FocusAwareStatusBar
          backgroundColor="#1c2b59"
          barStyle="light-content"
        />
        <Image
          style={{
            width: 70,
            height: 70,
            backgroundColor: '#e8e8e8',
            borderRadius: 20,
          }}
          source={{uri: user.photoURL}}
        />
        <Text>{`${translate('hello')} ${user.displayName || ''}`}</Text>
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            navigation.navigate('LoginList');
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
              source={{uri: user.photoURL}}
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
        <View style={{width: '28%', alignSelf: 'center'}}>
          <TouchableOpacity
            style={styles.settingsButton}
            onPress={() => {
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
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 15,
  },
  button: {
    backgroundColor: '#1c2b59',
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
    marginTop: 10,
    paddingVertical: 10,
    paddingHorizontal: 10,
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
