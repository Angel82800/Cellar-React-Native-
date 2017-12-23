/**
 * Created by Roderick L
 */

import {Dimensions, StyleSheet, ViewStyle, ImageStyle, TextStyle} from 'react-native'
import {Colors, Fonts} from "../../../../constants";

export default StyleSheet.create({
	container: {
		flex: 1,
		padding: 10,
		backgroundColor: 'rgba(57, 57, 57, 1.0)'
	} as ViewStyle,

	itemContainer: {
		flex: 1,
	} as ViewStyle,

	nameContainer: {
		flexDirection: 'row',
	} as ViewStyle,

	nameTitleContainer: {
		width: Dimensions.get('window').width - 100,
	} as ViewStyle,

	separator: {
		flex: 1,
		height: 1,
		backgroundColor: 'rgba(151, 151, 151, 1.0)',
	} as ViewStyle,

	text: {
		fontSize: 14,
		color: 'white',
		fontFamily: Fonts.body,
		marginTop: 10,
		marginBottom: 10,
	} as TextStyle,

	avatar: {
		width: 60,
		height: 60,
		position: 'absolute',
		right: 0,
		resizeMode: 'contain',
	} as ImageStyle,
})