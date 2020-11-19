import React from 'react';
import { View } from 'react-native';
import Icon from 'react-native-vector-icons/dist/MaterialCommunityIcons';
import styles from './styles';

const IconItem = ({ item }) => {
  const { iconName } = item;
  return (
    <View style={styles.iconStyle}>
      <Icon name={iconName} size={25} color="#1c2b59" />
    </View>
  );
};

export default IconItem;
