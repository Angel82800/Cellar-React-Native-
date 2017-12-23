import React, {Component, PropTypes} from 'react';
import {
    View,
    Image,
    Text,
    TouchableOpacity,
} from 'react-native';

import styles from './styles';
import * as CONSTANTS from '../../../constants';

export class WineItem extends React.Component<{ data: any }, {}> {

    constructor(props, context) {
        super(props, context);
    }

    getWineTitle(data)	{
        let wineTitle = this.props.data.displayName;
        return wineTitle;
    }

    getWinePrice(data)	{
        let winePrice = this.props.data.retailPrice;
        let price = winePrice === undefined ? "-" : winePrice;
        return "$" + price.toFixed(2) + " at the winery";
    }

    getPercentage(data)	{
        let percentage = this.props.data.estChance;
        let percentage_st = Number.parseFloat(percentage).toFixed(4);
        let percentage_fl = Number.parseFloat(percentage_st);
        percentage_fl = percentage_fl * 100;
        return percentage === undefined ? "" : percentage_fl.toFixed(2) + "% of bottles";
    }

    getDescription(data)	{
        return this.props.data.displayDesc;
    }

    getImageURL(data)	{
        let imagePath = this.props.data.bottleImg[0];
        let imageURL = CONSTANTS.WINE_BASE_URL + imagePath;

        return imageURL;
    }

    render() {
        let {data} = this.props.data;
        return <View style={styles.container}>
            <Image style={styles.wine_image} source={{uri: this.getImageURL(data)}}/>
            <View style={styles.description_container}>
                <Text style={styles.wine_title}>
                    {this.getWineTitle(data)}
                </Text>
                <View style={{flexDirection:'row'}}>
                <Text style={styles.wine_price}>
                    {this.getWinePrice(data)}
                </Text>
                <Text style={styles.percentage}>
                    {this.getPercentage(data)}
                </Text>
                </View>
                <Text style={styles.description}>
                    {this.getDescription(data)}
                </Text>
            </View>
        </View>;
    }
}
