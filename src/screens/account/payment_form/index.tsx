import {
	View, Animated, TouchableHighlight, Text, Button, TouchableOpacity, TextInput, ListView,
	Image,
	TextInputState, findNodeHandle,
} from "react-native";
import * as React from "react";
import {Component} from "react";
import {AddressDetailState} from '../address_form';
import {ApiBillingModelWithAuthnet, ApiBillingModelWithCardNumber} from 'ucshared';
import styles from './styles';
import {isEmpty} from '../../../utility';

export class PaymentDetailState extends AddressDetailState {
	"billingAddressId"?: string;
	"cvv": string;
	"firstName": string;
	"lastName": string;
	"dateAdded"?: Date;
	"expiryYear"?: string;
	"expiryMonth"?: string;
	"cardNumber"?: string;
	"id"?: string;
	"isDefault"?: boolean;
	"cardType"?: string;
	dataSource: any;
	isLoading: boolean;

	getValidationError(): string {
		const baseError = super.getValidationError();
		if (!isEmpty(baseError))
			return baseError;
		return "";
	}

	loadFromBillingModel(model: PaymentDetailState) {
		super.loadFromNhAddressModel(model);
		this.billingAddressId = model.billingAddressId;
		this.cvv = model.cvv;
		this.firstName = model.firstName;
		this.lastName = model.lastName;
		this.dateAdded = model.dateAdded;
		this.expiryYear = model.expiryYear;
		this.expiryMonth = model.expiryMonth;
		this.cardNumber = model.cardNumber;
		this.id = model.id;
		this.isDefault = model.isDefault;
		this.cardType = model.cardType;
	}

	getBillingModel(): ApiBillingModelWithAuthnet {
		return {
			"billingAddressId": this.billingAddressId ? this.billingAddressId : "",
			"cvv": this.cvv ? this.cvv : "",
			"firstName": this.firstName ? this.firstName : "",
			"lastName": this.lastName ? this.lastName : "",
			"dateAdded": new Date(),
			"expiryYear": parseInt(this.expiryYear ? this.expiryYear : "0") || 0,
			"expiryMonth": parseInt(this.expiryMonth ? this.expiryMonth : "0")||0,
			"cardNumber": this.cardNumber ? this.cardNumber : "",
			"id": this.id ? this.id : "",
			"isDefault": this.isDefault ? this.isDefault : false,
			"cardType": this.cardType ? this.cardType : "",
		};
	}
}

export interface PaymentFormProps {initialState: PaymentDetailState; onChange: Function;
}

export class PaymentForm extends Component<PaymentFormProps, PaymentDetailState> {

	private card_number_field: TextInput;
	private expire_month_field: TextInput;
	private expire_year_field: TextInput;
	private cvv_field: TextInput;

	constructor(props, context) {
		super(props, context);
		let pds = new PaymentDetailState();//this.props.initialState;
		pds.loadFromBillingModel(props.initialState);
		this.state = pds;
	}

	onMonthChange(val) {
		if (val.length == 2) {
			this.expire_year_field.focus();
		}
		this.props.onChange({expiryMonth: val});
	}

	onYearChange(val) {
		if (val.length == 4) {
			this.cvv_field.focus();
		}
		this.props.onChange({expiryYear: val});
	}

	render() {
		return (
			<View style={styles.container}>
				<View>
					<TextInput
						ref={card_number_field => this.card_number_field = card_number_field}
						style={styles.text}
						onChangeText={val => this.props.onChange({cardNumber: val})}
						placeholder={"Card Number"}
						value={this.props.initialState.cardNumber ? this.props.initialState.cardNumber : ""}
						autoCorrect={false}
						keyboardType="number-pad"
						autoCapitalize="none"
						returnKeyType={'next'}
						onSubmitEditing={() => {
							this.expire_month_field.focus()
						}}
						placeholderTextColor='white'
						selectionColor="gray"/>
					<View style={styles.separator}/>
				</View>
				<View style={styles.exp_date_container}>
					<View style={styles.monthContainer}>
						<TextInput
							ref={expire_month_field => this.expire_month_field = expire_month_field}
							style={styles.text}
							onChangeText={val => this.onMonthChange(val)}
							placeholder={"Exp MM"}
							value={this.props.initialState.expiryMonth ? this.props.initialState.expiryMonth : ""}
							autoCorrect={false}
							keyboardType="number-pad"
							autoCapitalize="none"
							returnKeyType={'next'}
							onSubmitEditing={() => {
								this.expire_year_field.focus()
							}}
							placeholderTextColor='white'
							selectionColor="gray"/>
						<View style={styles.separator}/>
					</View>
					<View style={styles.yearContainer}>
						<TextInput
							ref={expire_year_field => this.expire_year_field = expire_year_field}
							style={styles.text}
							onChangeText={val => this.onYearChange(val)}
							placeholder={"YYYY"}
							value={this.props.initialState.expiryYear ? this.props.initialState.expiryYear : ""}
							autoCorrect={false}
							keyboardType="number-pad"
							autoCapitalize="none"
							returnKeyType={'next'}
							onSubmitEditing={() => {
								this.cvv_field.focus()
							}}
							placeholderTextColor='white'
							selectionColor="gray"/>
						<View style={styles.separator}/>
					</View>
				</View>
				<View>
					<TextInput
						ref={cvv_field => this.cvv_field = cvv_field}
						style={styles.text}
						onChangeText={val => this.props.onChange({cvv: val})}
						placeholder={"CVV"}
						value={this.props.initialState.cvv ? this.props.initialState.cvv : ""}
						autoCorrect={false}
						keyboardType="number-pad"
						autoCapitalize="none"
						returnKeyType={'done'}
						placeholderTextColor='white'
						selectionColor="gray"/>
				</View>
			</View>);
	}
}