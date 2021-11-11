import React from 'react';
import { StatusBar } from 'react-native';
import { Provider } from 'react-redux';
import { AppearanceProvider, useColorScheme } from 'react-native-appearance';
import configureStore from './store';
import { PersistGate } from 'redux-persist/integration/react';
import Amplify, { Auth } from 'aws-amplify';
import awsconfig from './aws-exports';
import Navigator from './Navigation';

Amplify.configure(awsconfig);
Auth.configure(awsconfig);

export const { store, persistor } = configureStore();

const App = () => {
  const scheme = useColorScheme();

  return (
    <AppearanceProvider>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <StatusBar
            barStyle={scheme === 'light' ? 'dark-content' : 'light-content'}
          />
          <Navigator />
        </PersistGate>
      </Provider>
    </AppearanceProvider>
  );
};

export default App;
