import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import Icon from 'react-native-vector-icons/dist/MaterialCommunityIcons';
import Navigator from './index';
import GraphsNavigation from '../navigation/GraphsNavigation';
import SettingsNavigation from './SettingsNavigation';
import HomeNavigator from './HomeNavigation';
import ConversionNavigation from './ConversionNavigation';
import translate from '../translate/Translate';

const Tab = createMaterialBottomTabNavigator();

const TabNavigator = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator activeColor="#f0edf6" inactiveColor="#bababa">
        <Tab.Screen
          options={{
            tabBarColor: '#470736',
            tabBarLabel: translate('home'),
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
            tabBarLabel: translate('categories'),
            tabBarIcon: ({color}) => (
              <Icon name="playlist-edit" color={color} size={26} />
            ),
          }}
        />
        <Tab.Screen
          name="Conversion"
          component={ConversionNavigation}
          options={{
            tabBarColor: '#505049',
            tabBarLabel: translate('converter'),
            tabBarIcon: ({color}) => (
              <Icon name="currency-usd" color={color} size={26} />
            ),
          }}
        />
        <Tab.Screen
          name="Graphs"
          component={GraphsNavigation}
          options={{
            tabBarColor: '#445328',
            tabBarLabel: translate('graphs'),
            tabBarIcon: ({color}) => (
              <Icon name="chart-arc" color={color} size={26} />
            ),
          }}
        />
        <Tab.Screen
          name="Settings"
          component={SettingsNavigation}
          options={{
            tabBarColor: '#be935a',
            tabBarLabel: translate('settings'),
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
