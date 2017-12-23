import React, {Component, PropTypes} from 'react';
import {
	View,
	Image,
	Text,
	TouchableOpacity,
} from 'react-native';

import styles from './styles';
import Module from './module';
import {Actions} from 'react-native-router-flux';

export class AboutWine extends React.Component<{ data: any }, {}> {
	constructor(props, context) {
		super(props, context);
	}

	getWineryAbout(data)	{
		let wineryAbout = this.props.data.wineryAbout;
		return wineryAbout === undefined ? "" : wineryAbout;
	}

	render() {
		let {data} = this.props.data;
		return <View style={styles.container}>
			<Text style={styles.content}>
				{this.getWineryAbout(data)}
			</Text>
		</View>;
	}
}
