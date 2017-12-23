import {Dimensions, StyleSheet, ViewStyle, TextStyle, ImageStyle, Platform} from 'react-native'
import {Colors, Fonts} from "../../constants";

export default StyleSheet.create({
    container : {
		flex : 1,
		backgroundColor: Colors.black,
		flexDirection: 'column'
	} as ViewStyle,

	backgroundImage: {
		resizeMode: 'cover',
		position: 'absolute',
		left: 0,
		top: 0,
		width: Dimensions.get('window').width,
		height: Dimensions.get('window').height,
	} as ImageStyle,

	nav_bar_container : {
		height : 64, //(Platform.OS === 'ios') ? 64 : 54,
		flexDirection : 'row'
	} as ViewStyle,

	nav_menu_bt : {
		flex: 1,
		resizeMode: 'contain',
		tintColor : 'white',
	} as ImageStyle,

	touchable_container : {
		width: 24,
		height: 30,
		position: 'absolute',
		left: 16,
		top: 16,
		flexDirection: 'row'
	} as ViewStyle,

	nav_title : {
		fontSize : 16,
		color : 'white',
		alignSelf: 'center',
		flex: 1,
		backgroundColor: 'transparent',
		textAlign: 'center'
	} as TextStyle,

	buy_bt_container : {
		alignSelf: 'flex-end',
		alignItems:'center',
		bottom : 0,
	} as ViewStyle,

	login_bt : {
		width : Dimensions.get('window').width,
		height : 50,
		fontSize : 20,
		backgroundColor : Colors.redTint,
		color : 'white',
		textAlign : 'center',
		paddingTop : 15,
		paddingBottom : 15,
		justifyContent : 'center',
		fontFamily: Fonts.body
	} as TextStyle,

	mainView : {
		flex : 1,
		marginBottom : 50,
	} as ViewStyle,

	statusBar: {
		height: Platform.OS === 'ios' ? 20 : 0,
	} as ViewStyle,

	separator: {
		height: 1,
		width: Dimensions.get('window').width,
		paddingLeft: 20,
		paddingRight: 20,
		marginTop :10,
		marginBottom:10,
		backgroundColor: '#636363'
	} as TextStyle,

	background : {
		position: 'absolute',
		right : 0,
		left : 0,
		bottom : 0,
		top : 0,
	} as ViewStyle,

	checkoutRow: {
		flex: 1,
		justifyContent: 'flex-start',
		alignItems: 'center',
		flexDirection: 'row',
		paddingLeft: 16,
		paddingRight: 16
	},

	checkoutRowLabel1 : {
		fontSize : 11,
		flex: 0.25,
		color : 'white',
		alignSelf : 'flex-start',
		backgroundColor: 'transparent',
		fontFamily: Fonts.body,
		fontWeight: 'bold',
		flexWrap: 'wrap',
		textAlignVertical: 'center'
	} as TextStyle,

	checkoutRowLabel2 : {
		fontSize : 14,
		flex: 0.65,
		color : '#ccc',
		alignSelf : 'flex-start',
		backgroundColor: 'transparent',
		fontFamily: Fonts.body,
		textAlignVertical: 'center'
	} as TextStyle,

	checkoutRowLabel3 : {
		fontSize : 20,
		flex: 0.1,
		color : '#ccc',
		alignSelf : 'flex-end',
		backgroundColor: 'transparent',
		fontFamily: Fonts.body,
		textAlign: 'right',
		textAlignVertical: 'center'
	} as TextStyle,

	summaryItem: {
		flexDirection: 'row',
		flex: 1,
		paddingTop: 3,
		paddingBottom: 3,
	} as ViewStyle,

	summaryLabel1 : {
		fontSize : 11,
		flex: 0.75,
		color : 'white',
		alignSelf : 'flex-start',
		backgroundColor: 'transparent',
		paddingLeft: 16,
		fontFamily: Fonts.body,
		fontWeight: "bold",
	} as TextStyle,

	summaryLabel2 : {
		fontSize : 16,
		flex: 0.25,
		color : 'white',
		alignSelf : 'flex-end',
		textAlign: 'right',
		backgroundColor: 'transparent',
		paddingRight: 16,
		fontFamily: Fonts.body
	} as TextStyle,

	finalLabel1 : {
		fontSize : 20,
		flex: 0.75,
		color : Colors.orangeText,
		alignSelf : 'flex-start',
		backgroundColor: 'transparent',
		paddingLeft: 16,
		fontFamily: Fonts.body,
		fontWeight: "bold"
	} as TextStyle,

	finalLabel2 : {
		fontSize : 20,
		flex: 0.25,
		color : 'orange',
		alignSelf : 'flex-end',
		textAlign: 'right',
		backgroundColor: 'transparent',
		paddingRight: 16,
		fontFamily: Fonts.body
	} as TextStyle,

	finalLabel : {
		fontSize : 18,
		fontWeight: 'bold',
		flex: 1,
		color : 'white',
		alignSelf : 'flex-start',
		backgroundColor: 'transparent',
		fontFamily: Fonts.body
	} as TextStyle,

});