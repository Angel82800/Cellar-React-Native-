import {StyleSheet, TextStyle, ViewStyle} from 'react-native';
import {Fonts} from "../../../../constants";

export default StyleSheet.create({
  container: {
    flex: 1,
    padding: 8,
    backgroundColor: 'transparent',
  } as ViewStyle,
  containerEmptyHeader: {
    flex: 1,
    padding: 0,
    backgroundColor: 'transparent',
  } as ViewStyle,
  textSmall: {
    fontSize: 15,
    color : 'white',
    fontFamily: Fonts.body
  } as TextStyle
});