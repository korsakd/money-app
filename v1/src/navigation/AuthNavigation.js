import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import EmailScreen from '../Components/EmailScreen';
import LoginHome from '../Components/LoginHome';
import CheckEmailScreen from '../Components/CheckEmailScreen';

const Stack = createStackNavigator();

const AuthNavigation = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="LoginHome"
        component={LoginHome}
        initialParams={{fromSettings: false}}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="EmailScreen"
        component={EmailScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="CheckEmailScreen"
        component={CheckEmailScreen}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
};

export default AuthNavigation;
