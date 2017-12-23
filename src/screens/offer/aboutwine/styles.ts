import {StyleSheet, ViewStyle} from 'react-native';
import {Fonts} from "../../../constants";

export default StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
    } as ViewStyle,

    content: {
        flex: 1,
        marginTop: 8,
        marginBottom: 8,
        marginLeft: 20,
        marginRight: 20,
        color: 'white',
        fontFamily: Fonts.body,
    } as ViewStyle
});