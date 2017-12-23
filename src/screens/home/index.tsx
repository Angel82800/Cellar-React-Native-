/**
 * UndergroundCellar
 * Copyright @ 2017 by Roderick L.
 * @flow
 **/

import * as React from 'react';
import {
	View,
	ListView,
	Image,
	Text,
	TouchableOpacity,
	RefreshControl,
	StatusBar,AsyncStorage
} from 'react-native';

import styles from './styles';
import * as Api from 'ucshared';
import {HomeOfferItem} from './home_offer_item/index';
import {isEmpty} from "../../utility";
import {PurchaseConfirm} from "../purchase_confirm";
import {GuideDealAlerts} from "./dealAlerts";

var PushNotification = require('react-native-push-notification');

const MyStatusBar = ({backgroundColor, ...props}) => (
	<View style={[styles.statusBar, {backgroundColor}]}>
		<StatusBar backgroundColor={backgroundColor} {...props} />
	</View>
);

export class Home extends React.Component<any, any> {

	constructor(props: any, context: any) {
		super(props);
		const ds = new ListView.DataSource({rowHasChanged: (r1: any, r2: any) => r1 !== r2});
		this.state = {
			dataSource: ds.cloneWithRows([]),
			data_array: [],
			visible: true,
			deviceToken: "",
			firstLogin:false
		};
	}

	componentDidMount() {
		this.loadFeed();
		this.getLoginInfo();
		PushNotification.checkPermissions(permissions => {
			if (permissions.alert === 1 || permissions.badge === 1 || permissions.sound === 1) {
				//alert('Already registered');
			}
		});
	}

	async getLoginInfo(){
		try {
			const value = await AsyncStorage.getItem("login");
			if(value !== null)
				this.setState({
					firstLogin:true
				})
		}catch(error){
			alert(error);
		}
    }

	loadFeed() {
		this.setState({visible: true});
		let api = new Api.OfferApi();
		api.offerOfferListHandler({
			'filter': true,
			'skip': 0,
			'take': 100,
			forcePopulate: true
		}).then((result: Array<Api.OfferV2Entity>) => {
			this.setState({
				visible: false,
				data_array: result,
				dataSource: this.state.dataSource.cloneWithRows(result)
			});
		}).catch((error) => {
			alert(JSON.stringify(error));
			this.setState({visible: false})
		});
	}

	renderNav() {
		return <View style={styles.nav_bar_container}>
			<Image style={styles.background} source={require('../../../img/nav_gradient.jpg')}/>
			<TouchableOpacity onPress={this.props.onDrawerButton.bind(this)}>
				<Image style={styles.nav_menu_bt} source={require('../../../img/menu.png')}/>
			</TouchableOpacity>
			<Image style={styles.nav_title} source={require('../../../img/uc-logo-2016-white-com.png')}/>
			<View />
		</View>;
	}

	renderList() {
		return this.state.dataSource && <ListView
				style={styles.list_view}
				showsVerticalScrollIndicator={false}
				enableEmptySections
				dataSource={this.state.dataSource}
				renderRow={(rowData: Api.OfferV2Entity) =>
					<HomeOfferItem app={this.props.app} data={rowData}/>}
				refreshControl={
					<RefreshControl
						refreshing={this.state.visible}
						onRefresh={() => this.loadFeed.bind(this)}
					/>
				}
			/>;
	}

	onNotifyMe() {
		this.props.app.setState({showDealAlertsOverlay: true});
	}

	render() {
		const app = this.props.app;
		const isSignedIn = app.isLoggedIn();
		const alreadyPush = !isEmpty(this.state.deviceToken);
		const showDealAlerts = app.state.showDealAlertsOverlay && isSignedIn;
		return (
			<View style={styles.container}>
				<MyStatusBar backgroundColor="#272727" barStyle="light-content"/>
				<View>
					{this.renderNav()}
					{false && isSignedIn && !alreadyPush && <View style={styles.banner_container}>
						<Text style={styles.banner_title}>Never miss a deal!</Text>
						<TouchableOpacity
							style={styles.banner_bt}
							onPress={this.onNotifyMe.bind(this)}>
							<Text style={styles.banner_bt_title}>NOTIFY ME</Text>
						</TouchableOpacity>
					</View>}
					{this.renderList()}
				</View>
				{(this.props.app.getPurchase()) ? <PurchaseConfirm app={this.props.app}/> : null}
				{showDealAlerts && !this.state.firstLogin && <GuideDealAlerts app={this.props.app} glass={true}/>}
			</View>);
	}
}

const drawerStyles = {
	drawer: {shadowColor: '#000000', shadowOpacity: 0.8, shadowRadius: 3},
	main: {paddingLeft: 3},
};
