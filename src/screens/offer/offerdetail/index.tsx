import React, {Component, PropTypes} from 'react';
import {
	View,
	Image,
	Text,
	TouchableOpacity,
} from 'react-native';

import styles from './styles';
import {Actions} from 'react-native-router-flux';

export class OfferDetail extends React.Component<{ data: any }, any> {
	constructor(props, context) {
		super(props, context);
	}

	getOfferContent() {
		let offerContent = this.props.data.offerContent;
		return offerContent === undefined ? "" : offerContent;
	}

	render() {
		return <View style={styles.container}>
			<Text style={styles.content}>
				{this.getOfferContent()}
			</Text>
		</View>;
	}
}
