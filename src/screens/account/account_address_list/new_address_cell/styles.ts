import {Dimensions, StyleSheet, TextStyle, ViewStyle, ImageStyle} from 'react-native'
import {Colors, Fonts} from "../../../../constants";

export default StyleSheet.create({
	container : {
		flex : 1,        
        flexDirection : 'row',
        padding : 20,
	} as ViewStyle,
	
    text : {
    	fontSize : 14, 
    	color : Colors.orangeText,
		fontFamily: Fonts.body,
    } as TextStyle,

    icon : {
        width : 20, 
        height : 30,
        resizeMode : 'center',
        position : 'absolute',
        tintColor : Colors.orangeText,
        right : 10,
        top : 15,
    } as ImageStyle,

});