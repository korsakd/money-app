import React, { useState, useEffect } from 'react';
import { View, TextInput } from 'react-native';
import { useColorScheme } from 'react-native-appearance';
import Animated, { Easing, set, useCode } from 'react-native-reanimated';
import { timing, useClock, useValue } from 'react-native-redash';
import { getCurrentTheme } from '../../../Theme';
import styles from './styles';

type LoginInputType = {
  title: string;
  value: string;
  setValue: (text: string) => void;
};

const LoginInput = ({ title, value, setValue }: LoginInputType) => {
  const scheme = useColorScheme();
  const { colors } = getCurrentTheme(scheme);
  const [isFocused, setIsFocused] = useState(false);

  const handleFocus = () => {
    setIsFocused(true);
  };
  const handleBlur = () => {
    setIsFocused(false);
  };

  const animatedIsFocused = useValue(0);
  const clock = useClock();
  const bottom = animatedIsFocused.interpolate({
    inputRange: [0, 1],
    outputRange: [2, 34],
  });
  const fontSize = animatedIsFocused.interpolate({
    inputRange: [0, 1],
    outputRange: [25, 15],
  });

  useCode(
    () => [
      set(
        animatedIsFocused,
        timing({
          clock,
          from: isFocused && value === '' ? 0 : 1,
          to: isFocused || value !== '' ? 1 : 0,
          duration: 500,
          easing: Easing.inOut(Easing.ease),
        }),
      ),
    ],
    [isFocused],
  );

  return (
    <View style={styles.container}>
      <Animated.Text
        style={{
          position: 'absolute',
          left: 0,
          bottom: bottom,
          fontSize: fontSize,
          color: colors.text,
        }}>
        {title}
      </Animated.Text>
      <TextInput
        style={[
          styles.textInput,
          { borderColor: colors.border, color: colors.text },
        ]}
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
