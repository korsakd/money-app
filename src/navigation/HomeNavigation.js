import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import HomeScreen from '../screens/HomeSreen';
import Details from '../screens/Details';

const Stack = createStackNavigator();

const HomeNavigator = () => {
  return (
    <Stack.Navigator mode="modal">
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Details" component={Details} />
    </Stack.Navigator>
  );
};

export default HomeNavigator;
