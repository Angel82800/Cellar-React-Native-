import { Dimensions, StyleSheet } from 'react-native';
export default StyleSheet.create({
    container: {
        flex: 1,
    },
    background: {
        flex: 1,
        resizeMode: 'cover'
    },
    buttonContainer: {
        width: Dimensions.get('window').width,
        position: 'absolute',
        bottom: 30,
        alignItems: 'center',
    },
    btTitle: {
        fontSize: 18,
        color: 'white',
    },
});
//# sourceMappingURL=styles.js.map