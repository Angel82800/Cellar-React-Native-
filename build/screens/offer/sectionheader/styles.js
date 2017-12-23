import { StyleSheet } from 'react-native';
import { Fonts } from "../../../constants";
export default StyleSheet.create({
    container: {
        flex: 1,
        padding: 8,
        justifyContent: 'center',
        backgroundColor: 'rgba(37, 37, 37, 1.0)',
    },
    containerEmptyHeader: {
        flex: 1,
        padding: 0,
        justifyContent: 'center',
        backgroundColor: 'rgba(37, 37, 37, 1.0)',
    },
    textSmall: {
        fontSize: 15,
        color: 'white',
        textAlign: 'center',
        fontFamily: Fonts.body
    }
});
//# sourceMappingURL=styles.js.map