import {Dimensions, StyleSheet, TextStyle, ViewStyle} from 'react-native'

export default StyleSheet.create({
	container : {
		flex : 1,
		flexDirection : 'row',
		borderBottomColor:'white',
		borderBottomWidth:1
	} as ViewStyle,

	wine_image : {
		width : 82,
		height : 123,
		marginLeft : 8,
	} as ViewStyle,

	description_container : {
		flex : 1,
		flexDirection : 'column',
	} as ViewStyle,

	wine_title : {
		marginLeft : 8,
		fontSize : 16,
		color : 'white',
		marginTop : 3,
		backgroundColor : 'transparent',
	} as ViewStyle,

	wine_price : {
		marginLeft : 8,
		fontSize : 14,
		color : 'white',
		backgroundColor : 'transparent',
		marginTop : 3,
	} as TextStyle,

	percentage : {
		marginLeft : 8,
		fontSize : 14,
		color : 'white',
		backgroundColor : 'transparent',
		marginTop : 3,
	} as ViewStyle,

	description : {
		marginLeft : 8,
		fontSize : 14,
		color : 'white',
		backgroundColor : 'transparent',
		marginTop : 3,
	} as ViewStyle,
});