import { StyleSheet } from 'react-native';
import { Fonts, Colors } from "../../../../constants";
export default StyleSheet.create({
    container: {
        flex: 1,
        padding: 8,
        flexDirection: 'row',
        backgroundColor: 'transparent',
    },
    containerEmptyHeader: {
        flex: 1,
        padding: 0,
        backgroundColor: 'transparent',
    },
    textSmall: {
        fontSize: 12,
        color: 'white',
        marginTop: 3,
        fontFamily: Fonts.body,
    },
    textLarge: {
        fontSize: 19,
        color: Colors.orangeText,
        fontFamily: Fonts.body,
        marginLeft: 10,
    },
});
//# sourceMappingURL=styles.js.map