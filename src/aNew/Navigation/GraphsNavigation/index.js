import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import GraphsScreen from '../../components/Graphs';

const MainStack = createStackNavigator();

const GraphsScreenNavigator = () => {
  return (
    <MainStack.Navigator>
      <MainStack.Screen
        options={{
          headerStyle: {
            backgroundColor: '#1c2b59',
          },
          headerTitle: '',
        }}
        name="Graphs"
        component={GraphsScreen}
      />
    </MainStack.Navigator>
  );
};

export default GraphsScreenNavigator;
