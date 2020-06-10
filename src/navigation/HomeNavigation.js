import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import HomeScreen from '../screens/HomeSreen';
import Details from '../screens/Details';

const Stack = createStackNavigator();

const HomeNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        options={{
          headerStyle: {
            backgroundColor: '#470736',
          },
          // headerTintColor: '#fff',
          headerTitle: '',
          // headerTitleStyle: {
          //   // color: '#470736',
          // },
        }}
        name="Home"
        component={HomeScreen}
      />
      <Stack.Screen
        name="Details"
        component={Details}
        options={{
          headerStyle: {
            backgroundColor: '#470736',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      />
    </Stack.Navigator>
  );
};

export default HomeNavigator;
