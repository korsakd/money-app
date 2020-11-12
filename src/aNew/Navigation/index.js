import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import Icon from 'react-native-vector-icons/dist/MaterialCommunityIcons';
import HomeScreenNavigator from './HomeNavigation';
import CategoriesScreenNavigator from './CategoriesNavigation';
import GraphsScreenNavigator from './GraphsNavigation';
import SettingsScreenNavigator from './SettingsNavigation';
import translate from '../../translate/Translate';

const Tab = createMaterialBottomTabNavigator();

const TabNavigator = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator activeColor="#ff5a19" inactiveColor="#bababa">
        <Tab.Screen
          options={{
            tabBarColor: '#1c2b59',
            tabBarLabel: translate('home'),
            tabBarIcon: ({ color }) => (
              <Icon name="home-outline" color={color} size={26} />
            ),
          }}
          name="Home"
          component={HomeScreenNavigator}
        />
        <Tab.Screen
          name="Categories"
          component={CategoriesScreenNavigator}
          options={{
            tabBarColor: '#1c2b59',
            tabBarLabel: translate('categories'),
            tabBarIcon: ({ color }) => (
              <Icon name="playlist-edit" color={color} size={26} />
            ),
          }}
        />
        <Tab.Screen
          name="Graphs"
          component={GraphsScreenNavigator}
          options={{
            tabBarColor: '#1c2b59',
            tabBarLabel: translate('graphs'),
            tabBarIcon: ({ color }) => (
              <Icon name="chart-arc" color={color} size={26} />
            ),
          }}
        />
        <Tab.Screen
          name="Settings"
          component={SettingsScreenNavigator}
          options={{
            tabBarColor: '#1c2b59',
            tabBarLabel: translate('settings'),
            tabBarIcon: ({ color }) => (
              <Icon name="settings-outline" color={color} size={26} />
            ),
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default TabNavigator;
