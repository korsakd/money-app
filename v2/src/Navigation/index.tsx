import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Icons from 'react-native-vector-icons/MaterialIcons';
import { useColorScheme } from 'react-native-appearance';
import { NavigationContainer, RouteProp } from '@react-navigation/native';
import { getCurrentTheme } from '../Theme';
import HomeScreen from '../Home';
import SettingsScreen from '../Settings';
import LoginScreen from '../Settings/Login';
import { connect, ConnectedProps } from 'react-redux';
import { RootState } from '../store';
import { UserReducerType } from '../store/user';

export type RootStackParamList = {
  Home: undefined;
  Settings: undefined;
  Login: undefined;
  SettingsScreenStack: UserReducerType;
};

type TabNavigatorType = ConnectedProps<typeof connector>;
type SettingsScreenStack = {
  route: RouteProp<RootStackParamList, 'SettingsScreenStack'>;
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

const SettingsScreenStack = ({ route }: SettingsScreenStack) => {
  return (
    <SettingStack.Navigator
      initialRouteName={route.params.user ? 'Settings' : 'Login'}>
      <SettingStack.Screen name="Settings" component={SettingsScreen} />
      <SettingStack.Screen name="Login" component={LoginScreen} />
    </SettingStack.Navigator>
  );
};

const TabNavigator = ({ user }: TabNavigatorType) => {
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
          initialParams={user}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

const mapStateToProps = (state: RootState) => ({
  user: state.user,
});

const connector = connect(mapStateToProps);

export default connector(TabNavigator);
