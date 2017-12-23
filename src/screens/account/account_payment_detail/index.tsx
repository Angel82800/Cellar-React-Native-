import {
	View, Animated, TouchableHighlight, Text, Button, TouchableOpacity, TextInput, ListView,
	TextInputState, findNodeHandle,
	ListViewDataSource, Alert, ActivityIndicator
} from "react-native";
import * as React from "react";
import {Component} from "react";
import {Spinner} from "react-native-loading-spinner-overlay";
import styles from './styles';
import {App, NaviPageProps} from "../../../App";
import Image = Animated.Image;
import {AddressApi, AddressModelResponse, NhAddressModel, ApiBillingModelWithCardNumber, PaymentApi} from 'ucshared';
import {isEmpty} from "../../../utility";
import {CommonHeading} from "../../../components/heading";
import {AddressDetailState, AddressForm} from "../address_form";
import {SectionHeader} from './sectionheader';
import {ButtonHeader} from './button_header';
import {PaymentDetailState, PaymentForm} from '../payment_form';
import {KeyboardAwareListView} from 'react-native-keyboard-aware-scroll-view';

export interface PaymentDetailProps extends NaviPageProps {
}

export class PaymentDetailPage extends Component<PaymentDetailProps, PaymentDetailState> {

	constructor(props: PaymentDetailProps, context: any) {

		super(props, context);

		this.state = new PaymentDetailState();
	}

	componentDidMount() {
		const app = this.props.app;

		// go back if no user
		if (!app.isLoggedIn()) {
			this.onBack();
		}

		const {dataBlob, sectionIds, rowIds} = this.loadDataSource();
		this.setState({
			dataSource: this.state.dataSource.cloneWithRowsAndSections(dataBlob, sectionIds, rowIds),
		});
	}

	loadDataSource() {
		let data = "";
		const dataBlob = {};
		const sectionIds: Array<string> = [];
		const rowIds: Array<Array<string>> = [];

		for (let i = 0; i < 3; i++) {
			let sectionID = `${i}`;
			sectionIds.push(sectionID);
			rowIds[sectionID] = [];
			if (i === 0) {
				dataBlob[sectionID] = "CARD INFORMATION";
			} else if (i === 1) {
				dataBlob[sectionID] = " ";
			} else {
				dataBlob[sectionID] = "BILLING ADDRESS";
			}

			for (let j = 0; j < 1; j++) {
				const rowId = `${i}:${j}`;
				rowIds[sectionID].push(rowId);
				dataBlob[rowId] = data;
			}
		}

		return {dataBlob, sectionIds, rowIds};
	}

	onBack() {
		if (this.props.navigator) {
			this.props.navigator.pop();
		}
	}

	onSave() {
		this.setState({isLoading: true});
		let toValidate = new PaymentDetailState();
		toValidate.loadFromBillingModel(this.state);
		if (typeof toValidate.getValidationError !== 'function') {
			alert("Can't validate");
			this.setState({isLoading: false});
		}
		else {
			// get error and show error if not empty
			const err = toValidate.getValidationError();
			if (!isEmpty(err)) {
				alert(err);
				this.setState({isLoading: false});
				return; // cancel because there was an error
			}
			else {
				this.props.app.getCurrentUser().then(currentUser => {
					const api = new PaymentApi();
					api.paymentPostAddressAndPayment({
						sessionId: currentUser.sessionId || '',
						model: {
							payment: toValidate.getBillingModel(),
							address: toValidate.getAddressModel()
						}
					}).then(result => {
						this.setState({isLoading: false});
						this.props.app.setCurrentUser(currentUser,
							() => {},
							() => this.props.app.goBack(),
							() => {});
					});
				});
			}
		}
	}

	saveData(e: any) {
		this.setState(e);
	}

	onMakeDefault() {
		alert("Not yet implemented");
	}

	onCard(card) {
		this.setState({
			cardNumber: card.cardNumber,
			expiryMonth: card.expiryMonth.toString(),
			expiryYear: card.expiryYear.toString(),
			cvv: card.cvv || '',
		});
	}

	render() {
		return (
			<View style={styles.container}>
				<CommonHeading title="Payment" onBack={this.onBack.bind(this)} actionText="Save"
							   onAction={this.onSave.bind(this)}/>
				<Spinner visible={this.state.isLoading} textContent={"Loading..."} textStyle={{color: '#FFF'}} />
				<KeyboardAwareListView
					style={styles.listView}
					enableEmptySections
					dataSource={this.state.dataSource}
					renderRow={(rowData, sectionID) => {
						switch (parseInt(sectionID.toString())) {
							case 0:
								return <View>
									<PaymentForm
										initialState={this.state}
										onChange={e => this.saveData(e)}
									/>
								</View>;
							case 2:
								return <View>
									<AddressForm
										app={this.props.app}
										initialState={this.state}
										onChange={e => this.saveData(e)}
									/>
								</View>;
							default:
								return <View />;
						}
					}
					}
					renderSeparator={(sectionId, rowId) => <View key={rowId} style={styles.listviewSeparator}/>}
					renderSectionHeader={(sectionData, sectionID) => sectionData && (parseInt(sectionID.toString()) == 1 ?
						<ButtonHeader onScanCard={(card) => this.onCard(card)} /> : <SectionHeader data={sectionData}/>) || null}
				/>
			</View>
		)
	}
}
