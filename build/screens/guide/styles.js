import { Platform, Dimensions, StyleSheet } from 'react-native';
import { Fonts } from "../../constants";
export default StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column'
    },
    background: {
        position: 'absolute',
        right: 0,
        left: 0,
        bottom: 0,
        top: 0,
    },
    viewPager: {
        flex: 1,
    },
    btnCloseContainer: {
        position: 'absolute',
        right: 20,
        top: 20,
    },
    btnNextContainer: {
        position: 'absolute',
        right: 20,
        bottom: 20,
    },
    btnImg: {
        width: 40,
        height: 40,
    },
    guide_container: {
        flex: 1,
        justifyContent: "center",
        alignItems: 'center',
    },
    guide_image: {
        width: Dimensions.get('window').width - 50,
        height: Dimensions.get('window').height / 2 - 50,
        resizeMode: 'center',
    },
    guide_title: {
        fontSize: 16,
        color: 'white',
        marginTop: 10,
        fontFamily: Fonts.body,
    },
    guide_detail: {
        fontSize: 13,
        color: 'white',
        textAlign: 'center',
        marginTop: 20,
        fontFamily: Fonts.body,
    },
    page: {
        width: Dimensions.get('window').width,
    },
    statusBar: {
        height: Platform.OS === 'ios' ? 20 : 0,
    },
    headerLabel: {
        fontSize: 15,
        color: 'white',
        backgroundColor: 'transparent',
        textAlign: 'center',
        fontFamily: Fonts.body,
    },
    forgotBtLabel: {
        fontSize: 15,
        color: 'white',
        backgroundColor: 'transparent',
        textAlign: 'center',
        fontFamily: Fonts.body,
        textDecorationLine: 'underline',
    },
    largeLabel: {
        fontSize: 18,
        color: 'white',
        marginBottom: 10,
        backgroundColor: 'transparent',
        textAlign: 'center'
    },
    normalLabel: {
        fontSize: 15,
        color: 'white',
        backgroundColor: 'transparent',
        fontFamily: Fonts.body,
    },
    descriptionContainer: {
        marginTop: 30,
        marginBottom: 10,
        marginLeft: 30,
        marginRight: 30,
    },
    separator: {
        height: 1,
        backgroundColor: 'rgba(151, 151, 151, 1.0)',
    },
    textInput: {
        fontSize: 14,
        color: 'white',
        height: 35,
        width: Dimensions.get('window').width - 60,
        margin: 5,
        fontFamily: Fonts.body,
    },
    orContainer: {
        alignItems: 'center',
        marginTop: 15,
    },
});
//# sourceMappingURL=styles.js.map