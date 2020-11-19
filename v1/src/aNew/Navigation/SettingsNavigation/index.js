import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import SettingsScreen from '../../components/Settings';
import LoginScreen from '../../components/Settings/Login';
import SignInScreen from '../../components/Settings/SignIn';
import { connect } from 'react-redux';

const MainStack = createStackNavigator();
const RootStack = createStackNavigator();

// const LoginNavigation = () => {
//   return (
//     <RootStack.Navigator>
//       <RootStack.Screen
//         name="Login"
//         component={LoginScreen}
//         options={{
//           headerStyle: {
//             backgroundColor: '#1c2b59',
//           },
//           headerTitle: '',
//         }}
//       />
//       <RootStack.Screen
//         name="SignIn"
//         component={SignInScreen}
//         options={{
//           headerStyle: {
//             backgroundColor: '#1c2b59',
//           },
//           headerTitle: '',
//         }}
//       />
//     </RootStack.Navigator>
//   );
// };

const commonScreen = {
  Settings: SettingsScreen,
};

const authScreens = {
  Login: LoginScreen,
  SignIn: SignInScreen,
};

const SettingsNavigator = ({ user }) => {
  return (
    <MainStack.Navigator>
      {Object.entries(user ? commonScreen : authScreens).map(
        ([name, component]) => (
          <MainStack.Screen name={name} component={component} />
        ),
      )}
    </MainStack.Navigator>
  );
};

export default connect(
  state => ({ user: state.userReducer.user }),
  null,
)(SettingsNavigator);
