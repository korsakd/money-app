import React, { useEffect } from 'react';
import { SafeAreaView, StatusBar } from 'react-native';
import { Provider } from 'react-redux';
import { AppearanceProvider, useColorScheme } from 'react-native-appearance';
import TabNavigator from './Navigation';
import configureStore from './store';
import { getCurrentTheme } from './Theme';
import Amplify, { Auth } from 'aws-amplify';
import awsconfig from './aws-exports';
import Navigator from './Navigation';
import { Hub, Logger } from 'aws-amplify';

Amplify.configure(awsconfig);
Auth.configure(awsconfig);

export const { store } = configureStore();

const App = () => {
  const scheme = useColorScheme();
  const { colors } = getCurrentTheme(scheme);

  const listener = data => {
    console.tron({ data });
    // switch (data.payload.event) {
    //   case 'signIn':
    //     logger.info('user signed in');
    //     break;
    //   case 'signUp':
    //     logger.info('user signed up');
    //     break;
    //   case 'signOut':
    //     logger.info('user signed out');
    //     break;
    //   case 'signIn_failure':
    //     logger.error('user sign in failed');
    //     break;
    //   case 'tokenRefresh':
    //     logger.info('token refresh succeeded');
    //     break;
    //   case 'tokenRefresh_failure':
    //     logger.error('token refresh failed');
    //     break;
    //   case 'configured':
    //     logger.info('the Auth module is configured');
    // }
  };

  useEffect(() => {
    Hub.listen('auth', listener);
    return () => {
      Hub.remove('auth', listener);
    };
  }, []);

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
