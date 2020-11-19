import React, { useState, useEffect } from 'react';
import { View, TextInput, Animated } from 'react-native';
import styles from './styles';

const LoginInput = ({ title, value, setValue }) => {
  const [isFocused, setIsFocused] = useState(false);
  const animatedIsFocused = new Animated.Value(0);

  useEffect(() => {
    //TODO: animation when not in focused and value === ''
    animatedIsFocused.setValue(value === '' ? 0 : 1);
    Animated.timing(animatedIsFocused, {
      toValue: isFocused || value !== '' ? 1 : 0,
      duration: 300,
    }).start();
  }, [isFocused]);

  const handleFocus = () => {
    setIsFocused(true);
  };
  const handleBlur = () => {
    setIsFocused(false);
  };

  const labelStyle = {
    position: 'absolute',
    left: 0,
    bottom: animatedIsFocused.interpolate({
      inputRange: [0, 1],
      outputRange: [2, 25],
    }),
    fontSize: animatedIsFocused.interpolate({
      inputRange: [0, 1],
      outputRange: [20, 14],
    }),
    color: animatedIsFocused.interpolate({
      inputRange: [0, 1],
      outputRange: ['#aaa', '#1c2b59'],
    }),
  };

  return (
    <View style={styles.container}>
      <Animated.Text style={labelStyle}>{title}</Animated.Text>
      <TextInput
        style={styles.textInput}
        value={value}
        onChangeText={setValue}
        onFocus={handleFocus}
        onBlur={handleBlur}
        blurOnSubmit
      />
    </View>
  );
};

export default LoginInput;
