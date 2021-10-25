import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { WHITE } from '../../Constants';
import styles from './styles';

type ButtonType = {
  // label: string;
  iconName: string;
  color: string;
  onPress: () => void;
};

type LoginButtonType = {
  button: ButtonType;
};

const LoginButton = ({ button }: LoginButtonType) => {
  const { iconName, color, onPress } = button;
  return (
    <View style={[styles.container, { backgroundColor: color }]}>
      <TouchableOpacity onPress={onPress} style={styles.buttonContainer}>
        <Icon name={iconName} size={25} color={WHITE} />
      </TouchableOpacity>
    </View>
  );
};

export default LoginButton;
