import React from 'react';
import {View, Text, Image, TouchableOpacity, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/dist/MaterialCommunityIcons';
import auth from '@react-native-firebase/auth';

const AccountScreen = ({user, setIsLoadingScreen}) => {
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
      <Text>{`Привет ${user.displayName || ''}`}</Text>
      <TouchableOpacity
        style={{
          backgroundColor: '#470736',
          flexDirection: 'row',
          marginTop: 8,
          paddingVertical: 5,
          paddingHorizontal: 5,
          alignItems: 'center',
          borderRadius: 5,
        }}
        onPress={() => {
          setIsLoadingScreen(false);
          auth().signOut();
        }}>
        <Text style={{color: '#fff', marginRight: 5}}>Выйти</Text>
        <Icon name="logout" size={24} color="#fff" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default AccountScreen;
