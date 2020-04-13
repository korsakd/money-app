import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import CategoriesNav from '../navigation/CatigoriesNavigation';
import NewCategory from '../screens/NewCategory';

const Stack = createStackNavigator();

function Navigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Categories"
        component={CategoriesNav}
        options={{
          headerStyle: {
            backgroundColor: '#694fad',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      />
      <Stack.Screen
        name="NewCategory"
        component={NewCategory}
        options={{
          headerStyle: {
            backgroundColor: '#694fad',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      />
    </Stack.Navigator>
  );
}

export default Navigator;
