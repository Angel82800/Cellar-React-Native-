import {Dimensions, StyleSheet, TextStyle, ViewStyle, ImageStyle} from 'react-native'
import {Colors, Fonts} from "../../../../constants";

export default StyleSheet.create({
	container : {
		flex : 1,        
        flexDirection : 'row',
        padding : 10,
	} as ViewStyle,

    itemContainer : {
        flex : 1,
        paddingLeft : 10,
    } as ViewStyle,
	
    text : {
        marginTop : 10,
        marginBottom : 10,
    	fontSize : 14, 
    	color : 'white',
		fontFamily: Fonts.body,
    } as TextStyle,

    icon : {
        width : 20, 
        height : 30,
        resizeMode : 'center',
        position : 'absolute',
        right : 10,
        tintColor : 'white',
        top : 70,
    } as ImageStyle,

});