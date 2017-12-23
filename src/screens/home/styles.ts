/**
 * UndergroundCellar
 * Copyright @ 2017 by Roderick L. 
 * @flow
**/

import {Platform, Dimensions, StyleSheet, ViewStyle, ImageStyle, TextStyle } from 'react-native'

export default StyleSheet.create({
	container : {
		flex : 1,
		backgroundColor : 'black',
	} as ViewStyle,
	background : {
		position: 'absolute',
		right : 0,
		left : 0,
		bottom : 0,
		top : 0,
		resizeMode: "contain"
	} as ImageStyle,
	list_view: {
		backgroundColor: 'black'
	} as ViewStyle,
	list_container : {
		flex : 8,
	} as ViewStyle,
	banner_container : {
		height : 44,
		flexDirection : 'row',
		justifyContent : 'center'
	} as ViewStyle,
	banner_title : {
		flex : 1, 
		fontSize : 16,
		color : 'white',
		left : 10,
		marginTop : 14,
		fontFamily: 'Sofia Pro',
		backgroundColor : 'transparent'
	} as TextStyle,
	banner_bt : {
		width : 120,
		height : 30,
		right : 8,
		marginTop : 7,
		justifyContent : 'center',
		borderWidth : 1,
		borderColor : 'white',
		borderRadius : 5,
	} as ViewStyle,
	banner_bt_title : {
		fontSize : 15,
		color : 'white',
		alignSelf : 'center',
		fontFamily: 'Sofia Pro'
	} as TextStyle, 
	menu_bt : {
		width : 30,
		height : 40,
	} as ImageStyle,
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
		tintColor : 'white'
	} as ImageStyle,

	nav_title : {
		width : 200,
		height : 30,
		marginTop : 20,
		resizeMode : 'contain'
	} as ImageStyle,

	statusBar: {
	    height: Platform.OS === 'ios' ? 20 : 0,
	}
});	