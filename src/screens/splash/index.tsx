import React, {Component} from 'react';
import {
	View,
} from 'react-native';

import {Actions, Scene, Router} from 'react-native-router-flux';

export class Splash extends React.Component<{}, {}> {

	constructor(props) {
		super(props);
	}

	componentDidMount() {
		Actions.home();
	}

	render() {
		return (
			<View/>
		);
	}
}
