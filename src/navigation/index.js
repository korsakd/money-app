import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import translate from '../translate/Translate';
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
          headerShown: false,
          headerStyle: {
            backgroundColor: '#694fad',
          },
          headerTitle: '',
        }}
      />
      <Stack.Screen
        name="NewCategory"
        component={NewCategory}
        options={{
          title: translate('newCategory'),
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
