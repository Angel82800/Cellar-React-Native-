import { StyleSheet } from 'react-native';
import { Colors, Fonts } from "../../../../constants";
export default StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        padding: 20,
    },
    text: {
        fontSize: 14,
        color: Colors.orangeText,
        fontFamily: Fonts.body,
    },
    icon: {
        width: 20,
        height: 30,
        resizeMode: 'center',
        position: 'absolute',
        tintColor: Colors.orangeText,
        right: 10,
        top: 15,
    },
});
//# sourceMappingURL=styles.js.map