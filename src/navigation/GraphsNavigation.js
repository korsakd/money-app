import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import GraphsScreen from '../screens/GraphsSreen';

const Stack = createStackNavigator();

const GraphsNavigation = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        options={{
          headerShown: false,
        }}
        name="Graphs"
        component={GraphsScreen}
      />
    </Stack.Navigator>
  );
};

export default GraphsNavigation;
