import 'react-native-gesture-handler';
import React from 'react';
import {AppRegistry} from 'react-native';
import TabNavigator from './src/navigation/TabNavigation';
import {name as appName} from './app.json';
import {Provider} from 'react-redux';
import createStore from './src/redux';
import {PersistGate} from 'redux-persist/integration/react';
import TranslationProvider from './src/translate/TranslationProvider';

if (__DEV__) {
  import('./src/config/ReactotronConfig').then(() =>
    console.log('Reactotron Configured'),
  );
}

const {store, persistor} = createStore();
const App = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <TranslationProvider>
          <TabNavigator />
        </TranslationProvider>
      </PersistGate>
    </Provider>
  );
};

AppRegistry.registerComponent(appName, () => App);
