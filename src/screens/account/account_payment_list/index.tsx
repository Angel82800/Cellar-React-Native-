import {
	View, Animated, TouchableHighlight, Text, Button, TouchableOpacity, TextInput, ListView,
	TextInputState, findNodeHandle, ListViewDataSource, RefreshControl
} from "react-native";
import * as React from "react";
import {Component} from "react";
import styles from '../styles';
import {NaviPageProps} from "../../../App";
import Image = Animated.Image;
import {
	AddressApi, ApiBillingModelWithAuthnet, ApiBillingModelWithCardNumber, NhAddressModel,
	PaymentApi
} from 'ucshared';
import {CommonHeading} from "../../../components/heading";
import {NewPaymentCell} from "./new_payment_cell/index";
import {PaymentCell} from "./payment_cell/index";
import {RouteMap} from "../../../routemap";

export interface IPaymentSelect {
	(selectedPayment: ApiBillingModelWithCardNumber | ApiBillingModelWithAuthnet);
}

export interface PaymentListProps extends NaviPageProps {
	paymentList: Array<any>;
	selectedPayment?: ApiBillingModelWithCardNumber | ApiBillingModelWithAuthnet | null;
	onChangePayment?: IPaymentSelect;
}

export interface PaymentListState {
	selectedItem: ApiBillingModelWithCardNumber | ApiBillingModelWithAuthnet;
	isLoading: boolean;
	paymentList: Array<ApiBillingModelWithCardNumber | ApiBillingModelWithAuthnet>;
	dataSource: ListViewDataSource;
}

export class PaymentListPage extends Component<PaymentListProps, PaymentListState> {

	constructor(props, context) {
		super(props, context);
		const ds = new ListView.DataSource({
			rowHasChanged: (r1, r2) => r1 !== r2
		});
		let tempPayment:ApiBillingModelWithCardNumber = {
			billingAddressId : "test id",
			cvv : "",
			firstName : "",
			lastName : "",
			dateAdded : new Date(),
			expiryYear : 0,
			expiryMonth : 0,
			cardNumber : "",
			id : "",
			isDefault : false,
			cardType : "",
		};
		let tempList:Array<ApiBillingModelWithCardNumber> = [];
		tempList.push(tempPayment);
		this.state = {
			isLoading: false,
			paymentList: [],
			selectedItem: props.selectedPayment || null,
			dataSource: ds.cloneWithRows([])
		};
	}

	newPayment() {
		this.props.app.navigateToRoute(RouteMap.PaymentDetail);
	}

	pickPayment(item: ApiBillingModelWithCardNumber | ApiBillingModelWithAuthnet) {
		if (this.props.onChangePayment) {
			this.props.onChangePayment(item);
			this.onBack();
		}
	}

	componentDidMount() {
		const app = this.props.app;

		// go back if no user
		if (!app.isLoggedIn()) {
			this.onBack();
		}

		let placeholderPayment: ApiBillingModelWithCardNumber = {
			billingAddressId : "test id",
			cvv : "",
			firstName : "",
			lastName : "",
			dateAdded : new Date(),
			expiryYear : 0,
			expiryMonth : 0,
			cardNumber : "",
			id : "",
			isDefault : false,
			cardType : "",
		};

		const list = [...[placeholderPayment], ...(this.props.paymentList || [])];
		this.setState({
			paymentList: list,
			dataSource: this.state.dataSource.cloneWithRows(list)
		});
	}

	onBack() {
		if (this.props.navigator) {
			this.props.navigator.pop();
		}
	}

	render() {
		return (
			<View style={styles.container}>
				<CommonHeading
					title="Payment Methods"
					onBack={this.onBack.bind(this)}
				/>
				<ListView
					style={styles.listViewContainer}
					showsVerticalScrollIndicator={false}
					enableEmptySections
					dataSource={this.state.dataSource}
					renderRow={(rowData: ApiBillingModelWithCardNumber, rowID) => {
						if (rowData.billingAddressId === 'test id') {
							return <TouchableOpacity onPress={this.newPayment.bind(this)}>
								<NewPaymentCell />
							</TouchableOpacity>
						} else {
							return (typeof this.props.onChangePayment === 'function') ?
								<TouchableOpacity onPress={this.pickPayment.bind(this, rowData)}>
									<PaymentCell app={this.props.app} payment={rowData}/>
								</TouchableOpacity> :
								<View><PaymentCell app={this.props.app} payment={rowData}/></View>;
						}
					}
					}
					refreshControl={
						<RefreshControl
							refreshing={this.state.isLoading}
							onRefresh={() => this.componentDidMount.bind(this)}
						/>
					}
					renderSeparator={(sectionId, rowId) => <View key={rowId} style={styles.listviewSeparator}/>}
				/>
			</View>
		)
	}
}
