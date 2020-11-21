import 'react-native-gesture-handler';
import React from 'react';
import { SafeAreaView, StatusBar } from 'react-native';
import { Provider } from 'react-redux';
import { AppearanceProvider, useColorScheme } from 'react-native-appearance';
import TabNavigator from './src/Navigation';
import configureStore from './src/store';
import { getCurrentTheme } from './src/Theme';

export const { store } = configureStore();

const App = () => {
  const scheme = useColorScheme();
  const { colors } = getCurrentTheme(scheme);
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
