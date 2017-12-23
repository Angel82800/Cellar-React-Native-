import { View, ListView, } from "react-native";
import * as React from "react";
import { Component } from "react";
import styles from './styles';
import { AddressApi } from 'ucshared';
import { isEmpty } from "../../../utility";
import { CommonHeading } from "../../../components/heading";
import { AddressDetailState, AddressForm } from "../address_form";
import { SectionHeader } from './sectionheader';
export class AddressDetailPage extends Component {
    constructor(props, context) {
        super(props, context);
        this.state = new AddressDetailState();
        // console.log(this.props.selectedAddress);
        if (this.props.selectedAddress != null) {
            this.state.loadFromNhAddressModel(this.props.selectedAddress);
        }
    }
    componentDidMount() {
        const app = this.props.app;
        // go back if no user
        if (!app.isLoggedIn()) {
            this.onBack();
        }
        const { dataBlob, sectionIds, rowIds } = this.loadDataSource();
        this.setState({
            dataSource: this.state.dataSource.cloneWithRowsAndSections(dataBlob, sectionIds, rowIds),
        });
    }
    loadDataSource() {
        let data = "";
        const dataBlob = {};
        const sectionIds = [];
        const rowIds = [];
        let i = 0;
        let sectionID = `${i}`;
        sectionIds.push(sectionID);
        rowIds[sectionID] = [];
        dataBlob[sectionID] = "SHIPPING METHOD";
        for (let j = 0; j < 1; j++) {
            const rowId = `${i}:${j}`;
            rowIds[sectionID].push(rowId);
            dataBlob[rowId] = data;
        }
        return { dataBlob, sectionIds, rowIds };
    }
    onBack() {
        if (this.props.navigator) {
            this.props.navigator.pop();
        }
    }
    getValidationError() {
        if (isEmpty(this.state.firstName))
            return "First name is required";
        if (isEmpty(this.state.lastName))
            return "Last name is required";
        if (isEmpty(this.state.address1) || (this.state.address1 || '').length < 3)
            return "Address 1 is required";
        if (isEmpty(this.state.city) || (this.state.city || '').length < 3)
            return "City is required";
        if (isEmpty(this.state.state) || (this.state.state || '').length < 2)
            return "State is required";
        if (isEmpty(this.state.zip) || (this.state.zip || '').length < 5)
            return "Zip is required";
        if (isEmpty(this.state.phone))
            return "Phone is required";
        return "";
    }
    getAddressModel() {
        return {
            "id": this.state.id,
            "firstName": this.state.firstName,
            "lastName": this.state.lastName,
            "address1": this.state.address1,
            "address2": this.state.address2,
            "city": this.state.city,
            "isDefault": this.state.isDefault,
            "cplId": '',
            "state": this.state.state,
            "carrierPreference": 'NoPreference',
            "zip": this.state.zip,
            "phone": this.state.phone,
            "status": 1,
            "dateAdded": new Date(),
        };
    }
    onSave() {
        // get error and show error if not empty
        const err = this.getValidationError();
        if (!isEmpty(err)) {
            alert(err);
            return; // cancel because there was an error
        }
        //TODO: Show Loading Spinner
        const api = new AddressApi();
        const sId = this.props.app.getCurrentUserId();
        const isNew = this.props.selectedAddress == null;
        if (isEmpty(sId)) {
            alert('Not logged in');
            return;
        }
        else if (isNew) {
            api.addressSessionPostAddress({
                sessionId: sId,
                address: this.getAddressModel()
            }).then((resp) => {
                if (this.props.onAddressChange) {
                    this.props.onAddressChange(resp);
                }
                this.onBack();
            }, err => {
                console.log(err);
                alert(JSON.stringify(err));
            });
        }
        else if (!isNew && this.props.selectedAddress) {
            api.addressSessionPutAddress({
                sessionId: sId,
                addressId: this.props.selectedAddress.id || '',
                address: this.getAddressModel()
            }).then((resp) => {
                if (this.props.onAddressChange) {
                    this.props.onAddressChange(resp);
                }
                this.onBack();
            }, err => {
                alert(JSON.stringify(err));
            });
        }
    }
    onMakeDefault() {
        alert("Not yet implemented");
    }
    saveData(e) {
        this.setState(e);
    }
    renderRow(rowData, sectionID) {
        switch (parseInt(sectionID.toString())) {
            case 0:
                return React.createElement(View, null,
                    React.createElement(AddressForm, { app: this.props.app, initialState: this.state, onChange: e => this.saveData(e) }));
            default:
                return React.createElement(View, null);
        }
    }
    render() {
        return (React.createElement(View, { style: styles.container },
            React.createElement(CommonHeading, { title: "Address", onBack: this.onBack.bind(this), actionText: "Save", onAction: this.onSave.bind(this) }),
            React.createElement(ListView, { style: styles.listView, enableEmptySections: true, dataSource: this.state.dataSource, renderRow: this.renderRow.bind(this), renderSeparator: (sectionId, rowId) => React.createElement(View, { key: rowId, style: styles.listviewSeparator }), renderSectionHeader: (sectionData) => sectionData && React.createElement(SectionHeader, { data: sectionData }) || null })));
    }
}
//# sourceMappingURL=index.js.map