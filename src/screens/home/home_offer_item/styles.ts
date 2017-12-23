/**
 * UndergroundCellar
 * Copyright @ 2017 by Roderick L. 
 * @flow
**/

import {Dimensions, StyleSheet, ViewStyle, ImageStyle, TextStyle } from 'react-native'
import {Colors} from "../../../constants";

export default StyleSheet.create({
	container : {
		flex : 1,
		flexDirection : "column",
	} as ViewStyle,
	img_container : {
		flex : 1,
		height : 200,
		resizeMode : 'cover',
	} as ViewStyle,
	feed_body_container : {
		flex : 1,
		flexDirection : 'row'
	} as ViewStyle,
	feed_footer_container : {
		flex : 1,
		flexDirection : "column",
	} as ViewStyle,
	feed_sales_label_container : {
        width: 135,
        height: 29,
        marginTop : 20,
        alignItems : 'center',
        backgroundColor: Colors.redTint,
        flexDirection : 'row'
    } as ViewStyle,
    feed_sales_label: {
        fontSize: 13,
        backgroundColor: 'transparent',
        marginLeft : 5,
        color: 'white',
		fontFamily: 'Sofia Pro'
    } as TextStyle,
	feed_body_bt_container : {
		flexDirection : "column",
		marginTop : 8,
		marginLeft : Dimensions.get('window').width - 200
	} as ViewStyle,
	feed_body_bt_share : {
		width : 44,
		height : 44,
		resizeMode : 'contain',
	} as ImageStyle,
	feed_body_bt_buy : {
		width : 44,
		height : 44,
		marginTop : 2,
		resizeMode :  'contain'
	} as ImageStyle,
	feed_footer_bg : {
		flex : 1,
	} as ViewStyle,
	feed_foot_win_container : {
		flex : 1,
		flexDirection : 'row',
		marginTop : 8,
	} as ViewStyle,
	feed_wine_name : {
		flex : 1,
		fontSize : 17,
		color : 'white',
		marginLeft : 8,
		marginRight : 110,
		backgroundColor : 'transparent',
		fontFamily: 'Sofia Pro'
	} as TextStyle,
	feed_win_price : {
		flex : 1,
		fontSize : 16,
		color : 'white',
		position: 'absolute',
		right : 8,
		backgroundColor : 'transparent',
		fontFamily: 'Sofia Pro'
	} as TextStyle,
	feed_offer_container : {
		flex : 1,
		flexDirection : 'row',
		marginTop : 8,
		marginBottom : 8,
	} as ViewStyle,
	feed_offer_upgrade : {
		flex : 1,
		fontSize : 13, 
		color : 'white',
		position : 'absolute',
		right : 10,
		backgroundColor : 'transparent',
		fontFamily: 'Sofia Pro'
	} as TextStyle,
	feed_offer_desc : {
		flex : 1,
		fontSize : 14,
		color : 'white',
		marginLeft : 8,
		marginRight : 140,
		backgroundColor : 'transparent',
		fontFamily: 'Sofia Pro'
	} as TextStyle
});	