import React, {useState} from 'react';
import {StyleSheet, View, TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/dist/MaterialCommunityIcons';

const AddCategory = ({from}) => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate('NewCategory', {from});
      }}
      style={{
        alignItems: 'center',
        width: 70,
        marginLeft: 5,
        marginRight: 5,
      }}>
      <View style={styles.iconStyle}>
        <Icon name="plus" size={24} />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  iconStyle: {
    borderColor: 'black',
    borderWidth: 2,
    borderRadius: 50,
    width: 50,
    height: 50,
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default AddCategory;
