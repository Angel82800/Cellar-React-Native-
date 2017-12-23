import React, {Component, PropTypes} from 'react';
import {
	View,
	Image,
	Text,
	TouchableOpacity,
} from 'react-native';

import styles from './styles';
import {NhAddressModel} from 'ucshared';

export class AddressCell extends React.Component<{ address: NhAddressModel }, any> {

	constructor(props, context) {
		super(props, context);
	}

	render() {
		let address = this.props.address;
		return (
			<View style={styles.container}>
				<View style={styles.itemContainer}>
					<Text style={styles.text}>
						{address.firstName + " " + address.lastName}
					</Text>
					<Text style={styles.text}>
						{address.address1}
					</Text>
					<Text style={styles.text}>
						{address.city + ", " + address.state + " " + address.zip}
					</Text>
					<Text style={styles.text}>
						{address.phone}
					</Text>
				</View>
				<Image style={styles.icon} source={require('../../../../../img/accesorygray.png')}/>
			</View>
		);
	}
}
