import { AppRegistry, StatusBar } from 'react-native'
import {App} from './build/App'

StatusBar.setBarStyle('default');
AppRegistry.registerComponent('UndergroundCellarApp', () => App);