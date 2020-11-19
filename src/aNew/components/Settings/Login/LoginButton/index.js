import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/dist/MaterialCommunityIcons';
import styles from './styles';

const LoginButton = ({ button }) => {
  const { label, iconName, color, onPress } = button;
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={onPress} style={styles.buttonContainer}>
        <Text style={styles.text}>{label}</Text>
        <Icon name={iconName} size={25} color={color} />
      </TouchableOpacity>
    </View>
  );
};

export default LoginButton;
