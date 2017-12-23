import * as React from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, } from 'react-native';
import styles from './styles';
import { GlobalStyles } from '../../constants';
import { UserApi } from 'ucshared';
import { FacebookLogin } from "../../components/facebook/loginbutton";
import { handleAuthResult } from "../account/account_index";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Spinner from 'react-native-loading-spinner-overlay';
import { isEmpty } from "../../utility";
export class GuideSignUp extends React.Component {
    constructor(props, context) {
        super(props);
        this.state = {
            mode: "email",
            emailTxt: '',
            passwordTxt: '',
            isLoading: false,
            firstName: '',
            lastName: '',
            conditions: ''
        };
    }
    onChangeEmail(val) {
        if (val !== null) {
            this.setState({ emailTxt: val, mode: "email" });
        }
    }
    handleForgot() {
        this.setState({ isLoading: true }, () => {
            let api = new UserApi();
            api.userResetPassword({
                input: {
                    email: this.state.emailTxt
                }
            }).then(result => {
                this.setState({ isLoading: false });
                Alert.alert('Reset Password', 'Check your email for a link to reset your password.');
            }, error => {
                this.setState({ isLoading: false });
                Alert.alert('Error', 'Check the email and try again.');
            });
        });
    }
    handleSubmitEmail() {
        this.props.gsApp.getCurrentUser().then(currentUser => {
            switch (this.state.mode) {
                case "email":
                    this.setState({ isLoading: true }, () => {
                        const api = new UserApi();
                        api.userSignIn3({
                            model: {
                                email: this.state.emailTxt,
                                password: '',
                                sessionId: currentUser.sessionId
                            }
                        }).then(result => {
                            if (typeof result.message !== 'undefined' && !isEmpty(result.message.match(/exist/gi))) {
                                this.setState({ mode: "signup", isLoading: false });
                            }
                            else if (typeof result.message !== 'undefined' && !isEmpty(result.message.match(/unrecognized/gi))) {
                                this.setState({ mode: "signin", isLoading: false });
                            }
                            else {
                                Alert.alert('Invalid Email', result.message);
                                this.setState({ isLoading: false });
                            }
                        });
                    });
                    break;
                case "signin":
                    this.setState({ isLoading: true }, () => {
                        const api = new UserApi();
                        api.userSignIn3({
                            model: {
                                email: this.state.emailTxt,
                                password: this.state.passwordTxt,
                                is21: true,
                                sessionId: currentUser.sessionId
                            }
                        }).then(result => {
                            if (result.success && result.value && result.value.session) {
                                this.props.gsApp.setCurrentUser(result.value.session, () => this.props.gsApp.goHome());
                            }
                            else {
                                Alert.alert('Sign in error', result.message);
                                this.setState({ isLoading: false });
                            }
                        });
                    });
                    break;
                case "signup":
                    this.setState({ isLoading: true }, () => {
                        const api = new UserApi();
                        api.userSignup3({
                            model: {
                                email: this.state.emailTxt,
                                password: this.state.passwordTxt,
                                firstName: this.state.firstName,
                                lastName: this.state.lastName,
                                is21: true,
                                sessionId: currentUser.sessionId
                            }
                        }).then(result => {
                            if (result.success && result.value && result.value.session) {
                                this.props.gsApp.setCurrentUser(result.value.session, () => this.props.gsApp.goHome());
                            }
                            else {
                                Alert.alert('Sign up error', result.message);
                                this.setState({ isLoading: false });
                            }
                        });
                    });
                    break;
                default:
                    Alert.alert('Invalid mode', this.state.mode);
                    this.setState({ mode: "email" });
                    break;
            }
        });
    }
    renderEmailField() {
        return React.createElement(View, null,
            React.createElement(View, { style: styles.separator }),
            React.createElement(TextInput, { style: styles.textInput, onChangeText: this.onChangeEmail.bind(this), placeholder: "Email", value: this.state.emailTxt, autoCorrect: false, autoCapitalize: "none", editable: !this.state.isLoading, returnKeyType: 'done', placeholderTextColor: 'white', selectionColor: "gray" }));
    }
    maybeRenderPassword() {
        return React.createElement(View, null,
            React.createElement(View, { style: styles.separator }),
            React.createElement(TextInput, { style: styles.textInput, onChangeText: (text) => this.setState({ passwordTxt: text }), placeholder: "Password", value: this.state.passwordTxt, autoCorrect: false, autoCapitalize: "none", editable: !this.state.isLoading, returnKeyType: 'done', placeholderTextColor: 'white', secureTextEntry: true, selectionColor: "gray" }));
    }
    renderNameFields() {
        return React.createElement(View, null,
            React.createElement(View, { style: styles.separator }),
            React.createElement(TextInput, { style: styles.textInput, onChangeText: t => this.setState({ firstName: t }), placeholder: "First name", value: this.state.firstName, autoCorrect: false, autoCapitalize: "none", editable: !this.state.isLoading, returnKeyType: 'next', placeholderTextColor: 'white', selectionColor: "gray" }),
            React.createElement(View, { style: styles.separator }),
            React.createElement(TextInput, { style: styles.textInput, onChangeText: t => this.setState({ lastName: t }), placeholder: "Last name", value: this.state.lastName, autoCorrect: false, autoCapitalize: "none", editable: !this.state.isLoading, returnKeyType: 'next', placeholderTextColor: 'white', selectionColor: "gray" }));
    }
    render() {
        const { mode } = this.state;
        return (React.createElement(View, null,
            React.createElement(Spinner, { visible: this.state.isLoading, textContent: "Loading...", textStyle: { color: '#FFF' } }),
            React.createElement(KeyboardAwareScrollView, { style: styles.container },
                React.createElement(Text, { style: styles.largeLabel }, "GET STARTED!!!"),
                React.createElement(View, { style: styles.descriptionContainer },
                    React.createElement(Text, { style: styles.headerLabel }, "Enter your email address to begin--it's free!")),
                this.renderEmailField(),
                (mode === "signup" || mode === "signin") && this.maybeRenderPassword(),
                (mode === "signup") && this.renderNameFields(),
                React.createElement(View, { style: styles.separator }),
                this.state.mode == "signin" && React.createElement(View, { style: { paddingTop: 16 } },
                    React.createElement(TouchableOpacity, { onPress: this.handleForgot.bind(this), disabled: this.state.isLoading },
                        React.createElement(Text, { style: styles.headerLabel }, "Forgot password?"))),
                React.createElement(TouchableOpacity, { disabled: this.state.isLoading, style: GlobalStyles.redButton, onPress: () => this.handleSubmitEmail() },
                    React.createElement(Text, { style: styles.normalLabel }, this.state.isLoading ? 'Please wait' : 'Continue')),
                !this.state.isLoading && React.createElement(View, null,
                    React.createElement(View, { style: styles.orContainer },
                        React.createElement(Text, { style: styles.normalLabel }, "OR")),
                    React.createElement(FacebookLogin, { app: this.props.gsApp, onSuccess: (result) => handleAuthResult(result) })))));
    }
}
//# sourceMappingURL=faq.js.map