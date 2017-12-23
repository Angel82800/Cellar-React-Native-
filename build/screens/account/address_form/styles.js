import { Dimensions, StyleSheet } from 'react-native';
export default StyleSheet.create({
    container: {
        paddingLeft: 20,
        paddingRight: 20,
        backgroundColor: 'rgba(57, 57, 57, 1.0)',
    },
    itemContainer: {},
    text: {
        padding: 10,
        fontSize: 14,
        height: 35,
        color: 'white',
        backgroundColor: 'transparent',
    },
    state_zip_container: {
        flexDirection: 'row'
    },
    stateContainer: {
        width: Dimensions.get('window').width / 2 - 40,
    },
    state_bt_title_container: {
        flexDirection: 'row',
    },
    state_drop_icon: {
        width: 30,
        height: 30,
        resizeMode: 'center',
        position: 'absolute',
        top: 3,
        right: 0,
    },
    zipContainer: {
        width: Dimensions.get('window').width / 2 - 40,
        position: 'absolute',
        right: 0,
    },
    separator: {
        height: 1,
        backgroundColor: 'rgba(151, 151, 151, 1.0)',
    },
    pickerViewContainer: {
        position: 'absolute',
        bottom: 0,
    },
});
//# sourceMappingURL=styles.js.map