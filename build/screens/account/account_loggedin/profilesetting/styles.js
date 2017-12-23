import { StyleSheet } from 'react-native';
import { Fonts } from "../../../../constants";
export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'rgba(57, 57, 57, 1.0)',
    },
    itemContainer: {
        flex: 1,
        flexDirection: 'row',
        padding: 10,
    },
    text: {
        fontSize: 14,
        color: 'white',
        fontFamily: Fonts.body,
    },
    icon: {
        width: 20,
        height: 30,
        resizeMode: 'center',
        position: 'absolute',
        right: 10,
    },
    rightText: {
        fontSize: 14,
        color: 'white',
        position: 'absolute',
        right: 10,
        top: 10,
    },
});
//# sourceMappingURL=styles.js.map