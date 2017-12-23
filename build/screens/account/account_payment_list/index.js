import { View, TouchableOpacity, ListView, RefreshControl } from "react-native";
import * as React from "react";
import { Component } from "react";
import styles from '../styles';
import { CommonHeading } from "../../../components/heading";
import { NewPaymentCell } from "./new_payment_cell/index";
import { PaymentCell } from "./payment_cell/index";
import { RouteMap } from "../../../routemap";
export class PaymentListPage extends Component {
    constructor(props, context) {
        super(props, context);
        const ds = new ListView.DataSource({
            rowHasChanged: (r1, r2) => r1 !== r2
        });
        let tempPayment = {
            billingAddressId: "test id",
            cvv: "",
            firstName: "",
            lastName: "",
            dateAdded: new Date(),
            expiryYear: 0,
            expiryMonth: 0,
            cardNumber: "",
            id: "",
            isDefault: false,
            cardType: "",
        };
        let tempList = [];
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
    pickPayment(item) {
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
        let placeholderPayment = {
            billingAddressId: "test id",
            cvv: "",
            firstName: "",
            lastName: "",
            dateAdded: new Date(),
            expiryYear: 0,
            expiryMonth: 0,
            cardNumber: "",
            id: "",
            isDefault: false,
            cardType: "",
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
        return (React.createElement(View, { style: styles.container },
            React.createElement(CommonHeading, { title: "Payment Methods", onBack: this.onBack.bind(this) }),
            React.createElement(ListView, { style: styles.listViewContainer, showsVerticalScrollIndicator: false, enableEmptySections: true, dataSource: this.state.dataSource, renderRow: (rowData, rowID) => {
                    if (rowData.billingAddressId === 'test id') {
                        return React.createElement(TouchableOpacity, { onPress: this.newPayment.bind(this) },
                            React.createElement(NewPaymentCell, null));
                    }
                    else {
                        return (typeof this.props.onChangePayment === 'function') ?
                            React.createElement(TouchableOpacity, { onPress: this.pickPayment.bind(this, rowData) },
                                React.createElement(PaymentCell, { app: this.props.app, payment: rowData })) :
                            React.createElement(View, null,
                                React.createElement(PaymentCell, { app: this.props.app, payment: rowData }));
                    }
                }, refreshControl: React.createElement(RefreshControl, { refreshing: this.state.isLoading, onRefresh: () => this.componentDidMount.bind(this) }), renderSeparator: (sectionId, rowId) => React.createElement(View, { key: rowId, style: styles.listviewSeparator }) })));
    }
}
//# sourceMappingURL=index.js.map