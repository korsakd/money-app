import React from 'react';
import { View, Text, Pressable } from 'react-native';
import { useColorScheme } from 'react-native-appearance';
import { useNavigation } from '@react-navigation/native';
import { getCurrentTheme } from '../Theme';

const SettingsScreen = () => {
  const navigation = useNavigation();
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
      <Text style={{ color: colors.text }}>SettingsScreen</Text>
      <Pressable onPress={() => navigation.navigate('Login')}>
        <Text style={{ color: colors.text }}>ToLoginScreen</Text>
      </Pressable>
    </View>
  );
};

export default SettingsScreen;
