import {
	View, Animated, TouchableHighlight, Text, Button, TouchableOpacity, TextInput, ListView,
	TextInputState, findNodeHandle, Navigator, RefreshControl, Alert
} from "react-native";
import * as React from "react";
import {Component} from "react";
import styles from './styles';
import ControlPanel from "../DrawerSideMenu/ControlPanel";
import {FBSDK, LoginManager, LoginButton, LoginResult} from "react-native-fbsdk";
import * as CONSTANTS from '../../constants';
import {App} from "../../App";
import {RouteMap} from "../../routemap";
import Image = Animated.Image;
import {UserApi, UserAuthResultModel, SessionModel, ApiResultUserAuthResultModel} from 'ucshared';
import Spinner from 'react-native-loading-spinner-overlay';
import {CommonHeading} from "../../components/heading";
import store from 'react-native-simple-store';
import {isEmpty} from '../../utility';
import {validateEmail} from '../../utility';
import {GuideSignUp} from '../../screens/guide/guide_signup';
import {FacebookLogin, IFacebookUser} from "../../components/facebook/loginbutton";

export interface AccountState {
	mode: "signin" | "signup" | "email";
	firstName: string;
	lastName: string;
	emailTxt: string;
	passwordTxt: string;
	conditions: string;
	isLoading: boolean;
}

export function handleAuthResult(result: ApiResultUserAuthResultModel) {
	alert(result);
	alert(JSON.stringify(this.props));
	this.setState({isLoading: false});
	if (result.success && result.value) {
		if (result.value.isAuthenticated) {
			this.props.app.setCurrentUser(result.value.session as SessionModel, () => this.props.app.goHome());
		}
		else if (!result.value.emailOk) {
			alert("Check your email");
		}
		else if (!result.value.isAuthenticated) {
			alert("Incorrect email or password");
		}
	} else {
		const errString = result.message || '';
		if (errString.indexOf('email or password') > 0) {
			Alert.alert('Sign-in Error', 'Incorrect email or password');
		}
		else if (errString.includes('doesn')) {
			Alert.alert('Sign-in Error', 'Email address not found');
		}
		else if (errString.includes('character after p')) {
			Alert.alert('Sign-in Error', 'Email address is invalid');
		}
	}
}

export class SignIn extends Component<{ data: any, navigator: Navigator, app: App }, AccountState> {
	private signedIn: boolean;

	/**
	 Focus for textInputs Next keyboard button
	 */
	private nextInput: TextInput;
	private nextInputLastName: TextInput;
	private nextInputEmail: TextInput;


	constructor(props: any, context: any) {
		super(props);
		this.state = {
			mode: 'signin',
			firstName: '',
			lastName: '',
			emailTxt: '',
			passwordTxt: '',
			conditions: CONSTANTS.AGE_TERM_TXT,
			isLoading: false
		};
	}

	componentDidMount() {
		if (this.nextInputEmail) {
			this.nextInputEmail.focus();
		}
	}

	facebookBtnTitle() {
		if (this.signedIn) {
			return 'Continue with Facebook'
		}
		return 'Sign In with Facebook'
	}

	renderAuth() {
		switch (this.state.mode) {
			case 'signin':
				return <View style={styles.guide_container}><GuideSignUp gsApp={this.props.app} /></View>;
			case 'signup':
				return this.renderSignUp();
			default:
				return <View style={styles.guide_container}><GuideSignUp gsApp={this.props.app} /></View>;
		}
	}

	validate() {
		if (isEmpty(this.state.emailTxt) || "") {
			return ('Email field is required')
		} else if (isEmpty(this.state.passwordTxt) || "") {
			return ('Password field is required')
		}
		return '';
	}

