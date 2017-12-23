import {Dimensions, StyleSheet, ViewStyle, TextStyle} from 'react-native'

export default StyleSheet.create({
	container : {
		flex : 1,
	} as ViewStyle,

	background : {
		flex : 1,
		resizeMode : 'cover'
	} as ViewStyle,

	buttonContainer : {
		width : Dimensions.get('window').width,
		position: 'absolute', 
		bottom : 30, 
		alignItems:'center',
	} as ViewStyle,

	btTitle : {
		fontSize : 18,
		color : 'white',
	} as TextStyle,
})