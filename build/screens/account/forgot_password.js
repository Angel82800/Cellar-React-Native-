import { View, Text, TouchableOpacity, TextInput } from "react-native";
import * as React from "react";
import { Component } from "react";
import styles from './styles';
import { UserApi } from 'ucshared';
import { isEmpty, validateEmail } from '../../utility';
import Spinner from 'react-native-loading-spinner-overlay';
import { CommonHeading } from "../../components/heading";
export class PasswordRecovery extends Component {
    constructor(props, context) {
        super(props, context);
        this.state = { isLoading: false, emailTxt: '' };
    }
    onBack() {
        if (this.props.navigator) {
            this.props.navigator.pop();
        }
    }
    onSubmit() {
        if (isEmpty(this.getErrorText() || '')) {
            this.setState({ isLoading: true }, () => {
                let api = new UserApi();
                api.userResetPassword({
                    input: {
                        email: this.state.emailTxt
                    }
                }).then(result => {
                    this.setState({ isLoading: false });
                    alert(JSON.stringify(result));
                    this.onBack();
                }, error => {
                    this.setState({ isLoading: false });
                    alert('Hmm, check email');
                    console.log(error);
                });
            });
        }
    }
    getErrorText() {
        if (isEmpty(this.state.emailTxt)) {
            return 'Email is required';
        }
        if (!validateEmail(this.state.emailTxt)) {
            return 'Email is invalid';
        }
        return null;
    }
    render() {
        return (React.createElement(View, { style: styles.container },
            React.createElement(CommonHeading, { title: "Payment Methods", onBack: this.onBack.bind(this) }),
            React.createElement(Spinner, { visible: this.state.isLoading, textContent: "Checking...", textStyle: { color: '#FFF' } }),
            React.createElement(Text, null, "Enter your email address and we will send a link for you to reset your password"),
            React.createElement(TextInput, { placeholder: "Email", onChangeText: (e) => this.setState({ emailTxt: e }), keyboardType: "email-address" }),
            React.createElement(TouchableOpacity, { onPress: this.onSubmit.bind(this) },
                React.createElement(Text, null, this.getErrorText() || 'Send Reset Link'))));
    }
}
//# sourceMappingURL=forgot_password.js.map