import React, {Component, PropTypes} from 'react';
import {
	View,
	Image,
	Text,
	TouchableOpacity,
} from 'react-native';

import styles from './styles';
import {Actions} from 'react-native-router-flux';

export class OfferState extends React.Component<{ data: any }, any> {
	constructor(props, context) {
		super(props, context);
	}

	getOfferContent() {
        var offerContent = "";
        for(var i=0;i<this.props.data.states.length;i++){
            offerContent += this.props.data.states[i]+" , ";
        }
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
