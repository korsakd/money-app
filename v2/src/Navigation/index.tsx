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
import { useSelector } from 'react-redux';
import { RootState } from '../store';
import { UserReducerType } from '../store/user';
import Income from '../Category/Income';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import Costs from '../Category/Costs';
import NewCategory from '../Screens/NewCategory';
import { SafeAreaView } from 'react-native-safe-area-context';

export type RootStackParamList = {
  HomeStack: undefined;
  CategoryStack: undefined;
  SettingsStack: UserReducerType;
};

export type MainStackParamList = {
  Tab: undefined;
  NewCategory: { from: string };
};

export type HomeStackParamList = {
  Home: undefined;
};

export type CategoryTopTabParamList = {
  Income: undefined;
  Costs: undefined;
};

export type CategoryStackParamList = {
  Category: undefined;
};

export type SettingsStackParamList = {
  Settings: undefined;
  Login: undefined;
};

type SettingsScreenStack = {
  route: RouteProp<RootStackParamList, 'SettingsStack'>;
};

const MainStack = createStackNavigator<MainStackParamList>();
const Tab = createBottomTabNavigator<RootStackParamList>();
const CategoryTopTab = createMaterialTopTabNavigator<CategoryTopTabParamList>();
const HomeStack = createStackNavigator<HomeStackParamList>();
const CategoryStack = createStackNavigator<CategoryStackParamList>();
const SettingStack = createStackNavigator<SettingsStackParamList>();

const TabNavigator = () => {
  const scheme = useColorScheme();
  const { colors } = getCurrentTheme(scheme);
  const { user } = useSelector((state: RootState) => state);
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.border,
        tabBarShowLabel: false,
        headerShown: false,
      }}>
      <Tab.Screen
        options={{
          tabBarIcon: ({ color }) => (
            <Icon name="home" color={color} size={26} />
          ),
        }}
        name="HomeStack"
        component={HomeScreenStack}
      />
      <Tab.Screen
        options={{
          tabBarIcon: ({ color }) => (
            <Icon name="playlist-plus" color={color} size={26} />
          ),
        }}
        name="CategoryStack"
        component={CategoryScreenStack}
      />
      <Tab.Screen
        options={{
          tabBarIcon: ({ color }) => (
            <Icons name="settings" color={color} size={26} />
          ),
        }}
        name="SettingsStack"
        component={SettingsScreenStack}
        initialParams={user}
      />
    </Tab.Navigator>
  );
};

const HomeScreenStack = () => {
  return (
    <HomeStack.Navigator screenOptions={{ headerShown: false }}>
      <HomeStack.Screen name="Home" component={HomeScreen} />
    </HomeStack.Navigator>
  );
};

const CategoryTopTabScreen = () => {
  const scheme = useColorScheme();
  const { colors } = getCurrentTheme(scheme);
  return (
    <SafeAreaView
      edges={['top']}
      style={{ flex: 1, backgroundColor: colors.card }}>
      <CategoryTopTab.Navigator
        screenOptions={{
          tabBarLabelStyle: { fontSize: 14, fontWeight: '600' },
        }}>
        <CategoryTopTab.Screen name="Income" component={Income} />
        <CategoryTopTab.Screen name="Costs" component={Costs} />
      </CategoryTopTab.Navigator>
    </SafeAreaView>
  );
};

const CategoryScreenStack = () => {
  return (
    <CategoryStack.Navigator screenOptions={{ headerShown: false }}>
      <CategoryStack.Screen name="Category" component={CategoryTopTabScreen} />
    </CategoryStack.Navigator>
  );
};

const SettingsScreenStack = ({ route }: SettingsScreenStack) => {
  return (
    <SettingStack.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName={route.params.user ? 'Settings' : 'Login'}>
      <SettingStack.Screen name="Settings" component={SettingsScreen} />
      <SettingStack.Screen name="Login" component={LoginScreen} />
    </SettingStack.Navigator>
  );
};

const Navigator = () => {
  const scheme = useColorScheme();
  return (
    <NavigationContainer theme={getCurrentTheme(scheme)}>
      <MainStack.Navigator screenOptions={{ headerShown: false }}>
        <MainStack.Screen name="Tab" component={TabNavigator} />
        <MainStack.Group screenOptions={{ presentation: 'modal' }}>
          <MainStack.Screen name="NewCategory" component={NewCategory} />
        </MainStack.Group>
      </MainStack.Navigator>
    </NavigationContainer>
  );
};

export default Navigator;
