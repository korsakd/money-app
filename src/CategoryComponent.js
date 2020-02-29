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

const CategoryIcon = ({iconName, name}) => (
  <View
    style={{
      margin: 10,
      alignItems: 'center',
    }}>
    <View style={styles.iconStyle}>
      <Icon name={iconName} size={50} />
    </View>
    <Text style={{textAlign: 'center'}}>{name}</Text>
  </View>
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

export default CategoryIcon;