	signInBtn() {
		const error = this.validate();
		if (!isEmpty(error)) {
			alert(error);
			return;
		}
		this.setState({isLoading: true}, () => {
			const api = new UserApi();
			api.userSignIn3({
				model: {
					email: this.state.emailTxt,
					password: this.state.passwordTxt,
					sessionId: this.props.app.getCurrentUserId()
				}
			}).then(
				(result: ApiResultUserAuthResultModel) => handleAuthResult(result),
				(err) => Alert.alert("Error", "Server error, please try again later. " + JSON.stringify(err)));
		});
	}

	signUpBtn() {
		if (isEmpty(this.state.emailTxt)) {
			alert('Email is required')
		} else if (isEmpty(this.state.passwordTxt)) {
			alert('Password is required')
		} else if (!validateEmail(this.state.emailTxt)) {
			alert('not a valid email')
		} else if (isEmpty(this.state.firstName)) {
			alert('First name is required')
		}
		else if (isEmpty(this.state.lastName)) {
			alert('Last Name is required')
		}
		else {
			this.callSignUp()
		}
	}

	callSignUp() {
		let api = new UserApi();
		this.setState({isLoading: true}, () => {
			api.userSignup3({
				model: {
					email: this.state.emailTxt,
					password: this.state.passwordTxt,
					firstName: this.state.firstName,
					lastName: this.state.lastName,
					sessionUtmSource: 'app',
					sessionUtmMedium: 'app',
					sessionUtmCampaign: 'app',
					is21: true
				}
			}).then((result: ApiResultUserAuthResultModel) => {
				this.setState({isLoading: false});
				if (!result.success) {
					this.setState({isLoading: false});
					if ((result.message || '').includes('already')) {
						Alert.alert('Signup Error', 'Email address already exists. Please sign in instead.');
					}
					else {
						Alert.alert('Signup Error', 'Error signing up, please check your inputs or try again later.');
					}
				}
			}, err => {
				Alert.alert("Error", "Server error, please try again later. " + JSON.stringify(err));
			});
		});
	}

	onBack() {
		let route = RouteMap.Home;
		if (!this.props.navigator) {
			alert('Can\'t go back');
			return;
		}
		this.props.navigator.pop();
	}

	//field for both sign In and sign up view
	emailInput() {
		return <View>
			<TextInput
				style={styles.textinput}
				onChangeText={(emailTxt) => this.setState({emailTxt: emailTxt})}
				placeholder={"Email"}
				value={this.state.emailTxt}
				autoCorrect={false}
				autoCapitalize="none"
				editable={!this.state.isLoading}
				returnKeyType={'done'}
				placeholderTextColor='#b0b0b0'
				selectionColor="gray"/>
		</View>;
	}

	//field for both sign In and sign up view
	passwordInput(type: string) {
		return (
			<TextInput
				ref={nextInput => this.nextInput = nextInput}
				style={styles.textinput}
				placeholder="Password"
				placeholderTextColor='#b0b0b0'
				onChangeText={(passwordTxt) => this.setState({passwordTxt: passwordTxt})}
				value={this.state.passwordTxt}
				returnKeyType={'go'}
				onSubmitEditing={() => {
					if (type.indexOf('signin'.toLowerCase()) > -1) {
						this.signInBtn()
					} else {
						this.signUpBtn()
					}
				}}
				secureTextEntry={true}
				selectionColor="gray"
			/>
		)
	}

