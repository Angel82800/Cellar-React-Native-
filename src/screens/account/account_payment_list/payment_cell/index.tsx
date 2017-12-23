import React, {Component, PropTypes} from 'react';
import {
	View,
	Image,
	Text,
	TouchableOpacity, Alert,
} from 'react-native';

import styles from './styles';
import {ApiBillingModelWithAuthnet, ApiBillingModelWithCardNumber, PaymentApi} from 'ucshared';
import {App} from "../../../../App";

export class PaymentCell extends React.Component<{ app: App, payment: ApiBillingModelWithAuthnet | ApiBillingModelWithCardNumber }, any> {

	constructor(props, context) {
		super(props, context);
	}

	deletePayment() {
		Alert.alert('Delete Payment', 'Are you sure you want to delete this payment?', [
			{
				text: 'Delete',
				onPress: () => {
					const api = new PaymentApi();
					api.paymentSessionDeletePayment({
						sessionId: this.props.app.getCurrentUserId(),
						paymentProfileId: this.props.payment.id || ''
					}).then(() => {

						// reload
						this.props.app.getCurrentUser().then(user =>
							this.props.app.setCurrentUser(user));

						this.props.app.goBack();

					});
				},
				style: "destructive"
			},
			{
				text: 'Cancel',
				style: "cancel"
			}
		]);
	}

	render() {
		let payment = this.props.payment;
		return (
			<View style={styles.container}>
				<View style={styles.itemContainer}>
					<Text style={styles.text}>
						{payment.firstName + " " + payment.lastName}
					</Text>
					<Text style={styles.text}>
						{payment.cardType} {payment.cardNumber}
					</Text>
					<Text style={styles.text}>
						Expires {payment.expiryMonth}/{payment.expiryYear}
					</Text>
				</View>
				<View style={{marginTop: 10, flexDirection: 'row', justifyContent: 'space-between',}}>
					<View/>
					<TouchableOpacity style={styles.btContainer} onPress={this.deletePayment.bind(this)}>
						<Text style={styles.text1}>
							Delete
						</Text>
					</TouchableOpacity>

				</View>
			</View>
		);
	}
}
