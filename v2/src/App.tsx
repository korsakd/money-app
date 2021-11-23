import React from 'react';
import { StatusBar } from 'react-native';
import { Provider } from 'react-redux';
import { AppearanceProvider, useColorScheme } from 'react-native-appearance';
import configureStore from './store';
import Navigator from './Navigation';

export const { store } = configureStore();

const App = () => {
  const scheme = useColorScheme();

  return (
    <AppearanceProvider>
      <Provider store={store}>
        <StatusBar
          barStyle={scheme === 'light' ? 'dark-content' : 'light-content'}
        />
        <Navigator />
      </Provider>
    </AppearanceProvider>
  );
};

export default App;
