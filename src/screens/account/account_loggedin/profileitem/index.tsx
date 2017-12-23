import React, {Component} from 'react';
import {
	View,
	Text,
	Image,
} from 'react-native'

import styles from './styles';

export class ProfileCell extends React.Component<{ user: any }, any> {

	constructor(props, context) {
		super(props, context);
	}

	render() {
		const user = this.props.user;
		return (
			<View style={styles.container}>
				<View style={styles.nameContainer}>
					<View style={styles.nameTitleContainer}>
						<View style={styles.itemContainer}>
							<Text style={styles.text}>
								{user.firstName}
							</Text>
						</View>
						<View style={styles.separator}/>
						<View style={styles.itemContainer}>
							<Text style={styles.text}>
								{user.lastName}
							</Text>
						</View>
					</View>
					<Image style={styles.avatar} source={require('../../../../../img/pic-circular-large.png')}/>
				</View>
				<View style={styles.separator}/>
				<View style={styles.itemContainer}>
					<Text style={styles.text}>
						{user.email}
					</Text>
				</View>
			</View>
		);
	}
}