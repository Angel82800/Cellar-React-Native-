import React from 'react';
import {
	View,
	Text,
	Image,
	TouchableOpacity,
	findNodeHandle
} from 'react-native';

import styles from './styles';
import {NhItemGroupViewEntity} from 'ucshared';
import {PurchaseConfirmCell} from "./purchase_confirm_cell";
import {App} from "../../App";
import {GlobalStyles} from "../../constants";
import {BlurView} from 'react-native-blur';
var ShareActions = require('react-native-share-actions');
var GridView = require('rn-grid-view');

export class PurchaseConfirm extends React.Component<{ app: App }, { viewRef: null | number }> {
	constructor(props, context) {
		super(props, context);
		this.state = {
			viewRef: null
		};
	}

	backgroundImage: Image;

	imageLoaded() {
		this.setState({viewRef: findNodeHandle(this.backgroundImage)});
	}

	back() {
		this.props.app.handleCheckoutCompleted(null);
	}

	share() {
		this.props.app.getCurrentUser().then(user => {
			let order = this.props.app.getPurchase();
			const shareLink = "https://www.undergroundcellar.com/cloudcellar/" + user.sessionUserUrlProfile;
			ShareActions.share({
				url: shareLink,
				message: 'Check out my upgrades from Underground Cellar',
				subject: 'Share Wine'
			}, 'Share URL')
				.then(function (result) {
					if (result.success) {
						console.log(`Shared via ${result.method}`);
					}
				})
				.catch(function (error) {
					console.error(error);
				});

		});
	}

	_renderCell(item: NhItemGroupViewEntity) {
		return (<PurchaseConfirmCell key={'i' + item.sku} wine={item}/>);
	}

	render() {
		let order = this.props.app.getPurchase();
		let result = order ? order.result : null;
		let totalValue = (!result || !result.bottles) ? 0 : result.bottles.reduce((prev, cur, i) => prev + (cur.retailPrice || 0), 0);
		let upgradePct = result ? (1 - (result.totalPrice || 0) / totalValue) * 100 : 0;
		return (
			<View style={GlobalStyles.absolute}>
				<Image
					ref={(img) => {
						this.backgroundImage = img;
					}}
					source={require('../../../img/nav_gradient.jpg')}
					style={GlobalStyles.absolute}
					onLoadEnd={this.imageLoaded.bind(this)}
				/>
				{!!this.state.viewRef && <BlurView
					style={GlobalStyles.absolute}
					viewRef={this.state.viewRef}
					blurType="dark"
					blurAmount={7}
				/>}
				<View style={styles.nav_bar_container}>
					<TouchableOpacity onPress={this.back.bind(this)}>
						<Image style={styles.nav_menu_bt} source={require('../../../img/close.png')}/>
					</TouchableOpacity>
					<Image style={styles.nav_title} source={require('../../../img/uc-logo-2016-white-com.png')}/>
					<TouchableOpacity onPress={this.share.bind(this)}>
						<Image style={styles.nav_menu_bt} source={require('../../../img/share.png')}/>
					</TouchableOpacity>
				</View>
				{!!result && typeof result.totalPrice === 'number' && <Text style={styles.largeText}>
					You got ${totalValue.toFixed(2)} worth of wine for ${result.totalPrice.toFixed(2)}!
					{upgradePct > 10 ? `\n(a ${upgradePct.toFixed(1)}% upgrade value!)` : null}
				</Text> || null}
				<Text style={styles.normalText}>
					You’re all set! But before you go, take a look at your upgrades below. We also emailed you a receipt
					for your records.
				</Text>
				{!!result && <GridView
					itemsPerRow={3}
					renderFooter={null}
					onEndReached={null}
					scrollEnabled={true}
					renderSeparator={null}
					style={styles.listView}
					items={result.bottles}
					fillIncompleteRow={false}
					renderItem={this._renderCell.bind(this)}
					automaticallyAdjustContentInsets={false}/>
				|| null }

			</View>
		);
	}
}
