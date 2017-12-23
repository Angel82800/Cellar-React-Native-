import {
    View, Animated, Text, TouchableOpacity, TextInput
} from "react-native";
import * as React from "react";
import {Component, isValidElement} from "react";
import styles from './styles';
import Image = Animated.Image;
import {UserApi} from 'ucshared';
import {isEmpty, validateEmail} from '../../utility';
import Spinner from 'react-native-loading-spinner-overlay';
import {CommonHeading} from "../../components/heading";

export class PasswordRecovery extends Component<{navigator: any }, {isLoading: boolean, emailTxt: string}> {

	constructor(props, context) {
		super(props, context);
		this.state = {isLoading: false, emailTxt: ''};
	}

	onBack() {
		if (this.props.navigator) {
			this.props.navigator.pop();
		}
	}

	onSubmit() {
		if (isEmpty(this.getErrorText() || '')) {
			this.setState({isLoading: true}, () => {
				let api = new UserApi();
				api.userResetPassword({
					input: {
						email: this.state.emailTxt
					}
				}).then(result => {
					this.setState({isLoading: false});
					alert(JSON.stringify(result));
					this.onBack();
				}, error => {
					this.setState({isLoading: false});
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
        return (
            <View style={styles.container}>
				<CommonHeading title="Payment Methods" onBack={this.onBack.bind(this)} />

				<Spinner visible={this.state.isLoading} textContent={"Checking..."} textStyle={{color: '#FFF'}} />

				<Text>Enter your email address and we will send a link for you to reset your password</Text>

				<TextInput
					placeholder="Email"
					onChangeText={(e: string) => this.setState({emailTxt: e})}
					keyboardType="email-address"
				/>

				<TouchableOpacity onPress={this.onSubmit.bind(this)}>
					<Text>{this.getErrorText() || 'Send Reset Link'}</Text>
				</TouchableOpacity>
            </View>
        )
    }
}
