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

  // const listener = data => {
  //   console.tron({ data });
  // };

  // useEffect(() => {
  //   Auth.signOut();
  // }, []);

  // useEffect(() => {
  //   Hub.listen('auth', listener);
  //   Auth.currentAuthenticatedUser({
  //     bypassCache: true, // Optional, By default is false. If set to true, this call will send a request to Cognito to get the latest user data
  //   })
  //     .then(user => console.tron({ cred: user }))
  //     .catch(err => console.tron({ err }));
  //   return () => {
  //     Hub.remove('auth', listener);
  //   };
  // }, []);

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
