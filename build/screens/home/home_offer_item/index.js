'use strict';
import * as React from 'react';
import { View, Image, Text, TouchableOpacity } from 'react-native';
import styles from './styles';
import { HomeModule } from './module';
import { RouteMap } from "../../../routemap";
var ShareActions = require('react-native-share-actions');
export class HomeOfferItem extends React.Component {
    constructor(props, context) {
        super(props, context);
    }
    pick() {
        let route = RouteMap.Detail;
        route.data = this.props.data;
        this.props.app.navigateToRoute(route);
    }
    checkout() {
        let current_user = this.props.app.getCurrentUser();
        if (current_user) {
            let route = RouteMap.Checkout;
            route.data = this.props.data;
            this.props.app.navigateToRoute(route);
        }
        else {
            let route = RouteMap.LoginScreen;
            this.props.app.navigateToRoute(route);
        }
    }
    share() {
        const data = this.props.data;
        ShareActions.share({
            url: 'https://www.undergroundcellar.com/wine-deals/' + data.url,
            message: 'Check out ' + data.title + 'from Underground Cellar: ',
            subject: 'Share Wine'
        }, 'Share URL')
            .then(function (result) {
            if (result.success) {
                console.log(`Shared via ${result.method}`);
            }
        })
            .catch(function (error) {
            console.error(error);
        });
    }
    render() {
        let data = this.props.data;
        return React.createElement(TouchableOpacity, { onPress: () => this.pick() },
            React.createElement(View, { style: styles.container },
                React.createElement(Image, { style: styles.img_container, source: { uri: HomeModule.getImageURL(data) } },
                    React.createElement(View, { style: styles.feed_body_container },
                        React.createElement(View, { style: styles.feed_sales_label_container },
                            React.createElement(Text, { style: styles.feed_sales_label }, HomeModule.getSalesString(data))),
                        React.createElement(View, { style: styles.feed_body_bt_container },
                            React.createElement(TouchableOpacity, { onPress: this.share.bind(this) },
                                React.createElement(Image, { style: styles.feed_body_bt_share, source: require('../../../../img/share.png') })),
                            React.createElement(TouchableOpacity, { onPress: this.checkout.bind(this) },
                                React.createElement(Image, { style: styles.feed_body_bt_buy, source: require('../../../../img/shopping_bag.png') }))))),
                React.createElement(View, { style: styles.feed_footer_container },
                    React.createElement(View, { style: styles.feed_foot_win_container },
                        React.createElement(Text, { style: styles.feed_wine_name, numberOfLines: 2 }, HomeModule.getWineName(data)),
                        React.createElement(Text, { style: styles.feed_win_price }, HomeModule.getPricePerBottle(data))),
                    React.createElement(View, { style: styles.feed_offer_container },
                        React.createElement(Text, { style: styles.feed_offer_desc, numberOfLines: 2 }, HomeModule.getWineryName(data)),
                        React.createElement(Text, { style: styles.feed_offer_upgrade }, HomeModule.getMaxPrice(data))))));
    }
}
//# sourceMappingURL=index.js.map