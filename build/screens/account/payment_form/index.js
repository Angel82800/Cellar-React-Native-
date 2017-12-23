import { View, TextInput, } from "react-native";
import * as React from "react";
import { Component } from "react";
import { AddressDetailState } from '../address_form';
import styles from './styles';
import { isEmpty } from '../../../utility';
export class PaymentDetailState extends AddressDetailState {
    getValidationError() {
        const baseError = super.getValidationError();
        if (!isEmpty(baseError))
            return baseError;
        return "";
    }
    loadFromBillingModel(model) {
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
    getBillingModel() {
        return {
            "billingAddressId": this.billingAddressId ? this.billingAddressId : "",
            "cvv": this.cvv ? this.cvv : "",
            "firstName": this.firstName ? this.firstName : "",
            "lastName": this.lastName ? this.lastName : "",
            "dateAdded": new Date(),
            "expiryYear": parseInt(this.expiryYear ? this.expiryYear : "0") || 0,
            "expiryMonth": parseInt(this.expiryMonth ? this.expiryMonth : "0") || 0,
            "cardNumber": this.cardNumber ? this.cardNumber : "",
            "id": this.id ? this.id : "",
            "isDefault": this.isDefault ? this.isDefault : false,
            "cardType": this.cardType ? this.cardType : "",
        };
    }
}
export class PaymentForm extends Component {
    constructor(props, context) {
        super(props, context);
        let pds = new PaymentDetailState(); //this.props.initialState;
        pds.loadFromBillingModel(props.initialState);
        this.state = pds;
    }
    onMonthChange(val) {
        if (val.length == 2) {
            this.expire_year_field.focus();
        }
        this.props.onChange({ expiryMonth: val });
    }
    onYearChange(val) {
        if (val.length == 4) {
            this.cvv_field.focus();
        }
        this.props.onChange({ expiryYear: val });
    }
    render() {
        return (React.createElement(View, { style: styles.container },
            React.createElement(View, null,
                React.createElement(TextInput, { ref: card_number_field => this.card_number_field = card_number_field, style: styles.text, onChangeText: val => this.props.onChange({ cardNumber: val }), placeholder: "Card Number", value: this.props.initialState.cardNumber ? this.props.initialState.cardNumber : "", autoCorrect: false, keyboardType: "number-pad", autoCapitalize: "none", returnKeyType: 'next', onSubmitEditing: () => {
                        this.expire_month_field.focus();
                    }, placeholderTextColor: 'white', selectionColor: "gray" }),
                React.createElement(View, { style: styles.separator })),
            React.createElement(View, { style: styles.exp_date_container },
                React.createElement(View, { style: styles.monthContainer },
                    React.createElement(TextInput, { ref: expire_month_field => this.expire_month_field = expire_month_field, style: styles.text, onChangeText: val => this.onMonthChange(val), placeholder: "Exp MM", value: this.props.initialState.expiryMonth ? this.props.initialState.expiryMonth : "", autoCorrect: false, keyboardType: "number-pad", autoCapitalize: "none", returnKeyType: 'next', onSubmitEditing: () => {
                            this.expire_year_field.focus();
                        }, placeholderTextColor: 'white', selectionColor: "gray" }),
                    React.createElement(View, { style: styles.separator })),
                React.createElement(View, { style: styles.yearContainer },
                    React.createElement(TextInput, { ref: expire_year_field => this.expire_year_field = expire_year_field, style: styles.text, onChangeText: val => this.onYearChange(val), placeholder: "YYYY", value: this.props.initialState.expiryYear ? this.props.initialState.expiryYear : "", autoCorrect: false, keyboardType: "number-pad", autoCapitalize: "none", returnKeyType: 'next', onSubmitEditing: () => {
                            this.cvv_field.focus();
                        }, placeholderTextColor: 'white', selectionColor: "gray" }),
                    React.createElement(View, { style: styles.separator }))),
            React.createElement(View, null,
                React.createElement(TextInput, { ref: cvv_field => this.cvv_field = cvv_field, style: styles.text, onChangeText: val => this.props.onChange({ cvv: val }), placeholder: "CVV", value: this.props.initialState.cvv ? this.props.initialState.cvv : "", autoCorrect: false, keyboardType: "number-pad", autoCapitalize: "none", returnKeyType: 'done', placeholderTextColor: 'white', selectionColor: "gray" }))));
    }
}
//# sourceMappingURL=index.js.map