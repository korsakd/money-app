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
import Income from '../Category/Income';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import Costs from '../Category/Costs';
import { Dimensions, Pressable, Text, View } from 'react-native';

export type RootStackParamList = {
  Home: undefined;
  Category: undefined;
  Settings: undefined;
  Login: undefined;
  SettingsScreenStack: UserReducerType;
};

type TabNavigatorType = ConnectedProps<typeof connector>;
type SettingsScreenStack = {
  route: RouteProp<RootStackParamList, 'SettingsScreenStack'>;
};

const Tab = createBottomTabNavigator();
const TopTab = createMaterialTopTabNavigator();
const HomeStack = createStackNavigator<RootStackParamList>();
const CategoryStack = createStackNavigator<RootStackParamList>();
const SettingStack = createStackNavigator<RootStackParamList>();

const HomeScreenStack = () => {
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen name="Home" component={HomeScreen} />
    </HomeStack.Navigator>
  );
};

const CategoryScreenStack = () => {
  return (
    <TopTab.Navigator>
      <TopTab.Screen name="Income" component={Income} />
      <TopTab.Screen name="Costs" component={Costs} />
    </TopTab.Navigator>
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
    <>
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
                <Icon name="playlist-plus" color={color} size={26} />
              ),
            }}
            name="Category"
            component={CategoryScreenStack}
          />
          <Tab.Screen
            options={{
              tabBarIcon: ({ color }) => (
                <Icons name="settings" color={color} size={26} />
              ),
            }}
            name="Settings"
            component={SettingsScreenStack}
            initialParams={user}
          />
        </Tab.Navigator>
      </NavigationContainer>
      <View
        style={{
          position: 'absolute',
          bottom: 50,
          left: Dimensions.get('window').width / 2 - 35,
          backgroundColor: colors.background,
          width: 70,
          height: 70,
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: 35,
        }}>
        <Pressable
          style={{
            width: 60,
            height: 60,

            backgroundColor: 'tomato',
            borderRadius: 30,

            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text style={{ fontSize: 30 }}>+</Text>
        </Pressable>
      </View>
    </>
  );
};

const mapStateToProps = (state: RootState) => ({
  user: state.user,
});

const connector = connect(mapStateToProps);

export default connector(TabNavigator);
