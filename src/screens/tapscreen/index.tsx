import React from "react";
import {Image, Text, TouchableOpacity, View} from "react-native";

import styles from "./styles";
import {RouteMap} from "../../routemap";

export class TapScreen extends React.Component<any, any>	{
	
	constructor(props, context)	{
		super(props, context);
	}

	next() {
		let route = RouteMap.Guide;
		this.props.navigator.push(route);
	}

	render() {
		return (
			<View style = {styles.container}>
				<Image style = {styles.background} source = {require('../../../img/blue_wood.jpg')}>
				<TouchableOpacity style = {styles.buttonContainer} onPress = {() => this.next()}>
					<Text style = {styles.btTitle}>
						tap to continue
					</Text>
				</TouchableOpacity>
				</Image>
			</View>
			);
	}
}
