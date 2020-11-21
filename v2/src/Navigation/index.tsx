import React from 'react';
import { Text, View } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Icons from 'react-native-vector-icons/MaterialIcons';
import { useColorScheme } from 'react-native-appearance';
import { NavigationContainer } from '@react-navigation/native';
import { getCurrentTheme } from '../Theme';
import HomeScreen from '../Home';
import SettingsScreen from '../Settings';
import LoginScreen from '../Settings/Login';

export type RootStackParamList = {
  Home: undefined;
  Settings: undefined;
  Login: undefined;
};

const Tab = createBottomTabNavigator();
const HomeStack = createStackNavigator<RootStackParamList>();
const SettingStack = createStackNavigator<RootStackParamList>();

const HomeScreenStack = () => {
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen name="Home" component={HomeScreen} />
    </HomeStack.Navigator>
  );
};

const SettingsScreenStack = () => {
  return (
    <SettingStack.Navigator>
      <SettingStack.Screen name="Settings" component={SettingsScreen} />
      <SettingStack.Screen name="Login" component={LoginScreen} />
    </SettingStack.Navigator>
  );
};

const TabNavigator = () => {
  const scheme = useColorScheme();
  const { colors } = getCurrentTheme(scheme);
  return (
    <NavigationContainer theme={getCurrentTheme(scheme)}>
      <Tab.Navigator
        tabBarOptions={{
          activeTintColor: colors.primary,
          inactiveTintColor: colors.border,
          labelStyle: {
            fontSize: 12,
          },
          showLabel: false,
        }}>
        <Tab.Screen
          options={{
            tabBarIcon: ({ color }) => (
              <Icon name="home" color={color} size={26} />
            ),
          }}
          name="Home"
          component={HomeScreenStack}
        />
        <Tab.Screen
          options={{
            tabBarIcon: ({ color }) => (
              <Icons name="settings" color={color} size={26} />
            ),
          }}
          name="settings"
          component={SettingsScreenStack}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default TabNavigator;
