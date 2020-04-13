import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import Icon from 'react-native-vector-icons/dist/MaterialCommunityIcons';
import Navigator from './index';
import Graphs from '../screens/GraphsSreen';
import Settings from '../screens/SettingsScreen';
import HomeNavigator from './HomeNavigation';

const Tab = createMaterialBottomTabNavigator();

const TabNavigator = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator activeColor="#f0edf6" inactiveColor="#bababa">
        <Tab.Screen
          options={{
            tabBarColor: '#a35f1b',
            tabBarLabel: 'Home',
            tabBarIcon: ({color}) => (
              <Icon name="home-outline" color={color} size={26} />
            ),
          }}
          name="Home"
          component={HomeNavigator}
        />
        <Tab.Screen
          name="Categories"
          component={Navigator}
          options={{
            tabBarColor: '#694fad',
            tabBarLabel: 'Categories',
            tabBarIcon: ({color}) => (
              <Icon name="playlist-edit" color={color} size={26} />
            ),
          }}
        />
        <Tab.Screen
          name="Graphs"
          component={Graphs}
          options={{
            tabBarColor: '#445328',
            tabBarLabel: 'Categories',
            tabBarIcon: ({color}) => (
              <Icon name="chart-arc" color={color} size={26} />
            ),
          }}
        />
        <Tab.Screen
          name="Settings"
          component={Settings}
          options={{
            tabBarColor: '#be935a',
            tabBarLabel: 'Categories',
            tabBarIcon: ({color}) => (
              <Icon name="settings-outline" color={color} size={26} />
            ),
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default TabNavigator;
