import React from 'react';
import { Text, View } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Icons from 'react-native-vector-icons/MaterialIcons';
import { AppearanceProvider, useColorScheme } from 'react-native-appearance';
import { NavigationContainer } from '@react-navigation/native';
import { getCurrentTheme } from '../Theme';
import SettingsScreen from '../Settings';
import LoginScreen from '../Settings/Login';

export type RootStackParamList = {
  Settings: undefined;
  Login: undefined;
};

const Tab = createBottomTabNavigator();
const SettingStack = createStackNavigator<RootStackParamList>();

function HomeScreen() {
  const scheme = useColorScheme();
  const { colors } = getCurrentTheme(scheme);
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colors.background,
      }}>
      <Text>Home!</Text>
    </View>
  );
}

const SettingsStack = () => {
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
    <AppearanceProvider>
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
            component={HomeScreen}
          />
          <Tab.Screen
            options={{
              tabBarIcon: ({ color }) => (
                <Icons name="settings" color={color} size={26} />
              ),
            }}
            name="settings"
            component={SettingsStack}
          />
        </Tab.Navigator>
      </NavigationContainer>
    </AppearanceProvider>
  );
};

export default TabNavigator;
