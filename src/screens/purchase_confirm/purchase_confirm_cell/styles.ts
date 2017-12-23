import {Dimensions, StyleSheet, ViewStyle, ImageStyle, TextStyle } from 'react-native'
import {Fonts} from "../../../constants";

export default StyleSheet.create({
	container : {
		flex : 1,
		width : (Dimensions.get('window').width - 10) / 3,
		paddingLeft : 5,
		paddingRight : 5,
	} as ViewStyle,
	img_container : {
		flex : 1,
		height : 170,
		resizeMode : 'cover',
		borderColor: '#666',
    	borderWidth: 1,
	} as ViewStyle,
	title : {
		fontSize : 14,
		color : 'white',
		textAlign : 'center',
		fontFamily: Fonts.body,
		marginTop : 10,
		marginBottom: 10,
		backgroundColor: 'transparent',
	} as TextStyle,
	upload_title : {
		fontSize : 15,
		color : 'black',
		fontFamily: Fonts.body,
		backgroundColor: '#EAB96A',
		padding: 15,
		position : 'absolute',
		right : 6,
		top : 1,
	} as TextStyle,
});	