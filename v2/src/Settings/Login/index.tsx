import React from 'react';
import { View, Text } from 'react-native';
import { useColorScheme } from 'react-native-appearance';
import { getCurrentTheme } from '../../Theme';

const LoginScreen = () => {
  const scheme = useColorScheme();
  const { colors } = getCurrentTheme(scheme);
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colors.background,
      }}>
      <Text style={{ color: colors.text }}>LoginScreen</Text>
    </View>
  );
};

export default LoginScreen;
