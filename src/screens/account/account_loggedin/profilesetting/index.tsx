import React, {Component, PropTypes} from 'react';
import {
	View,
	Image,
	Text,
	TouchableOpacity,
} from 'react-native';

import styles from './styles';

export class ProfileSetting extends React.Component<{ data: string, index: string | number, user: any }, any> {

	constructor(props, context) {
		super(props, context);
	}

	componnentDidMount() {
		let data = this.props.data;
	}

	render() {
		let data = this.props.data;
		let rowID = this.props.index;
		let user = this.props.user;
		return (
			<View style={styles.container}>
				<View style={styles.itemContainer}>
					<Text style={styles.text}>
						{data}
					</Text>
					{rowID === '1:0' || rowID === '1:1' ?
						<Image style={styles.icon}
							   source={require('../../../../../img/accesorygray.png')}/> : rowID === '1:2' ?
							<Text style={styles.rightText}>{ '$' + 0}</Text> : <View/>}
				</View>
			</View>
		);
	}
}
