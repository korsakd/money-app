import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Settings from '../screens/SettingsScreen';
import LoginList from '../Components/LoginList';
import LoginHome from '../Components/LoginHome';
import {connect} from 'react-redux';

const MainStack = createStackNavigator();
const RootStack = createStackNavigator();

const SettingsNavigation = () => {
  return (
    <MainStack.Navigator>
      <MainStack.Screen
        options={{
          headerShown: false,
        }}
        name="Settings"
        component={Settings}
      />
    </MainStack.Navigator>
  );
};

const RootNavigator = ({user}) => {
  return (
    <RootStack.Navigator>
      {user ? (
        <RootStack.Screen
          name="Main"
          component={SettingsNavigation}
          options={{
            headerShown: false,
          }}
        />
      ) : (
        <>
          <RootStack.Screen
            name="LoginList"
            component={LoginList}
            options={{
              headerShown: false,
            }}
            initialParams={{fromSettings: true}}
          />
          <RootStack.Screen
            name="LoginHome"
            component={LoginHome}
            options={{
              headerStyle: {
                backgroundColor: '#be935a',
              },
              headerTitle: '',
              headerTintColor: '#fff',
            }}
            initialParams={{fromSettings: true}}
          />
        </>
      )}
    </RootStack.Navigator>
  );
};

const mapStateToProps = state => {
  return {
    user: state.userReducer.user,
  };
};

export default connect(
  mapStateToProps,
  null,
)(RootNavigator);
