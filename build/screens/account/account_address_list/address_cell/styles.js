import { StyleSheet } from 'react-native';
import { Fonts } from "../../../../constants";
export default StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        padding: 10,
    },
    itemContainer: {
        flex: 1,
        paddingLeft: 10,
    },
    text: {
        marginTop: 10,
        marginBottom: 10,
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
        tintColor: 'white',
        top: 70,
    },
});
//# sourceMappingURL=styles.js.map