/**
 * Created by Denis Smirnov on 05/05/2017.
 */

/**
 * UndergroundCellar
 * Copyright @ 2017 by Roderick L.
 * @flow
 **/

import {Platform, Dimensions, StyleSheet, ViewStyle, ImageStyle, TextStyle, TextInput} from 'react-native';
import {Fonts} from "../../constants";

export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#252525'
    },
    guide_container : {
        flex : 1,
        alignItems : 'center',
        backgroundColor: '#252525'
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
        height : ((Platform.OS === 'ios') ? 64 : 54),
        width: Dimensions.get('window').width,
        flexDirection : 'row',
        backgroundColor:'black',
    } as ViewStyle,
    titleContainer : {
        height : ((Platform.OS === 'ios') ? 64 : 54),
        width: Dimensions.get('window').width,
        flexDirection : 'row',
        backgroundColor:'black',
    } as ViewStyle,
    touchable_container : {
        marginLeft:20,
        marginTop : 20,
    },
    nav_title : {
        marginTop : 20,
        marginRight : 20,
        paddingLeft: Dimensions.get('window').width/2 - 70 ,

        color:'white',
        fontSize:16,
    } as TextStyle,
    nav_menu_bt : {
        width : 16,
        height : 16,
        resizeMode : 'contain',
        tintColor : 'white',
        alignSelf:'flex-start',
    } as ImageStyle,
    cell: {
        paddingTop:10,
        height: 30,
        justifyContent: 'center',
        paddingLeft: 30,
        paddingRight: 30,
    },
    screenView: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
        backgroundColor: '#ffffff',
        justifyContent: 'center',
    } as TextStyle,
    separator: {
        height: 1,
        width: Dimensions.get('window').width - 50,
        paddingLeft: 20,
        paddingRight: 20,
        marginTop :15,
        marginBottom:5,
        backgroundColor: '#636363'
    } as TextStyle,
    textHint: {
        paddingLeft: 25,
        marginTop:10,
        fontSize: 12,
        color: '#b0b0b0',
        alignSelf:'flex-start'

    } as TextStyle,
    textinput: {
        fontSize : 14,
        color : 'white',
        height : 35,
        width : Dimensions.get('window').width - 60,
        margin : 5,
        fontFamily: Fonts.body
    },
    title: {
        fontSize: 15,
        color: '#b0b0b0',
        alignSelf:'center',
        justifyContent : 'center',
        backgroundColor: 'transparent',
    } as TextStyle,

    textSmall: {
        // paddingLeft: 25,
        marginTop:10,
        fontSize: 9,
        color: '#b0b0b0',
        alignSelf:'center',
        backgroundColor: 'transparent',
    } as TextStyle,

    login_bt : {
        width : Dimensions.get('window').width - 50,
        height : 35,
        backgroundColor : '#96251d',
        marginTop : 20,
        paddingTop : 15,
        paddingBottom : 15,
        borderRadius:5,
        justifyContent : 'center',
    } as TextStyle,

    login_btn_txt : {
        fontSize : 15,
        color:'white',
        borderRadius:5,
        justifyContent : 'center',
        alignSelf:'center',
        backgroundColor: 'transparent',
    } as TextStyle,

    textMedium: {
        paddingTop:10,
        fontSize: 14,
        color: '#c9c9c9',
        alignSelf:'center',
        backgroundColor: 'transparent',
    } as TextStyle,

    textMediumBold: {
    paddingTop:10,
        fontSize: 14,
        fontWeight:'bold',
        color: '#c9c9c9',
        alignSelf:'center',
        backgroundColor: 'transparent',
    } as TextStyle,

    mainView: {
        flex: 1,
    } as ViewStyle,
    listviewSeparator : {
        height: 1,
        width: Dimensions.get('window').width,
        backgroundColor : 'rgba(151, 151, 151, 1.0)',
    } as ViewStyle,

    listViewContainer : {
        flex : 1,
        backgroundColor : 'rgba(37, 37, 37, 1.0)',
        paddingLeft : 10,
    } as ViewStyle,

});