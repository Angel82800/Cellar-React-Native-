import { Dimensions, StyleSheet } from 'react-native';
export default StyleSheet.create({
    container: {
        paddingLeft: 20,
        paddingRight: 20,
        backgroundColor: 'rgba(57, 57, 57, 1.0)',
    },
    text: {
        padding: 10,
        fontSize: 14,
        height: 35,
        color: 'white',
        backgroundColor: 'transparent',
    },
    exp_date_container: {
        flexDirection: 'row'
    },
    monthContainer: {
        width: Dimensions.get('window').width / 2 - 40,
    },
    yearContainer: {
        width: Dimensions.get('window').width / 2 - 40,
        position: 'absolute',
        right: 0,
    },
    separator: {
        height: 1,
        backgroundColor: 'rgba(151, 151, 151, 1.0)',
    },
});
//# sourceMappingURL=styles.js.map