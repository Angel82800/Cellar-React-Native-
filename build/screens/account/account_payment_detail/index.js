import { View } from "react-native";
import * as React from "react";
import { Component } from "react";
import { Spinner } from "react-native-loading-spinner-overlay";
import styles from './styles';
import { PaymentApi } from 'ucshared';
import { isEmpty } from "../../../utility";
import { CommonHeading } from "../../../components/heading";
import { AddressForm } from "../address_form";
import { SectionHeader } from './sectionheader';
import { ButtonHeader } from './button_header';
import { PaymentDetailState, PaymentForm } from '../payment_form';
import { KeyboardAwareListView } from 'react-native-keyboard-aware-scroll-view';
export class PaymentDetailPage extends Component {
    constructor(props, context) {
        super(props, context);
        this.state = new PaymentDetailState();
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
        for (let i = 0; i < 3; i++) {
            let sectionID = `${i}`;
            sectionIds.push(sectionID);
            rowIds[sectionID] = [];
            if (i === 0) {
                dataBlob[sectionID] = "CARD INFORMATION";
            }
            else if (i === 1) {
                dataBlob[sectionID] = " ";
            }
            else {
                dataBlob[sectionID] = "BILLING ADDRESS";
            }
            for (let j = 0; j < 1; j++) {
                const rowId = `${i}:${j}`;
                rowIds[sectionID].push(rowId);
                dataBlob[rowId] = data;
            }
        }
        return { dataBlob, sectionIds, rowIds };
    }
    onBack() {
        if (this.props.navigator) {
            this.props.navigator.pop();
        }
    }
    onSave() {
        this.setState({ isLoading: true });
        let toValidate = new PaymentDetailState();
        toValidate.loadFromBillingModel(this.state);
        if (typeof toValidate.getValidationError !== 'function') {
            alert("Can't validate");
            this.setState({ isLoading: false });
        }
        else {
            // get error and show error if not empty
            const err = toValidate.getValidationError();
            if (!isEmpty(err)) {
                alert(err);
                this.setState({ isLoading: false });
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
                        this.setState({ isLoading: false });
                        this.props.app.setCurrentUser(currentUser, () => { }, () => this.props.app.goBack(), () => { });
                    });
                });
            }
        }
    }
    saveData(e) {
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
        return (React.createElement(View, { style: styles.container },
            React.createElement(CommonHeading, { title: "Payment", onBack: this.onBack.bind(this), actionText: "Save", onAction: this.onSave.bind(this) }),
            React.createElement(Spinner, { visible: this.state.isLoading, textContent: "Loading...", textStyle: { color: '#FFF' } }),
            React.createElement(KeyboardAwareListView, { style: styles.listView, enableEmptySections: true, dataSource: this.state.dataSource, renderRow: (rowData, sectionID) => {
                    switch (parseInt(sectionID.toString())) {
                        case 0:
                            return React.createElement(View, null,
                                React.createElement(PaymentForm, { initialState: this.state, onChange: e => this.saveData(e) }));
                        case 2:
                            return React.createElement(View, null,
                                React.createElement(AddressForm, { app: this.props.app, initialState: this.state, onChange: e => this.saveData(e) }));
                        default:
                            return React.createElement(View, null);
                    }
                }, renderSeparator: (sectionId, rowId) => React.createElement(View, { key: rowId, style: styles.listviewSeparator }), renderSectionHeader: (sectionData, sectionID) => sectionData && (parseInt(sectionID.toString()) == 1 ?
                    React.createElement(ButtonHeader, { onScanCard: (card) => this.onCard(card) }) : React.createElement(SectionHeader, { data: sectionData })) || null })));
    }
}
//# sourceMappingURL=index.js.map