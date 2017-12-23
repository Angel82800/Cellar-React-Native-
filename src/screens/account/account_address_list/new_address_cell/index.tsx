import React, {Component, PropTypes} from 'react';
import {
	View,
	Image,
	Text,
	TouchableOpacity,
} from 'react-native';

import styles from './styles';

export class NewAddressCell extends React.Component<{}, {}> {

	constructor(props, context) {
		super(props, context);
	}

	render() {
		// let data = this.props.data;
		// let rowID = this.props.index;
		// let user = this.props.user;
		return (
			<View style={styles.container}>
				<Text style={styles.text}>
					Add a new address
				</Text>
				<Image style={styles.icon} source={require('../../../../../img/accesorygray.png')}/>
			</View>
		);
	}
}
