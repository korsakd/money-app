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
import NewCategory from '../Screens/NewCategory';

export type RootStackParamList = {
  HomeStack: undefined;
  CategoryStack: undefined;
  SettingsStack: UserReducerType;
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
  NewCategory: { from: string };
};

export type SettingsStackParamList = {
  Settings: undefined;
  Login: undefined;
};

type TabNavigatorType = ConnectedProps<typeof connector>;
type SettingsScreenStack = {
  route: RouteProp<RootStackParamList, 'SettingsStack'>;
};

const Tab = createBottomTabNavigator<RootStackParamList>();
const CategoryTopTab = createMaterialTopTabNavigator<CategoryTopTabParamList>();
const HomeStack = createStackNavigator<HomeStackParamList>();
const CategoryStack = createStackNavigator<CategoryStackParamList>();
const SettingStack = createStackNavigator<SettingsStackParamList>();

const HomeScreenStack = () => {
  return (
    <HomeStack.Navigator screenOptions={{ headerShown: false }}>
      <HomeStack.Screen name="Home" component={HomeScreen} />
    </HomeStack.Navigator>
  );
};

const CategoryTopTabScreen = () => {
  return (
    <CategoryTopTab.Navigator
      screenOptions={{ tabBarLabelStyle: { fontSize: 14, fontWeight: '600' } }}>
      <CategoryTopTab.Screen name="Income" component={Income} />
      <CategoryTopTab.Screen name="Costs" component={Costs} />
    </CategoryTopTab.Navigator>
  );
};

const CategoryScreenStack = () => {
  return (
    <CategoryStack.Navigator screenOptions={{ headerShown: false }}>
      <CategoryStack.Screen name="Category" component={CategoryTopTabScreen} />
      <CategoryStack.Group screenOptions={{ presentation: 'modal' }}>
        <CategoryStack.Screen name="NewCategory" component={NewCategory} />
      </CategoryStack.Group>
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

const TabNavigator = ({ user }: TabNavigatorType) => {
  const scheme = useColorScheme();
  const { colors } = getCurrentTheme(scheme);
  return (
    <>
      <NavigationContainer theme={getCurrentTheme(scheme)}>
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
      </NavigationContainer>
      {/* <View
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
      </View> */}
    </>
  );
};

const mapStateToProps = (state: RootState) => ({
  user: state.user,
});

const connector = connect(mapStateToProps);

export default connector(TabNavigator);
