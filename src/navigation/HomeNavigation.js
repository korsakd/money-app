import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import HomeScreen from '../screens/HomeSreen';
import Details from '../screens/Details';
import translate from '../translate/Translate';
import LoginList from '../Components/LoginList';
import LoginHome from '../Components/LoginHome';
import AuthNavigation from './AuthNavigation';

const MainStack = createStackNavigator();
const RootStack = createStackNavigator();

const HomeNavigator = () => {
  return (
    <MainStack.Navigator>
      <MainStack.Screen
        options={{
          headerStyle: {
            backgroundColor: '#1c2b59',
          },
          headerTitle: '',
        }}
        name="Home"
        component={HomeScreen}
      />
      <MainStack.Screen
        name="Details"
        component={Details}
        options={{
          title: translate('details'),
          headerStyle: {
            backgroundColor: '#1c2b59',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      />
    </MainStack.Navigator>
  );
};

const RootStackNavigation = () => {
  return (
    <RootStack.Navigator mode="modal">
      <RootStack.Screen
        name="Main"
        component={HomeNavigator}
        options={{headerShown: false}}
      />
      <RootStack.Screen
        name="LoginList"
        component={LoginList}
        initialParams={{fromSettings: false}}
        options={{
          headerStyle: {
            backgroundColor: '#1c2b59',
          },
          headerTitle: '',
          headerTintColor: '#fff',
        }}
      />
      {/* <RootStack.Screen
        name="LoginHome"
        component={LoginHome}
        initialParams={{fromSettings: false}}
        options={{
          headerStyle: {
            backgroundColor: '#1c2b59',
          },
          headerTitle: '',
          headerTintColor: '#fff',
        }}
      /> */}
      <RootStack.Screen
        name="AuthNavigation"
        component={AuthNavigation}
        initialParams={{fromSettings: false}}
        options={{
          headerStyle: {
            backgroundColor: '#1c2b59',
          },
          headerTitle: '',
          headerTintColor: '#fff',
        }}
      />
    </RootStack.Navigator>
  );
};
export default RootStackNavigation;
