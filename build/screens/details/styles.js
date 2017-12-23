/**
 * UndergroundCellar
 * Copyright @ 2017 by Roderick L.
 * @flow
**/
import { Platform, StyleSheet } from 'react-native';
import { Colors, Fonts } from "../../constants";
const tabFontSize = 14;
export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000000'
    },
    nav_bar_container: {
        height: (Platform.OS === 'ios') ? 64 : 54,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    nav_bar_container_space: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginLeft: 20
    },
    nav_menu_bt: {
        width: 25,
        height: 25,
        marginLeft: 20,
        resizeMode: 'contain',
        tintColor: 'white',
    },
    touchable_container: {
        marginTop: 20,
    },
    nav_title: {
        fontSize: 16,
        color: 'white',
        marginRight: 40,
        alignSelf: 'center',
        backgroundColor: 'transparent',
    },
    tabBarView: {
        flexDirection: 'row',
    },
    tab_line: {
        width: 2,
        backgroundColor: 'white',
        marginTop: 20,
        marginBottom: 20,
    },
    tabBar: {
        flex: 1,
    },
    tab_active_line: {
        flexGrow: 1,
        backgroundColor: Colors.orangeText,
        height: 1,
        marginTop: 10,
    },
    tab_active_title: {
        marginTop: 20,
        alignSelf: 'center',
        color: Colors.orangeText,
        backgroundColor: 'transparent',
        fontSize: tabFontSize,
        fontFamily: Fonts.body,
    },
    tab_inactive_line: {
        flexGrow: 1,
        backgroundColor: 'rgba(151, 151, 151, 1.0)',
        height: 1,
        marginTop: 10,
    },
    tab_inactive_title: {
        marginTop: 20,
        alignSelf: 'center',
        color: 'white',
        backgroundColor: 'transparent',
        fontSize: tabFontSize,
        fontFamily: Fonts.body,
    },
    buy_bt_container: {
        alignItems: 'center',
        backgroundColor: 'rgba(129, 3, 18, 1.0)',
        bottom: 0,
    },
    login_bt: {
        fontSize: 20,
        color: 'white',
        textAlign: 'center',
        paddingTop: 15,
        paddingBottom: 15,
        justifyContent: 'center',
        fontFamily: Fonts.body,
    },
    mainView: {
        flex: 1,
    },
    statusBar: {
        height: Platform.OS === 'ios' ? 20 : 0,
    },
    background: {
        position: 'absolute',
        right: 0,
        left: 0,
        bottom: 0,
        top: 0,
    },
});
//# sourceMappingURL=styles.js.map