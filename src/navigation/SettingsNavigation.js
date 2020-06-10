import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Settings from '../screens/SettingsScreen';

const Stack = createStackNavigator();

const SettingsNavigation = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        options={{
          headerStyle: {
            backgroundColor: '#be935a',
          },
          headerTitle: '',
        }}
        name="Settings"
        component={Settings}
      />
    </Stack.Navigator>
  );
};

export default SettingsNavigation;
