import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import HomeScreen from '../screens/HomeSreen';
import Details from '../screens/Details';
import translate from '../translate/Translate';

const Stack = createStackNavigator();

const HomeNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        options={{
          headerStyle: {
            backgroundColor: '#470736',
          },
          headerTitle: '',
        }}
        name="Home"
        component={HomeScreen}
      />
      <Stack.Screen
        name="Details"
        component={Details}
        options={{
          title: translate('details'),
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
