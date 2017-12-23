import { Dimensions, StyleSheet } from 'react-native';
import { Fonts } from "../../constants";
export default StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: 'black',
    },
    controlText: {
        color: 'white',
        fontFamily: Fonts.body
    },
    facebookBtn: {
        height: 35,
        width: Dimensions.get('window').width - 50,
        marginTop: 10,
        marginBottom: 10,
        // paddingLeft: 30,
        // paddingRight: 30,
        justifyContent: 'flex-start',
    },
});
//# sourceMappingURL=styles.js.map