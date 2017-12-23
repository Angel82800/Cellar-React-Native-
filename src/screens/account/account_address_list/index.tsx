import {
	View, Animated, TouchableHighlight, Text, Button, TouchableOpacity, TextInput, ListView,
	ListViewDataSource,
	RefreshControl,
	TextInputState, findNodeHandle
} from "react-native";
import * as React from "react";
import {Component} from "react";
import styles from '../styles';
import {NaviPageProps} from "../../../App";
import Image = Animated.Image;
import {AddressApi, NhAddressModel} from 'ucshared';
import {CommonHeading} from "../../../components/heading";
import {NewAddressCell} from "./new_address_cell";
import {AddressCell} from "./address_cell";
import {RouteMap} from "../../../routemap";

export interface IAddressSelect {
	(selectedAddress: NhAddressModel);
}

export interface AddressListProps extends NaviPageProps {
	selectedAddress?: NhAddressModel;
	onChangeAddress?: IAddressSelect;
}

export class AddressListState {
	isLoading: boolean;
	addressList: Array<NhAddressModel>;
	dataSource: ListViewDataSource;
}

export class AddressListPage extends Component<AddressListProps, AddressListState> {

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

	onBack(): void {
		if (this.props.navigator) {
			if (typeof this.props.onChangeAddress === 'function') {
				this.props.onChangeAddress({});
			}
			this.props.navigator.pop();
		}
	}
	// modelVal : NhAddressModel;
	newAddress(): void {
		this.props.app.setState({ selectedAddress:null });
		let route = RouteMap.AddressDetail;
		this.props.navigator.push(route);
	}

	editAddress(address: NhAddressModel): void {
		let route = RouteMap.AddressDetail;
		if (typeof this.props.onChangeAddress === 'function') {
			this.props.onChangeAddress(address);
		}
		this.props.app.setState({selectedAddress: address}, () => this.props.navigator.push(route));
	}

	render() {
		return (
			<View style={styles.container}>
				<CommonHeading title="Addresses" onBack={this.onBack.bind(this)}/>
				<ListView
					style={styles.listViewContainer}
					showsVerticalScrollIndicator={false}
					enableEmptySections
					dataSource={this.state.dataSource}
					renderRow={(rowData, rowID) => {
						if (rowData.id === undefined) {
							return <TouchableOpacity onPress={this.newAddress.bind(this)}>
								<NewAddressCell />
							</TouchableOpacity>
						} else {
							return <TouchableOpacity onPress={this.editAddress.bind(this, rowData)}>
								<AddressCell address={rowData}/>
							</TouchableOpacity>
						}
					}
					}
					refreshControl={
						<RefreshControl
							refreshing={this.state.isLoading}
							onRefresh={() => this.loadAddresses.bind(this)}
						/>
					}
					renderSeparator={(sectionId, rowId) => <View key={rowId} style={styles.listviewSeparator}/>}
				/>
			</View>
		)
	}
}
