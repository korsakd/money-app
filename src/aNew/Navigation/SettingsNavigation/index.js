import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import SettingsScreen from '../../components/Settings';

const MainStack = createStackNavigator();

const SettingsScreenNavigator = () => {
  return (
    <MainStack.Navigator>
      <MainStack.Screen
        options={{
          headerStyle: {
            backgroundColor: '#1c2b59',
          },
          headerTitle: '',
        }}
        name="Settings"
        component={SettingsScreen}
      />
    </MainStack.Navigator>
  );
};

export default SettingsScreenNavigator;
