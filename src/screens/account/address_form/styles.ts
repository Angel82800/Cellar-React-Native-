import {Dimensions, StyleSheet, TextStyle, ViewStyle, ImageStyle} from 'react-native'

export default StyleSheet.create({
	container : {
        paddingLeft : 20,
        paddingRight : 20,
        backgroundColor : 'rgba(57, 57, 57, 1.0)',
	} as ViewStyle,

    itemContainer : {
    } as ViewStyle,
	
    text : {
        padding : 10,
    	fontSize : 14, 
        height : 35,
    	color : 'white',
        backgroundColor: 'transparent',
    },

    state_zip_container : {
        flexDirection : 'row'
    } as ViewStyle,

    stateContainer : {
        width : Dimensions.get('window').width / 2 - 40,
    } as ViewStyle,

    state_bt_title_container : {
        flexDirection : 'row',
    } as ViewStyle,

    state_drop_icon : {
        width : 30, 
        height : 30,
        resizeMode : 'center',
        position : 'absolute',
        top : 3,
        right : 0,
    } as ImageStyle,

    zipContainer : {
        width : Dimensions.get('window').width / 2 - 40,
        position : 'absolute',
        right : 0,
    } as ViewStyle,

    separator : {
        height : 1,
        backgroundColor : 'rgba(151, 151, 151, 1.0)',
    } as ViewStyle,

    pickerViewContainer : {
        position : 'absolute',
        bottom : 0,
    } as ViewStyle,
})