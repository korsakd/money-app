import React from 'react';
import { View, Text, Pressable } from 'react-native';
import { useColorScheme } from 'react-native-appearance';
import { getCurrentTheme } from '../Theme';
import { signOut } from '../store/Thunks/loginThunks';
import { useDispatch } from 'react-redux';

const SettingsScreen = () => {
  const scheme = useColorScheme();
  const { colors } = getCurrentTheme(scheme);
  const dispatch = useDispatch();

  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colors.background,
        paddingHorizontal: 20,
      }}>
      <Text style={{ color: colors.text }}>SettingsScreen</Text>
      <Pressable
        onPress={() => {
          dispatch(signOut());
        }}
        style={{
          backgroundColor: 'tomato',
          width: '100%',
          height: 40,
          borderRadius: 10,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <Text style={{ color: '#fff', fontWeight: '700', fontSize: 17 }}>
          {'Sign Out'}
        </Text>
      </Pressable>
    </View>
  );
};

export default SettingsScreen;
