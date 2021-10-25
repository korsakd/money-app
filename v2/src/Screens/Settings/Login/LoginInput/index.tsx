import React, { useState, useEffect } from 'react';
import { View, TextInput } from 'react-native';
import { useColorScheme } from 'react-native-appearance';
import Animated, {
  cond,
  Easing,
  eq,
  interpolateColors,
  set,
  useCode,
} from 'react-native-reanimated';
import { timing, useClock, useValue } from 'react-native-redash';
import { getCurrentTheme } from '../../../../Theme';
import { regexpEmail } from '../../../../utils/regExp';
import styles from './styles';

type LoginInputType = {
  title: string;
  value: string;
  setValue: (text: string) => void;
};

const LoginInput = ({ title, value, setValue }: LoginInputType) => {
  const scheme = useColorScheme();
  const { colors } = getCurrentTheme(scheme);
  const shouldAnimate = useValue(2);

  const handleFocus = () => {
    if (!value) {
      shouldAnimate.setValue(1);
    }
  };
  const handleBlur = () => {
    if (value) {
      if (title === 'email' && !regexpEmail.test(value)) {
        // setError('incorrectly-email');
      }
    } else if (!value) {
      shouldAnimate.setValue(0);
    }
  };

  const animatedIsFocused = useValue(0);
  const clock = useClock();
  const bottom = animatedIsFocused.interpolate({
    inputRange: [0, 1],
    outputRange: [2, 21],
  });
  const fontSize = animatedIsFocused.interpolate({
    inputRange: [0, 1],
    outputRange: [17, 15],
  });
  const color = interpolateColors(animatedIsFocused, {
    inputRange: [0, 1],
    outputColorRange: [colors.text, '#ff6347'],
  });

  useCode(
    () => [
      cond(
        eq(shouldAnimate, 1),
        set(
          animatedIsFocused,
          timing({
            clock,
            from: 0,
            to: 1,
            duration: 400,
            easing: Easing.inOut(Easing.ease),
          }),
        ),
      ),
      cond(
        eq(shouldAnimate, 0),
        set(
          animatedIsFocused,
          timing({
            clock,
            from: 1,
            to: 0,
            duration: 400,
            easing: Easing.inOut(Easing.ease),
          }),
        ),
      ),
    ],
    [shouldAnimate],
  );

  return (
    <View style={styles.container}>
      <Animated.Text
        style={{
          position: 'absolute',
          left: 0,
          bottom: bottom,
          fontSize: fontSize,
          color: color,
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
