import {Dimensions, StyleSheet, TextStyle, ViewStyle, ImageStyle} from 'react-native'
import {Colors, Fonts} from "../../../../constants";

export default StyleSheet.create({
	container : {
		flex : 1,        
        padding : 10,
	} as ViewStyle,

    itemContainer : {
        flex : 1,
        paddingLeft : 10,
    } as ViewStyle,
	
    text : {
        marginTop : 10,
        marginBottom : 10,
    	fontSize : 15, 
    	color : 'white',
		fontFamily: Fonts.body,
    } as TextStyle,

    text1 : {
        paddingLeft : 40,
        paddingRight : 40,
        paddingTop : 10,
        paddingBottom : 10,
        fontSize : 14, 
        color : 'white',

        fontFamily: Fonts.body,
    } as TextStyle,

    btContainer : {
        backgroundColor : 'rgba(57, 57, 57, 1.0)',
    } as ViewStyle,

});