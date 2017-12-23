var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) if (e.indexOf(p[i]) < 0)
            t[p[i]] = s[p[i]];
    return t;
};
import * as React from 'react';
import { View, Text, TouchableOpacity, StatusBar, } from 'react-native';
import styles from './styles';
import { Offer } from '../offer';
import { Feed } from '../feed';
import { Wine } from '../wine';
import * as Api from 'ucshared';
import { CommonHeading } from "../../components/heading";
import { RouteMap } from "../../routemap";
var ShareActions = require('react-native-share-actions');
export const MyStatusBar = (_a) => {
    var { backgroundColor } = _a, props = __rest(_a, ["backgroundColor"]);
    return (React.createElement(View, { style: [styles.statusBar, { backgroundColor }] },
        React.createElement(StatusBar, Object.assign({ backgroundColor: backgroundColor }, props))));
};
export class Detail extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            view_num: 0,
            visible: true,
            offer: {},
            wines: [],
            feeds: [],
        };
        this.shareOffer = this.shareOffer.bind(this);
    }
    componentDidMount() {
        this.setState({ view_num: 0 });
        this.loadData();
    }
    loadData() {
        let offer = this.props.data;
        let url = offer.url;
        this.loadLiveFeed(url);
        this.bindOffer();
    }
    bindOffer() {
        this.setState({ offer: this.props.data, wines: this.props.data.itemGroupsFlat });
    }
    loadLiveFeed(url) {
        let api = new Api.OfferApi();
        api.offerGetLiveFeed({ 'offerSef': url }).then((result) => {
            this.setState({ feeds: result });
        }).catch((error) => {
            alert(error);
            this.setState({ visible: false });
        });
    }
    getTabTitleStyle(index) {
        if (index === this.state.view_num) {
            return styles.tab_active_title;
        }
        else {
            return styles.tab_inactive_title;
        }
    }
    getTabLineStyle(index) {
        if (index === this.state.view_num) {
            return styles.tab_active_line;
        }
        else {
            return styles.tab_inactive_line;
        }
    }
    setTabStatus(index) {
        this.setState({ view_num: index });
    }
    getBtTitle(offer) {
        let minPrice = (offer.minPrice || 0).toFixed(0);
        return "BUY NOW | $" + minPrice + " per " + offer.offerItemName;
    }
    onCheckout() {
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
    onBack() {
        this.props.navigator.pop();
    }
    getInnerContent() {
        switch (this.state.view_num) {
            case 0: return React.createElement(Offer, { style: { flex: 1 }, offer: this.props.data });
            case 1: return React.createElement(Wine, { style: { flex: 1 }, wines: this.state.wines });
            case 2: return React.createElement(Feed, { style: { flex: 1 }, feeds: this.state.feeds });
        }
    }
    shareOffer() {
        this.props.app.getCurrentUser().then(user => {
            const offer = this.props.data;
            const shareLink = "https://www.undergroundcellar.com/wine-deals/" + offer.url;
            ShareActions.share({
                url: shareLink,
                message: 'Check out UndergroundCellar\'s ' + offer.title + ' wine deal!',
                subject: 'Share This Offer'
            }, 'Share URL')
                .then(function (result) {
                if (result.success) {
                    console.log(`Shared via ${result.method}`);
                }
            })
                .catch(function (error) {
                console.error(error);
            });
        });
    }
    render() {
        return (React.createElement(View, { style: styles.container },
            React.createElement(CommonHeading, { title: this.state.offer.title || 'Special Offer', onBack: this.onBack.bind(this), bottomless: true, actionText: "Share", onAction: this.shareOffer }),
            React.createElement(View, { style: styles.tabBarView },
                React.createElement(TouchableOpacity, { style: styles.tabBar, onPress: this.setTabStatus.bind(this, 0), activeOpacity: 1 },
                    React.createElement(View, null,
                        React.createElement(Text, { style: this.state.view_num === 0 ? styles.tab_active_title : styles.tab_inactive_title }, "Offer"),
                        React.createElement(View, { style: this.state.view_num == 0 ? styles.tab_active_line : styles.tab_inactive_line }))),
                React.createElement(TouchableOpacity, { style: styles.tabBar, onPress: this.setTabStatus.bind(this, 1), activeOpacity: 1 },
                    React.createElement(View, null,
                        React.createElement(Text, { style: this.state.view_num === 1 ? styles.tab_active_title : styles.tab_inactive_title }, "Wine"),
                        React.createElement(View, { style: this.state.view_num == 1 ? styles.tab_active_line : styles.tab_inactive_line }))),
                React.createElement(TouchableOpacity, { style: styles.tabBar, onPress: this.setTabStatus.bind(this, 2), activeOpacity: 1 },
                    React.createElement(View, null,
                        React.createElement(Text, { style: this.state.view_num === 2 ? styles.tab_active_title : styles.tab_inactive_title }, "Live Feed"),
                        React.createElement(View, { style: this.state.view_num == 2 ? styles.tab_active_line : styles.tab_inactive_line })))),
            React.createElement(View, { style: styles.mainView }, this.getInnerContent()),
            React.createElement(TouchableOpacity, { style: styles.buy_bt_container, onPress: this.onCheckout.bind(this) },
                React.createElement(View, null,
                    React.createElement(Text, { style: styles.login_bt }, this.getBtTitle(this.state.offer))))));
    }
}
//# sourceMappingURL=index.js.map