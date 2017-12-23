import { StyleSheet } from 'react-native';
import { Fonts } from "../../constants";
export default StyleSheet.create({
    container: {
        flex: 1,
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
        tintColor: 'white',
        backgroundColor: 'transparent',
    },
    nav_title: {
        width: 200,
        height: 30,
        marginTop: 20,
        backgroundColor: 'transparent',
        resizeMode: 'contain'
    },
    largeText: {
        fontSize: 18,
        color: 'white',
        backgroundColor: 'transparent',
        textAlign: 'center',
        fontFamily: Fonts.body,
        marginTop: 10,
        marginBottom: 10,
    },
    normalText: {
        fontSize: 15,
        color: 'white',
        backgroundColor: 'transparent',
        textAlign: 'center',
        fontFamily: Fonts.body,
        marginTop: 10,
        marginBottom: 10,
    },
    listView: {
        flex: 1,
        paddingLeft: 5,
        paddingRight: 5,
    }
});
//# sourceMappingURL=styles.js.map