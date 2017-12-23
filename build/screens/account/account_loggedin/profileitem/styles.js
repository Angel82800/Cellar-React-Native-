/**
 * Created by Roderick L
 */
import { Dimensions, StyleSheet } from 'react-native';
import { Fonts } from "../../../../constants";
export default StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
        backgroundColor: 'rgba(57, 57, 57, 1.0)'
    },
    itemContainer: {
        flex: 1,
    },
    nameContainer: {
        flexDirection: 'row',
    },
    nameTitleContainer: {
        width: Dimensions.get('window').width - 100,
    },
    separator: {
        flex: 1,
        height: 1,
        backgroundColor: 'rgba(151, 151, 151, 1.0)',
    },
    text: {
        fontSize: 14,
        color: 'white',
        fontFamily: Fonts.body,
        marginTop: 10,
        marginBottom: 10,
    },
    avatar: {
        width: 60,
        height: 60,
        position: 'absolute',
        right: 0,
        resizeMode: 'contain',
    },
});
//# sourceMappingURL=styles.js.map