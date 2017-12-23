import {Dimensions, StyleSheet, TextStyle, ViewStyle, ImageStyle} from 'react-native'
import {Fonts} from "../../../../constants";

export default StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: 'rgba(57, 57, 57, 1.0)',
	} as ViewStyle,

	itemContainer: {
		flex: 1,
		flexDirection: 'row',
		padding: 10,
	} as ViewStyle,

	text: {
		fontSize: 14,
		color: 'white',
		fontFamily: Fonts.body,
	} as TextStyle,

	icon: {
		width: 20,
		height: 30,
		resizeMode: 'center',
		position: 'absolute',
		right: 10,
	} as ImageStyle,

	rightText: {
		fontSize: 14,
		color: 'white',
		position: 'absolute',
		right: 10,
		top: 10,
	} as TextStyle,
});
