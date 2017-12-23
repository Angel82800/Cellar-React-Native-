import * as React from 'react';
import {
	View,
	ListView,
	Image,
	Text,
	TouchableOpacity,
	ScrollView,
	Navigator, Linking, NavigatorIOS, TouchableHighlight, TimerMixin,
} from 'react-native';
import styles from './styles';
import {menuItems, routes} from "./menu.data";
import {Component, PropTypes} from "react";
import {SessionModel} from 'ucshared';
import {RouteMap} from "../../routemap";
import {App} from "../../app";
import Presenter from 'react-native-presenter';
import {isEmpty} from "../../utility";

class ControlPanelState {
	dataSource: any;
	view_num: number;
	visible: boolean;
}

interface ControlPanelProps {
	app: App;
	closeDrawer: any;
	onDrawerButton: any;
	firstName: string;
	profileUrl: string;
}

class ControlPanel extends React.Component<ControlPanelProps, ControlPanelState> {

	dataSource: any;
	private presenter: Presenter;

	constructor(props: any, context: any) {
		super(props);
		const ds = new ListView.DataSource({rowHasChanged: (r1: any, r2: any) => r1 !== r2});
		this.dataSource = ds.cloneWithRows([]);
		this.state = {
			dataSource: ds.cloneWithRows([]),
			view_num: 0,
			visible: true
		};
	}

	setState(val: any) {
		super.setState(val as any);
	}

	signIn() {
		if (!this.props.app.navigator) {
			alert('No navigator in signIn');
			return;
		}
		let route = RouteMap.LoginScreen;
		route.data = this.props.app.navigator;
		this.props.app.navigator.push(route);
		this.props.closeDrawer();
	}

	accountClick() {
		if (!this.props.app.navigator) {
			alert('No navigator in accountClick');
			return;
		}
		let route = RouteMap.AccountScreen;
		route.data = this.props.app.navigator;
		this.props.app.navigator.push(route);
		this.props.closeDrawer();
	}


	pick(idx) {
		switch (idx) {
			case 1:
				this.props.app.goHome();
				break;
			case 2:
				// this.props.closeDrawer();
				const uri = 'https://www.undergroundcellar.com';
				return Linking.openURL(uri).catch(err => console.error('An error occurred', err));
			case 3:
				this.props.closeDrawer();
				this.props.app.navigateToRoute(RouteMap.Guide);
				break;
			case 4:
				this.props.closeDrawer();
				this.props.app.navigateToRoute(RouteMap.FAQ);
				break;
			case 5:
				const mailUri = 'mailto:support@undergroundcellar.com';
				Linking.openURL(mailUri).catch(err => console.error('An error occurred', err));
				break;
		}
	}


	render() {
		const {firstName, profileUrl} = this.props;
		return (
			<ScrollView style={styles.container}>
				<View style={styles.header} key={0}>
					<View style={styles.headerIcon} key={0}>
						<Image source={require('../../../img/pic-circular-large.png')} style={styles.headerIcon}/>
					</View>
					<View style={styles.headerInfo} key={1}>
						{(this.props.app.isLoggedIn() ?
							<TouchableOpacity
								style={styles.listItem}
								onPress={this.accountClick.bind(this)}>
								<Text style={styles.headerTitle} key={0}>
									Welcome {firstName}
								</Text>
							</TouchableOpacity> :
							<TouchableOpacity
								style={styles.listItem}
								onPress={this.signIn.bind(this)}>
								<Text style={styles.headerTitle} key={0}>
									Sign In {firstName}
								</Text>
							</TouchableOpacity>)
						}
					</View>
				</View>

				<View style={styles.content} key={1}>
					<View>
						{menuItems.map((item, idx) => (
							<TouchableOpacity
								key={idx}
								style={styles.listItem}
								onPress={this.pick.bind(this, item.index)}>
								<Image source={item.thumb} style={styles.listItemImage}/>
								<Text style={styles.listItemTitle}>{item.label}</Text>
							</TouchableOpacity>
						))}
					</View>
				</View>
				<View>
					{menuItems.map((item, idx) => (
						<TouchableOpacity
							key={idx}
							style={styles.listItem}
						>
						</TouchableOpacity>
					))}
				</View>
			</ScrollView>
		);
	}
}

export default ControlPanel;
