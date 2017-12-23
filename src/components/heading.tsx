import React, {Component} from 'react';
import {
	View,
	Text,
	Image,
	TouchableOpacity,
	ScrollView, TextInput, TextStyle, ViewStyle, ImageStyle,
} from 'react-native'

import styles from './styles';
import {RouteMap} from '../routemap';
import {MyStatusBar} from "../screens/details/index";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import {Colors, Fonts} from "../constants";

export class CommonHeading extends React.Component<{
	title: string,
	onBack: Function,
	actionText?: string,
	onAction?: Function,
	bottomless?: boolean,
	isPresent?: boolean
}, any> {

	constructor(props, context) {
		super(props, context);
	}

	onBack() {
		if (typeof this.props.onBack === 'function') {
			this.props.onBack();
		}
	}

	onAction() {
		if (typeof this.props.onAction === 'function') {
			this.props.onAction();
		}
	}

	render() {
		let imgStyle = {position: 'absolute',
			right : 0,
			left : 0,
			bottom : 0,
			top : 0
		} as ImageStyle;

		if (!this.props.bottomless) {
			imgStyle.height = 54;
			imgStyle.resizeMode = 'stretch';
		}

		return (
			<View>
				<MyStatusBar backgroundColor="#000000" barStyle="light-content"/>
				<View style={{
					height : 54, //(Platform.OS === 'ios') ? 64 : 54,
				}}>
					<Image style={imgStyle} source={require('../../img/nav_gradient.jpg')}/>

					<View style={{flexDirection: 'row', alignItems: 'center', padding: 12}}>

						<View style={{flex: 0.2}}>
							<TouchableOpacity style={{
								width: 24,
								flexDirection: 'row'
							}} onPress={this.onBack.bind(this)}>
								<Image style={{
									flex: 1,
									resizeMode: 'contain',
									tintColor : 'white',
								}} source={require('../../img/back.png')}/>
							</TouchableOpacity>
						</View>

						<Text style={{
							fontSize : 16,
							flex: 0.8,
							color : 'white',
							backgroundColor: 'transparent',
							fontFamily: Fonts.body,
							textAlignVertical: 'center',
							textAlign: 'center'
						} as TextStyle}>
							{this.props.title}
						</Text>

						<TouchableOpacity style={{
							flex: 0.2,
							flexDirection: 'row'
						} as ViewStyle} onPress={this.onAction.bind(this)}>
							{this.props.actionText && <Text style={{
								fontSize : 14,
								color : 'white',
								alignSelf: 'center',
								flex: 1,
								backgroundColor: 'transparent',
								textAlign: 'right',
								textAlignVertical: 'center',
								fontFamily: Fonts.body,
								fontWeight: 'bold'
							}}>
								{this.props.actionText.toUpperCase()}
							</Text>}
						</TouchableOpacity>

					</View>

				</View>
				{!this.props.bottomless && <View style={{height: 1, backgroundColor: Colors.grayText}}>
				</View>}
			</View>);
	}
}