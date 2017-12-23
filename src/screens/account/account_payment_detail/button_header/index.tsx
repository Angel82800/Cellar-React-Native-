import React, {Component, PropTypes} from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Platform} from 'react-native';
import { CardIOModule, CardIOUtilities } from 'react-native-awesome-card-io';

import styles from './styles'

export class ButtonHeader extends React.Component<{onScanCard: Function}, {}> {
    constructor(props, context) {
        super(props, context);
    }

    componentWillMount() {
    	if (Platform.OS === "ios") {
		    CardIOUtilities.preload();
	    }
    }

    scanCard() {
		CardIOModule
			.scanCard({
				useCardIOLogo: true
			})
			.then(card => {
				if (typeof this.props.onScanCard === 'function') {
					this.props.onScanCard(card);
				}
			})
			.catch(() => {
				// the user cancelled
			})
    }

    manageHeader(){
        // alert(this.props.data)
        return  (<TouchableOpacity style={styles.container} onPress={this.scanCard.bind(this)}>
                <Text style={styles.textSmall}>or</Text>
                <Text style = {styles.textLarge}>SCAN YOUR CARD</Text>
            </TouchableOpacity>);
    }

    render() {
        return this.manageHeader()
    }
}