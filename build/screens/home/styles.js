/**
 * UndergroundCellar
 * Copyright @ 2017 by Roderick L.
 * @flow
**/
import { Platform, StyleSheet } from 'react-native';
export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'black',
    },
    background: {
        position: 'absolute',
        right: 0,
        left: 0,
        bottom: 0,
        top: 0,
        resizeMode: "contain"
    },
    list_view: {
        backgroundColor: 'black'
    },
    list_container: {
        flex: 8,
    },
    banner_container: {
        height: 44,
        flexDirection: 'row',
        justifyContent: 'center'
    },
    banner_title: {
        flex: 1,
        fontSize: 16,
        color: 'white',
        left: 10,
        marginTop: 14,
        fontFamily: 'Sofia Pro',
        backgroundColor: 'transparent'
    },
    banner_bt: {
        width: 120,
        height: 30,
        right: 8,
        marginTop: 7,
        justifyContent: 'center',
        borderWidth: 1,
        borderColor: 'white',
        borderRadius: 5,
    },
    banner_bt_title: {
        fontSize: 15,
        color: 'white',
        alignSelf: 'center',
        fontFamily: 'Sofia Pro'
    },
    menu_bt: {
        width: 30,
        height: 40,
    },
    nav_bar_container: {
        height: 64,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    nav_menu_bt: {
        width: 21,
        height: 24,
        marginTop: 25,
        marginLeft: 20,
        resizeMode: 'contain',
        tintColor: 'white'
    },
    nav_title: {
        width: 200,
        height: 30,
        marginTop: 20,
        resizeMode: 'contain'
    },
    statusBar: {
        height: Platform.OS === 'ios' ? 20 : 0,
    }
});
//# sourceMappingURL=styles.js.map