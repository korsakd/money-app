import React from 'react';
import { View, Text, Pressable } from 'react-native';
import { useColorScheme } from 'react-native-appearance';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store';
import { initDB } from '../store/Thunks/loginThunks';
import { getCurrentTheme } from '../Theme';

const HomeScreen = () => {
  const scheme = useColorScheme();
  const { colors } = getCurrentTheme(scheme);
  const dispatch = useDispatch();
  const {
    user: { userID },
  } = useSelector((state: RootState) => state);

  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colors.background,
      }}>
      <Pressable
        onPress={() => {
          if (userID) {
            dispatch(initDB(userID));
            // dispatch(categoryActions.resetCategory());
          }
        }}>
        <Text style={{ color: colors.text }}>HomeScreen</Text>
      </Pressable>
    </View>
  );
};

export default HomeScreen;
