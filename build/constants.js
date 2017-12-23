/**
 * UndergroundCellar
 * Copyright @ 2017 by Roderick L.
 * @flow
**/
import { StyleSheet, Dimensions } from 'react-native';
export const APP_URL = 'http://www.undergroundcellar.com';
export const IMAGE_BASE_URL = 'https://www.undergroundcellar.com/offer-img/';
export const WINE_BASE_URL = 'https://www.undergroundcellar.com/wine-img/';
//Texts --------------------------
export const AGE_TERM_TXT = 'I am over 21 years of age and agree to the Terms of Service';
export const SIGNUP_TXT = 'Don\'t have an account?';
export const SIGNUP_TXT_BOLD = ' Sign Up';
export const FORGOT_PASSWORD = 'Forgot Password?';
export const HAVE_AN_ACCOUNT = 'Have an account?';
export const SIGNIN_TXT_BOLD = ' Sign In';
export const Colors = {
    redTint: 'rgba(129, 3, 18, 1.0)',
    black: '#000',
    white: '#fff',
    grayText: '#666',
    orangeText: 'rgba(248, 152, 29, 1.0)',
    navyBlue: '#4267b2'
};
export const Fonts = {
    body: 'Sofia Pro'
};
export const GlobalStyles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    absolute: {
        position: "absolute",
        top: 0, left: 0, bottom: 0, right: 0,
    },
    redButton: {
        borderWidth: 1,
        borderRadius: 5,
        borderColor: Colors.redTint,
        backgroundColor: Colors.redTint,
        width: Dimensions.get('window').width - 40,
        marginTop: 20,
        alignItems: 'center',
        paddingTop: 10,
        paddingBottom: 10,
    },
    blueButton: {
        borderWidth: 1,
        borderRadius: 5,
        borderColor: Colors.navyBlue,
        backgroundColor: Colors.navyBlue,
        marginTop: 13,
        width: Dimensions.get('window').width - 40,
        alignItems: 'center',
        paddingTop: 10,
        paddingBottom: 10,
    },
});
//# sourceMappingURL=constants.js.map