import 'react-native-gesture-handler';
import React, { useEffect } from 'react';
import { SafeAreaView, StatusBar } from 'react-native';
import { Provider } from 'react-redux';
import { AppearanceProvider, useColorScheme } from 'react-native-appearance';
import TabNavigator from './src/Navigation';
import configureStore from './src/store';
import { getCurrentTheme } from './src/Theme';
import AsyncStorage from '@react-native-community/async-storage';
import { v4 as uuid4 } from 'uuid';
import { initDB } from './src/services/DB/setToDB';

export const { store } = configureStore();

const App = () => {
  const scheme = useColorScheme();
  const { colors } = getCurrentTheme(scheme);
  const getUserId = async () => {
    let userId = await AsyncStorage.getItem('userID');
    if (userId === null) {
      userId = await uuid4();
      await AsyncStorage.setItem('userID', userId);
    }
  };

  useEffect(() => {
    getUserId();
  }, []);
  return (
    <AppearanceProvider>
      <Provider store={store}>
        <StatusBar
          barStyle={scheme === 'light' ? 'dark-content' : 'light-content'}
        />
        <SafeAreaView style={{ flex: 1, backgroundColor: colors.card }}>
          <TabNavigator />
        </SafeAreaView>
      </Provider>
    </AppearanceProvider>
  );
};

export default App;
