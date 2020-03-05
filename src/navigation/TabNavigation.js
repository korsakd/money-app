import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import Navigator from './index';
import Graphs from '../screens/GraphsSreen';
import Settings from '../screens/SettingsScreen';
import HomeNavigator from './HomeNavigation';

const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="Home" component={HomeNavigator} />
        <Tab.Screen name="Categories" component={Navigator} />
        <Tab.Screen name="Graphs" component={Graphs} />
        <Tab.Screen name="Settings" component={Settings} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default TabNavigator;
