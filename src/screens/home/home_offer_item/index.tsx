'use strict';
import * as React from 'react';
import {
	View, 
	Image,
	Text,
	TouchableOpacity,
	ViewStyle,
	Navigator
} from 'react-native';

import styles from './styles';
import {HomeModule} from './module';
import {App} from "../../../App";
import {OfferV2Entity} from 'ucshared';
import {RouteMap} from "../../../routemap";
var ShareActions = require('react-native-share-actions');

export class HomeOfferItem extends React.Component<{data: OfferV2Entity, app: App}, {}> {

	constructor(props, context) {
		super(props, context);
	}

	pick() {
		let route = RouteMap.Detail;
		route.data = this.props.data;
		this.props.app.navigateToRoute(route);
	}

	checkout() {
		let current_user = this.props.app.getCurrentUser();
		if (current_user) {
			let route = RouteMap.Checkout;
			route.data = this.props.data;
			this.props.app.navigateToRoute(route);
		} else {
			let route = RouteMap.LoginScreen;
			this.props.app.navigateToRoute(route);
		}
	}

	share()	{
		const data = this.props.data;
		ShareActions.share({
		    url: 'https://www.undergroundcellar.com/wine-deals/' + data.url,
		    message: 'Check out ' + data.title + 'from Underground Cellar: ',
		    subject: 'Share Wine'
		  }, 'Share URL')
		    .then(function(result) {
		      if (result.success) {
		        console.log(`Shared via ${result.method}`);
		      }
		    })
		    .catch(function(error) {
		      console.error(error);
		    });
	}

	render() {
		let data = this.props.data;
		return <TouchableOpacity onPress={() => this.pick()}>
			<View style={styles.container as ViewStyle}>
				<Image style={styles.img_container} source={{uri : HomeModule.getImageURL(data)}}>
					<View style={styles.feed_body_container}>
						<View style = {styles.feed_sales_label_container}>
							<Text style={styles.feed_sales_label}>
								{HomeModule.getSalesString(data)}
							</Text>
						</View>
						<View style={styles.feed_body_bt_container}>
							<TouchableOpacity onPress = {this.share.bind(this)}>
								<Image style={styles.feed_body_bt_share} source={require('../../../../img/share.png')}/>
							</TouchableOpacity>
							<TouchableOpacity onPress={this.checkout.bind(this)}>
								<Image style={styles.feed_body_bt_buy}
									   source={require('../../../../img/shopping_bag.png')}/>
							</TouchableOpacity>
						</View>
					</View>
				</Image>
				<View style={styles.feed_footer_container}>
					<View style={styles.feed_foot_win_container}>
						<Text style={styles.feed_wine_name} numberOfLines = {2}>
							{HomeModule.getWineName(data)}
						</Text>
						<Text style={styles.feed_win_price}>
							{HomeModule.getPricePerBottle(data)}
						</Text>
					</View>
					<View style={styles.feed_offer_container}>
						<Text style={styles.feed_offer_desc} numberOfLines = {2}>
							{HomeModule.getWineryName(data)}
						</Text>
						<Text style={styles.feed_offer_upgrade}>
							{HomeModule.getMaxPrice(data)}
						</Text>
					</View>
				</View>
			</View>
		</TouchableOpacity>;
	}
}
