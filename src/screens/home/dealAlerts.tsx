import * as React from 'react';
import {
	View,
	Image,
	Text,
	findNodeHandle,
	TouchableOpacity, Alert,AsyncStorage
} from 'react-native';
import styles from '../guide/styles';
import {GlobalStyles} from '../../constants';
import {App} from "../../App";
import {BlurView} from 'react-native-blur';
import {isEmpty} from "../../utility";
import {SessionApi} from 'ucshared';
import {CommonHeading} from "../../components/heading";
import PushNotification from 'react-native-push-notification';
import DeviceInfo from 'react-native-device-info';

export class GuideDealAlerts extends React.Component<{app: App, glass?: boolean}, { viewRef: null | number }> {

	constructor(props: any, context: any) {
		super(props);
		this.state = {
			viewRef: null,
		};
	}

	backgroundImage: Image;

	componentDidMount() {

	}

	imageLoaded() {
		this.setState({viewRef: findNodeHandle(this.backgroundImage)});
	}

	appToken(): string { return this.props.app.state.pushToken || ''; }

	gotToken(udid) {
		if (!this.props.app) {
			Alert.alert('Error', 'Please contact support@undergroundcellar.com with this message: this.props.app is null');
			return;
		}

		if (isEmpty(udid)) {
			Alert.alert('Setting needed', 'Please open your device Settings and enable Push Notifications for this app.');
			return;
		}

		//then call api to bind it to the user
		const api = new SessionApi();
		console.log(this.props.app.getCurrentUserId());
		api.sessionHandleEnrollApplePush({
			sessionId: this.props.app.getCurrentUserId(),
			model: {
				deviceToken: udid,
				entryPoint: 'RnHome'
			}
		}).then(result => {
			this.props.app.getCurrentUser().then(user =>
				PushNotification.localNotification({
					title: `Woohoo ${user.sessionUserFname || ''}!`, // (optional, for iOS this is only used in apple watch, the title will be the app name on other iOS devices)
					message: "You've signed up for Underground Cellar DEAL ALERTS.  You'll be among the first to know " +
					"about our most exciting wine deals before anyone else.", // (required)
					playSound: false, // (optional) default: true
					soundName: 'default', // (optional) Sound to play when the notification is shown. Value of 'default' plays the default sound. It can be set to a custom sound such as 'android.resource://com.xyz/raw/my_sound'. It will look for the 'my_sound' audio file in 'res/raw' directory and play it. default: 'default' (default sound is played)
					number: '1', // (optional) Valid 32 bit integer specified as string. default: none (Cannot be zero)
				})
			);
		}, err => {
			console.log(err);
			Alert.alert("Error", "Failed to enroll user for push notifications");
		});
	}

	getAlerts() {
		
		let tokenCallback = (token: string) => {
			this.setState({deviceToken: token} as any);
		};
		var udid = DeviceInfo.getUniqueID();
		console.log(udid);
		this.gotToken(udid);
		
		PushNotification.configure({

			onRegister: function(token) {
				tokenCallback(token);
			},

			// (required) Called when a remote or local notification is opened or received
			onNotification: function(notification) {
				console.log( 'NOTIFICATION:', notification );
			},

			// ANDROID ONLY: GCM Sender ID (optional - not required for local notifications, but is need to receive remote push notifications)
			senderID: "",

			// IOS ONLY (optional): default: all - Permissions to register.
			permissions: {
				alert: true,
				badge: true,
				sound: true
			},

			// Should the initial notification be popped automatically
			// default: true
			popInitialNotification: true,

			/**
			 * (optional) default: true
			 * - Specified if permissions (ios) and token (android and ios) will requested or not,
			 * - if not, you must call PushNotificationsHandler.requestPermissions() later
			 */
			requestPermissions: true,
		});
		this.props.app.setState({showDealAlertsOverlay: false});
		this.setData();
	}

	async setData(){//Shopping
        try {
                await AsyncStorage.setItem("login","1") ;
            }catch(error){
                alert(error);
            }
    }

	skip() {
		this.props.app.setState({showDealAlertsOverlay: false});
	}

	or() {
		return <View style={styles.orContainer}>
			<Text style={styles.normalLabel}>
				OR
			</Text>
		</View>;
	}

	choice(text: string, callback: Function) {
		return <TouchableOpacity style={GlobalStyles.redButton} onPress={callback.bind(this)}>
			<Text style={styles.normalLabel}>
				{text}
			</Text>
		</TouchableOpacity>;
	}

	render() {
		return (
			<View style={GlobalStyles.absolute}>
				<Image
					ref={(img) => {
						this.backgroundImage = img;
					}}
					source={require('../../../img/nav_gradient.jpg')}
					style={GlobalStyles.absolute}
					onLoadEnd={this.imageLoaded.bind(this)}
				/>
				{!!this.state.viewRef && <BlurView
					style={GlobalStyles.absolute}
					viewRef={this.state.viewRef}
					blurType="dark"
					blurAmount={5}
				/>}
				<CommonHeading
					title="Get Deal Alerts"
					onBack={() => {}}
					actionText="X"
					onAction={this.skip.bind(this)}
				/>
				<View style={{flex: 1, alignItems: 'center', paddingTop: 72}}>
					{/*<Text style={styles.largeLabel}>*/}
						{/*Get Notifications*/}
					{/*</Text>*/}
					<View style={styles.descriptionContainer}>
						<Text style={styles.headerLabel}>
							Never miss out on our best deals by getting alerts before anyone else.
						</Text>
					</View>
					<View style={styles.descriptionContainer}>
						<Text style={styles.headerLabel}>
							Click OK to get started!
						</Text>
					</View>
					{this.choice('OK', this.getAlerts.bind(this))}
					{/*{this.or()}*/}
					{/*{this.choice('Skip', this.skip.bind(this))}*/}
				</View>
			</View>
		);
	}
}