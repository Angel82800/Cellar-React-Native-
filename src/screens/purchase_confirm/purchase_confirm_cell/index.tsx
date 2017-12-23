'use strict';
import * as React from 'react';
import {
	View,
	Image,
	Text,
	TouchableOpacity
} from 'react-native';

import styles from './styles';
import * as CONSTANTS from '../../../constants';
import {NhItemGroupViewEntity} from 'ucshared';
import {isEmpty} from "../../../utility";

export class PurchaseConfirmCell extends React.Component<{ wine: NhItemGroupViewEntity }, any> {

	constructor(props, context) {
		super(props, context);
	}

	getImageURL(): string {
		let wine = this.props.wine;
		if (wine && wine.bottleImg && !isEmpty(wine.bottleImg)) {
			return CONSTANTS.WINE_BASE_URL + wine.bottleImg[0];
		}
		else {
			return CONSTANTS.WINE_BASE_URL + ''; //todo: add default 'mystery' image
		}
	}

	render() {
		let wine = this.props.wine;
		if (!wine) return null;
		return <TouchableOpacity>
			<View style={styles.container}>
				<Image style={styles.img_container} source={{uri: this.getImageURL()}}>
				</Image>
				<Text style={styles.title} numberOfLines = {2}>
					{wine.displayName || 'Wine'}
					{wine.retailPrice && (" $" + (wine.retailPrice || 0).toFixed(2)) || ""}
				</Text>
				<Text style={styles.upload_title}>
					{wine.pickQty ? "x" + wine.pickQty : ""}
				</Text>
			</View>
		</TouchableOpacity>;
	}
}
