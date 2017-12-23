/**
 * UndergroundCellar
 * Copyright @ 2017 by Roderick L.
 * @flow
**/
import { StyleSheet } from 'react-native';
import { Fonts } from "../../../constants";
export default StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
    },
    offer_img: {
        height: 200,
        resizeMode: 'cover',
    },
    offer_body_container: {
        flex: 1,
    },
    offer_footer_container: {
        flex: 1,
    },
    offer_bottle_label: {
        width: 108,
        fontSize: 12,
        backgroundColor: 'green',
        color: 'white',
        marginLeft: 0,
        textAlign: 'center',
        marginTop: 16,
        padding: 6,
        fontFamily: Fonts.body,
        fontWeight: "bold"
    },
    offer_body_bt_container: {},
    offer_body_bt_share: {
        width: 44,
        height: 44,
        resizeMode: 'contain',
    },
    shadow: {
        position: 'absolute',
        left: 0,
        top: 0,
        right: 0,
        height: 40,
        resizeMode: 'stretch',
    },
    offer_description: {
        flex: 1,
        fontSize: 17,
        color: 'white',
        textAlign: 'center',
        backgroundColor: 'transparent',
        margin: 12,
        fontFamily: Fonts.body,
    },
});
//# sourceMappingURL=styles.js.map