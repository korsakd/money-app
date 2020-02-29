import React, {useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  ActivityIndicator,
  Button,
  TouchableOpacity,
} from 'react-native';

import {Colors} from 'react-native/Libraries/NewAppScreen';
import Icon from 'react-native-vector-icons/dist/MaterialCommunityIcons';

const AddCategory = ({categoryArr, addCategory}) => (
  <TouchableOpacity
    onPress={() => {
      addCategory([...categoryArr, {iconName: 'plus-circle', name: 'Тест'}]);
    }}
    style={{
      margin: 10,
      alignItems: 'center',
    }}>
    <View style={styles.iconStyle}>
      <Icon name="square-edit-outline" size={50} />
    </View>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  iconStyle: {
    borderColor: 'black',
    borderWidth: 4,
    borderRadius: 50,
    width: 80,
    height: 80,
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default AddCategory;
