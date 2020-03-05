import 'react-native-gesture-handler';
import * as React from 'react';
import {AppRegistry} from 'react-native';
import TabNavigator from './src/navigation/TabNavigation';
import {name as appName} from './app.json';

const App = () => <TabNavigator />;

AppRegistry.registerComponent(appName, () => App);
