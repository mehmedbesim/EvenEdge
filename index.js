/**
 * @format
 */

import {AppRegistry} from 'react-native';
import MainContainer from './navigation/MainContainer';
import HomeScreen from './navigation/screens/HomeScreen';
import {name as appName} from './app.json';

AppRegistry.registerComponent(appName, () => MainContainer);