	//Signin mode: deprecated
	// renderSignIn() {
	// 	return (
	// 		<View style={styles.container}>
	// 			<Image style={styles.backgroundImage} source={require('../../../img/gradientBottom.jpg')}/>
	// 			<CommonHeading title="Sign in" onBack={this.onBack.bind(this)}/>
	// 			<View style={{alignItems: 'center'}}>
	// 				<FacebookLogin app={this.props.app} onSuccess={(result) => this.handleAuthResult(result)} />
	// 				<View>
	// 					<View style={styles.cell}>
	// 						<Text style={styles.title}>
	// 							OR
	// 						</Text>
	// 					</View>
	// 					<View style={styles.separator}/>
	// 				</View>
	//
	// 				{this.emailInput()}
	//
	// 				<View style={styles.separator}/>
	// 				{/*<Text style={styles.textHint}>*/}
	// 				{/*Password*/}
	// 				{/*</Text>*/}
	// 				{this.passwordInput('signin')}
	//
	// 				<View style={styles.separator}/>
	// 				<Text style={styles.textSmall}>
	// 					{this.state.conditions}
	// 				</Text>
	// 				<TouchableOpacity onPress={() => this.signInBtn()} style={styles.login_bt}>
	// 					{this.state.isLoading ?
	// 						<Text style={styles.login_btn_txt}>One sec...</Text> :
	// 						<Text style={styles.login_btn_txt}>Sign In</Text> }
	// 				</TouchableOpacity>
	// 				<TouchableOpacity onPress={() => this.setState({mode: 'signup'})
	// 				}>
	// 					<Text style={styles.textMedium}>
	// 						{CONSTANTS.SIGNUP_TXT}
	// 						<Text style={styles.textMediumBold}>
	// 							{CONSTANTS.SIGNUP_TXT_BOLD}
	// 						</Text>
	// 					</Text>
	// 				</TouchableOpacity>
	// 				<TouchableOpacity onPress={() => this.props.navigator.push(RouteMap.PasswordRecovery)}>
	// 					<Text style={styles.textMediumBold}>
	// 						{CONSTANTS.FORGOT_PASSWORD}
	// 					</Text>
	// 				</TouchableOpacity>
	// 			</View>
	// 		</View>
	// 	)
	// }

	renderSignUp = () => {
		return (
			<View style={styles.container}>
				<Image style={styles.backgroundImage} source={require('../../../img/gradientBottom.jpg')}/>
				<CommonHeading title="Sign up" onBack={this.onBack.bind(this)}/>
				<View style={{alignItems: 'center'}}>
					<FacebookLogin app={this.props.app} onSuccess={(result) => handleAuthResult(result)} />
					<View>
						<View style={styles.cell}>
							<Text style={styles.title}>
								OR
							</Text>
						</View>
						<View style={styles.separator}/>
					</View>
					<TextInput
						style={styles.textinput}
						onChangeText={(firstName) => this.setState({firstName: firstName})}
						value={this.state.firstName}
						placeholder={'First name'}
						autoCorrect={false}
						placeholderTextColor='#b0b0b0'
						returnKeyType={'next'}
						onSubmitEditing={() => {
							this.nextInputLastName.focus()
						}}
					/>
					<View style={styles.separator}/>
					<TextInput
						ref={nextInput2 => this.nextInputLastName = nextInput2}
						style={styles.textinput}
						onChangeText={(lastName) => this.setState({lastName: lastName})}
						value={this.state.lastName}
						placeholder={'Last name'}
						autoCorrect={false}
						placeholderTextColor='#b0b0b0'
						returnKeyType={'next'}
						onSubmitEditing={() => {
							this.nextInputEmail.focus()
						}}
					/>
					<View style={styles.separator}/>

					{this.emailInput()}

					<View style={styles.separator}/>
					{this.passwordInput('signup')}

					<View style={styles.separator}/>
					<Text style={styles.textSmall}>
						{this.state.conditions}
					</Text>
					<TouchableOpacity onPress={() => this.signUpBtn()} style={styles.login_bt}>
						<Text style={styles.login_btn_txt}>
							Sign Up
						</Text>
					</TouchableOpacity>
					<TouchableOpacity onPress={() => this.setState({mode: 'signin'}) }>
						<Text style={styles.textMedium}>
							{CONSTANTS.HAVE_AN_ACCOUNT}
							<Text style={styles.textMediumBold}>
								{CONSTANTS.SIGNIN_TXT_BOLD}
							</Text>
						</Text>

					</TouchableOpacity>
				</View>
			</View>
		)
	}

	render() {
		return <View>
			<Spinner visible={this.state.isLoading} textContent={"Loading..."} textStyle={{color: '#FFF'}}/>
			{this.renderAuth()}
			</View>;
	}

}