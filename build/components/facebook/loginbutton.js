import { LoginManager, LoginButton, AccessToken, GraphRequest, GraphRequestManager } from "react-native-fbsdk";
import * as React from 'react';
import { View, Text, TouchableOpacity, Alert, } from 'react-native';
import { isEmpty } from "../../utility";
import styles from "./styles";
import { GlobalStyles, Colors, Fonts } from "../../constants";
import { UserApi } from 'ucshared';
export class FacebookLogin extends React.Component {
    doFacebookLogin() {
        LoginManager.logInWithReadPermissions(['public_profile']).then((result) => this.onLoginFinished('', result), (error) => this.onLoginFinished(error, null));
    }
    handleFacebookUser(token, fbUser) {
        this.props.app.getCurrentUser().then(session => {
            const userApi = new UserApi();
            userApi.userSignIn3({
                model: {
                    email: fbUser.email,
                    firstName: fbUser.first_name,
                    lastName: fbUser.last_name,
                    sessionId: session.sessionId,
                    facebookUserId: parseInt(fbUser.id),
                    facebookAccessToken: token,
                    is21: true
                }
            }).then(loginResult => {
                if (loginResult.value) {
                    this.props.app.setCurrentUser(loginResult.value.session, () => this.props.onSuccess(loginResult));
                }
                else {
                    this.props.onSuccess(loginResult);
                }
            }, error => Alert.alert('Facebook Login Failed', typeof error === 'string' ? error : JSON.stringify(error)));
        });
    }
    onLoginFinished(error, result) {
        if (error && !isEmpty(error)) {
            alert(error);
        }
        else if (result.isCancelled) {
            alert("Login was cancelled");
        }
        else {
            //alert("Login was successful with permissions: " + result.grantedPermissions);
            alert(result);
            AccessToken.getCurrentAccessToken().then((data) => {
                let accessToken = data.accessToken;
                //alert(accessToken.toString());
                //todo: save access token??
                const infoRequest = new GraphRequest('/me', {
                    accessToken: accessToken,
                    parameters: {
                        fields: {
                            string: 'email,name,first_name,middle_name,last_name'
                        }
                    }
                }, (error, result) => {
                    if (error) {
                        alert('Error fetching data: ' + error.toString());
                    }
                    else {
                        this.handleFacebookUser(accessToken, result);
                    }
                });
                // Start the graph request.
                new GraphRequestManager().addRequest(infoRequest).start();
            });
        }
    }
    render() {
        const useLoginButton = false;
        return React.createElement(View, { style: GlobalStyles.blueButton }, !useLoginButton ? React.createElement(TouchableOpacity, { onPress: () => this.doFacebookLogin() },
            React.createElement(Text, { style: { color: Colors.white, fontFamily: Fonts.body } }, "Sign in with Facebook")) :
            React.createElement(LoginButton, { style: styles.facebookBtn, text: 'eeded', publishPermissions: ["publish_actions"], onLoginFinished: (error, result) => this.onLoginFinished(error, result), onLogoutFinished: () => alert("User logged out") }));
    }
}
//# sourceMappingURL=loginbutton.js.map