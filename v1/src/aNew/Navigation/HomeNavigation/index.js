import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import HomeScreen from '../../components/Home';

const MainStack = createStackNavigator();

const HomeScreenNavigator = () => {
  return (
    <MainStack.Navigator>
      <MainStack.Screen
        options={{
          headerStyle: {
            backgroundColor: '#1c2b59',
          },
          headerTitle: '',
        }}
        name="Home"
        component={HomeScreen}
      />
    </MainStack.Navigator>
  );
};

export default HomeScreenNavigator;
