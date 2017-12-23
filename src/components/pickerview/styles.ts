import {Dimensions, StyleSheet, ViewStyle} from 'react-native'

export default StyleSheet.create({
	container : {
		flex : 1,
		backgroundColor : 'rgba(37, 37, 37, 1.0)'
	} as ViewStyle,

	listView : {
		flex : 1,
	} as ViewStyle,

	description : {
		marginLeft : 8,
		fontSize : 18,
		color : 'white',
		backgroundColor : 'transparent',
		marginTop : 3,
	} as ViewStyle,
});