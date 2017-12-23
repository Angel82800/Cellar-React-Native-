import {Platform, Dimensions, StyleSheet, ViewStyle, TextStyle} from 'react-native'
import {Fonts} from "../../constants";

export default StyleSheet.create({
	container : {
		flex : 1,
		flexDirection : 'column'
	} as ViewStyle,
	
	background : {
		position: 'absolute',
		right : 0,
		left : 0,
		bottom : 0,
		top : 0,
	} as ViewStyle,

	viewPager : {
		flex : 1,
	} as ViewStyle,

	btnCloseContainer : {
		position: 'absolute',  
		right : 20, 
		top : 20,
	} as ViewStyle,

	btnNextContainer : {
		position: 'absolute',  
		right : 20, 
		bottom : 20,
	} as ViewStyle,

	btnImg : {
		width : 40,
		height : 40,
	} as ViewStyle,

	guide_container : {
		flex : 1,
		justifyContent : "center",
		alignItems : 'center',
	} as ViewStyle,

	guide_image : {
		width : Dimensions.get('window').width - 50,
		height : Dimensions.get('window').height / 2 - 50,
		resizeMode : 'center',
	} as ViewStyle,

	guide_title : {
		fontSize : 16,
		color : 'white',
		marginTop : 10,
		fontFamily: Fonts.body,
	} as TextStyle,

	guide_detail : {
		fontSize : 13,
		color : 'white',
		textAlign : 'center',
		marginTop : 20,
		fontFamily: Fonts.body,
	} as TextStyle,
	
	page: {
	   width: Dimensions.get('window').width,
	} as ViewStyle,

	statusBar: {
	   height: Platform.OS === 'ios' ? 20 : 0,
	},

	headerLabel : {
		fontSize : 15,
		color : 'white',
		backgroundColor: 'transparent',
		textAlign : 'center',
		fontFamily: Fonts.body,
	} as TextStyle,

	forgotBtLabel : {
		fontSize : 15,
		color : 'white',
		backgroundColor: 'transparent',
		textAlign : 'center',
		fontFamily: Fonts.body,
		textDecorationLine : 'underline',
	} as TextStyle,

	largeLabel : {
		fontSize : 18,
		color : 'white',
		marginBottom : 10,
		backgroundColor: 'transparent',
		textAlign: 'center'
	} as TextStyle,

	normalLabel : {
		fontSize : 15,
		color : 'white',
		backgroundColor: 'transparent',
		fontFamily: Fonts.body,
	} as TextStyle,

	descriptionContainer : {
		marginTop : 30,
		marginBottom : 10,
		marginLeft : 30,
		marginRight : 30,
	} as ViewStyle,

	separator : {
		height: 1,
		backgroundColor : 'rgba(151, 151, 151, 1.0)',
	} as ViewStyle,

	textInput : {
		fontSize : 14,
		color : 'white',
		height : 35,
		width : Dimensions.get('window').width - 60,
		margin : 5,
		fontFamily: Fonts.body,
	} as TextStyle,

	orContainer : {
		alignItems : 'center',
		marginTop : 15,
	} as ViewStyle,
});