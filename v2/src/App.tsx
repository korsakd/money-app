import React, { useEffect } from 'react';
import { StatusBar } from 'react-native';
import { Provider } from 'react-redux';
import { AppearanceProvider, useColorScheme } from 'react-native-appearance';
import configureStore from './store';
import { getCurrentTheme } from './Theme';
import Amplify, { Auth, API, graphqlOperation } from 'aws-amplify';
import awsconfig from './aws-exports';
import Navigator from './Navigation';
import { Hub, Logger } from 'aws-amplify';
import { getUser } from './graphql/queries';
import { createUser } from './graphql/mutations';

Amplify.configure(awsconfig);
Auth.configure(awsconfig);

export const { store } = configureStore();

const App = () => {
  const scheme = useColorScheme();

  useEffect(() => {
    // const fetchUser = async () => {
    //   try {
    //     const userInfo = await Auth.currentAuthenticatedUser({
    //       bypassCache: true,
    //     });
    //     if (userInfo) {
    //       const userData = await API.graphql(
    //         graphqlOperation(getUser, { id: userInfo.attributes.sub }),
    //       );
    //       if (userData.data.getUser) {
    //         return;
    //       }
    //       const newUser = {
    //         id: userInfo.attributes.sub,
    //         name: 'Dima',
    //       };
    //       await API.graphql(graphqlOperation(createUser, { input: newUser }));
    //     }
    //   } catch (error) {
    //     console.tron({ error });
    //   }
    // };
    // fetchUser();
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
