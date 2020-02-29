import 'react-native-gesture-handler';
import * as React from 'react';
import {AppRegistry} from 'react-native';
import Navigator from './src/navigation';
import {name as appName} from './app.json';

const App = () => <Navigator />;

AppRegistry.registerComponent(appName, () => App);
