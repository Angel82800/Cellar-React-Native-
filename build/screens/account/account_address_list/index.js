import { View, TouchableOpacity, ListView, RefreshControl } from "react-native";
import * as React from "react";
import { Component } from "react";
import styles from '../styles';
import { CommonHeading } from "../../../components/heading";
import { NewAddressCell } from "./new_address_cell";
import { AddressCell } from "./address_cell";
import { RouteMap } from "../../../routemap";
export class AddressListState {
}
export class AddressListPage extends Component {
    constructor(props, context) {
        super(props, context);
        const ds = new ListView.DataSource({
            rowHasChanged: (r1, r2) => r1 !== r2
        });
        this.state = {
            isLoading: false,
            addressList: [{}],
            dataSource: ds.cloneWithRows([{}]),
        };
    }
    componentDidMount() {
        const app = this.props.app;
        // go back if no user
        if (!app.isLoggedIn()) {
            this.onBack();
        }
        this.loadAddresses();
    }
    loadAddresses() {
        const list = [...[{}], ...(this.props.app.state.currentAddresses || [])];
        this.setState({
            isLoading: false,
            addressList: list,
            dataSource: this.state.dataSource.cloneWithRows(list)
        });
    }
    onBack() {
        if (this.props.navigator) {
            if (typeof this.props.onChangeAddress === 'function') {
                this.props.onChangeAddress({});
            }
            this.props.navigator.pop();
        }
    }
    // modelVal : NhAddressModel;
    newAddress() {
        this.props.app.setState({ selectedAddress: null });
        let route = RouteMap.AddressDetail;
        this.props.navigator.push(route);
    }
    editAddress(address) {
        let route = RouteMap.AddressDetail;
        if (typeof this.props.onChangeAddress === 'function') {
            this.props.onChangeAddress(address);
        }
        this.props.app.setState({ selectedAddress: address }, () => this.props.navigator.push(route));
    }
    render() {
        return (React.createElement(View, { style: styles.container },
            React.createElement(CommonHeading, { title: "Addresses", onBack: this.onBack.bind(this) }),
            React.createElement(ListView, { style: styles.listViewContainer, showsVerticalScrollIndicator: false, enableEmptySections: true, dataSource: this.state.dataSource, renderRow: (rowData, rowID) => {
                    if (rowData.id === undefined) {
                        return React.createElement(TouchableOpacity, { onPress: this.newAddress.bind(this) },
                            React.createElement(NewAddressCell, null));
                    }
                    else {
                        return React.createElement(TouchableOpacity, { onPress: this.editAddress.bind(this, rowData) },
                            React.createElement(AddressCell, { address: rowData }));
                    }
                }, refreshControl: React.createElement(RefreshControl, { refreshing: this.state.isLoading, onRefresh: () => this.loadAddresses.bind(this) }), renderSeparator: (sectionId, rowId) => React.createElement(View, { key: rowId, style: styles.listviewSeparator }) })));
    }
}
//# sourceMappingURL=index.js.map