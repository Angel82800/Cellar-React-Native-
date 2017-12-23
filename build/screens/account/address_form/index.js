import { View, Text, TouchableOpacity, TextInput, ListView, } from "react-native";
import * as React from "react";
import { Component } from "react";
import styles from './styles';
import { isEmpty } from '../../../utility';
const stateList = [
    "",
    "AL",
    "AK",
    "AZ",
    "AR",
    "CA",
    "CO",
    "CT",
    "DE",
    "DC",
    "FL",
    "GA",
    "HI",
    "ID",
    "IL",
    "IN",
    "IA",
    "KS",
    "KY",
    "LA",
    "ME",
    "MD",
    "MA",
    "MI",
    "MN",
    "MS",
    "MO",
    "MT",
    "NE",
    "NV",
    "NH",
    "NJ",
    "NM",
    "NY",
    "NC",
    "ND",
    "OH",
    "OK",
    "OR",
    "PA",
    "PR",
    "RI",
    "SC",
    "SD",
    "TN",
    "TX",
    "UT",
    "VT",
    "VI",
    "VA",
    "WA",
    "WV",
    "WI",
    "WY"
];
export class AddressDetailState {
    constructor() {
        const ds = new ListView.DataSource({
            rowHasChanged: (r1, r2) => r1 !== r2,
            sectionHeaderHasChanged: (s1, s2) => s1 !== s2
        });
        this.dataSource = ds.cloneWithRowsAndSections({}, [], []);
    }
    getValidationError() {
        if (isEmpty(this.firstName))
            return "First name is required";
        if (isEmpty(this.lastName))
            return "Last name is required";
        if (isEmpty(this.address1) || (this.address1 || '').length < 3)
            return "Address 1 is required";
        if (isEmpty(this.city) || (this.city || '').length < 3)
            return "City is required";
        if (isEmpty(this.state) || (this.state || '').length < 2)
            return "State is required";
        if (isEmpty(this.zip) || (this.zip || '').length < 5)
            return "Zip is required";
        if (isEmpty(this.phone))
            return "Phone is required";
        return "";
    }
    loadFromNhAddressModel(other) {
        this.id = other.id;
        this.firstName = other.firstName;
        this.lastName = other.lastName;
        this.address1 = other.address1;
        this.address2 = other.address2;
        this.city = other.city;
        this.isDefault = other.isDefault;
        this.state = other.state;
        this.zip = other.zip;
        this.phone = other.phone;
    }
    getAddressModel() {
        return {
            "id": this.id,
            "firstName": this.firstName,
            "lastName": this.lastName,
            "address1": this.address1,
            "address2": this.address2,
            "city": this.city,
            "isDefault": this.isDefault,
            "cplId": '',
            "state": this.state,
            "carrierPreference": 'NoPreference',
            "zip": this.zip,
            "phone": this.phone,
            "status": 1,
            "dateAdded": new Date(),
        };
    }
}
export class AddressForm extends Component {
    constructor(props, context) {
        super(props, context);
        this.state = this.props.initialState;
    }
    onSetData(val) {
        if (typeof this.props.onChange === 'function') {
            this.props.onChange({ state: val });
        }
    }
    onSelectState() {
        this.props.app.navigateToPicker(stateList, (value) => this.onSetData(value));
    }
    render() {
        if (typeof this.props.onChange !== 'function') {
            return React.createElement(View, { style: styles.container },
                React.createElement(Text, null, "onChange is not set"));
        }
        return (React.createElement(View, { style: styles.container },
            React.createElement(View, { style: styles.itemContainer },
                React.createElement(TextInput, { ref: first_name_field => this.first_name_field = first_name_field, style: styles.text, onChangeText: val => this.props.onChange({ firstName: val }), placeholder: "First Name", value: this.props.initialState.firstName ? this.props.initialState.firstName : "", autoCorrect: false, onSubmitEditing: () => {
                        this.last_name_field.focus();
                    }, autoCapitalize: "none", returnKeyType: 'next', placeholderTextColor: 'white', selectionColor: "gray" }),
                React.createElement(View, { style: styles.separator })),
            React.createElement(View, { style: styles.itemContainer },
                React.createElement(TextInput, { ref: last_name_field => this.last_name_field = last_name_field, style: styles.text, onSubmitEditing: () => {
                        this.address1_field.focus();
                    }, onChangeText: val => this.props.onChange({ lastName: val }), placeholder: "Last Name", value: this.props.initialState.lastName ? this.props.initialState.lastName : "", autoCorrect: false, autoCapitalize: "none", returnKeyType: 'next', placeholderTextColor: 'white', selectionColor: "gray" }),
                React.createElement(View, { style: styles.separator })),
            React.createElement(View, { style: styles.itemContainer },
                React.createElement(TextInput, { ref: address1_field => this.address1_field = address1_field, style: styles.text, onChangeText: val => this.props.onChange({ address1: val }), placeholder: "Street Address", value: this.props.initialState.address1 ? this.props.initialState.address1 : "", autoCorrect: false, autoCapitalize: "none", returnKeyType: 'next', onSubmitEditing: () => this.address2_field.focus(), placeholderTextColor: 'white', selectionColor: "gray" }),
                React.createElement(View, { style: styles.separator })),
            React.createElement(View, { style: styles.itemContainer },
                React.createElement(TextInput, { ref: address2_field => this.address2_field = address2_field, style: styles.text, onChangeText: val => this.props.onChange({ address2: val }), placeholder: "Address Line 2 (optional)", value: this.props.initialState.address2 ? this.props.initialState.address2 : "", autoCorrect: false, autoCapitalize: "none", returnKeyType: 'next', onSubmitEditing: () => this.city_field.focus(), placeholderTextColor: 'white', selectionColor: "gray" }),
                React.createElement(View, { style: styles.separator })),
            React.createElement(View, { style: styles.itemContainer },
                React.createElement(TextInput, { ref: city_field => this.city_field = city_field, style: styles.text, onChangeText: val => this.props.onChange({ city: val }), placeholder: "City", value: this.props.initialState.city ? this.props.initialState.city : "", autoCorrect: false, autoCapitalize: "none", returnKeyType: 'next', onSubmitEditing: () => {
                        this.zip_field.focus();
                    }, placeholderTextColor: 'white', selectionColor: "gray" }),
                React.createElement(View, { style: styles.separator })),
            React.createElement(View, { style: styles.state_zip_container },
                React.createElement(View, { style: styles.stateContainer },
                    React.createElement(TouchableOpacity, { style: styles.state_bt_title_container, onPress: this.onSelectState.bind(this) },
                        React.createElement(Text, { style: styles.text }, this.props.initialState.state ? this.props.initialState.state : "State")),
                    React.createElement(View, { style: styles.separator })),
                React.createElement(View, { style: styles.zipContainer },
                    React.createElement(TextInput, { ref: zip_field => this.zip_field = zip_field, style: styles.text, onChangeText: val => this.props.onChange({ zip: val }), placeholder: "Zip Code", value: this.props.initialState.zip ? this.props.initialState.zip : "", autoCorrect: false, autoCapitalize: "none", keyboardType: "number-pad", onSubmitEditing: () => {
                            this.phone_filed.focus();
                        }, returnKeyType: 'next', placeholderTextColor: 'white', selectionColor: "gray" }),
                    React.createElement(View, { style: styles.separator }))),
            React.createElement(View, { style: styles.itemContainer },
                React.createElement(TextInput, { ref: phone_filed => this.phone_filed = phone_filed, style: styles.text, onChangeText: val => this.props.onChange({ phone: val }), placeholder: "Phone Number", value: this.props.initialState.phone ? this.props.initialState.phone : "", autoCorrect: false, keyboardType: "number-pad", autoCapitalize: "none", returnKeyType: 'done', placeholderTextColor: 'white', selectionColor: "gray" }))));
    }
}
//# sourceMappingURL=index.js.map