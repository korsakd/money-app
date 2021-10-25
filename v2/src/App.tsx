import React from 'react';
import { SafeAreaView, StatusBar } from 'react-native';
import { Provider } from 'react-redux';
import { AppearanceProvider, useColorScheme } from 'react-native-appearance';
import TabNavigator from './Navigation';
import configureStore from './store';
import { getCurrentTheme } from './Theme';
import Amplify from 'aws-amplify';
import awsconfig from './aws-exports';
import Navigator from './Navigation';
Amplify.configure(awsconfig);

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
        <Navigator />
      </Provider>
    </AppearanceProvider>
  );
};

export default App;
