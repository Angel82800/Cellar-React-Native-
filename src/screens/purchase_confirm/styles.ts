import {Dimensions, StyleSheet, ViewStyle, TextStyle, ImageStyle} from 'react-native'
import {Colors, Fonts} from "../../constants";

export default StyleSheet.create({
	container : {
		flex : 1,
		//backgroundColor: 'rgba(0, 0, 0, 0.4)',
	} as ViewStyle,

	nav_bar_container : {
		height : 64, //todo: (Platform.OS === 'ios') ? 64 : 54,
		flexDirection : 'row',
		justifyContent: 'space-between'
	} as ViewStyle,
	
	nav_menu_bt : {
		width : 21,
		height : 24,
		marginTop : 25,
		marginLeft : 20,
		resizeMode : 'contain',
		tintColor : 'white',
		backgroundColor: 'transparent',
	} as ImageStyle,

	nav_title : {
		width : 200,
		height : 30,
		marginTop : 20,
		backgroundColor: 'transparent',
		resizeMode : 'contain'
	} as ImageStyle,

	largeText : {
		fontSize : 18,
		color : 'white',
		backgroundColor: 'transparent',
		textAlign : 'center',
		fontFamily: Fonts.body,
		marginTop : 10,
		marginBottom : 10,
	} as TextStyle, 

	normalText : {
		fontSize : 15,
		color : 'white',
		backgroundColor: 'transparent',
		textAlign : 'center',
		fontFamily: Fonts.body,
		marginTop : 10,
		marginBottom : 10,
	} as TextStyle,

	listView : {
		flex : 1,
		paddingLeft : 5,
		paddingRight : 5,
	} as ViewStyle
});	