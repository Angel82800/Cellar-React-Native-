/**
 * UndergroundCellar
 * Copyright @ 2017 by Roderick L.
 * @flow
 **/
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
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
import { View, ListView, Image, Text, TouchableOpacity, RefreshControl, StatusBar, AsyncStorage } from 'react-native';
import styles from './styles';
import * as Api from 'ucshared';
import { HomeOfferItem } from './home_offer_item/index';
import { isEmpty } from "../../utility";
import { PurchaseConfirm } from "../purchase_confirm";
import { GuideDealAlerts } from "./dealAlerts";
var PushNotification = require('react-native-push-notification');
const MyStatusBar = (_a) => {
    var { backgroundColor } = _a, props = __rest(_a, ["backgroundColor"]);
    return (React.createElement(View, { style: [styles.statusBar, { backgroundColor }] },
        React.createElement(StatusBar, Object.assign({ backgroundColor: backgroundColor }, props))));
};
export class Home extends React.Component {
    constructor(props, context) {
        super(props);
        const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
        this.state = {
            dataSource: ds.cloneWithRows([]),
            data_array: [],
            visible: true,
            deviceToken: "",
            firstLogin: false
        };
    }
    componentDidMount() {
        this.loadFeed();
        this.getLoginInfo();
        PushNotification.checkPermissions(permissions => {
            if (permissions.alert === 1 || permissions.badge === 1 || permissions.sound === 1) {
                //alert('Already registered');
            }
        });
    }
    getLoginInfo() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const value = yield AsyncStorage.getItem("login");
                if (value !== null)
                    this.setState({
                        firstLogin: true
                    });
            }
            catch (error) {
                alert(error);
            }
        });
    }
    loadFeed() {
        this.setState({ visible: true });
        let api = new Api.OfferApi();
        api.offerOfferListHandler({
            'filter': true,
            'skip': 0,
            'take': 100,
            forcePopulate: true
        }).then((result) => {
            this.setState({
                visible: false,
                data_array: result,
                dataSource: this.state.dataSource.cloneWithRows(result)
            });
        }).catch((error) => {
            alert(JSON.stringify(error));
            this.setState({ visible: false });
        });
    }
    renderNav() {
        return React.createElement(View, { style: styles.nav_bar_container },
            React.createElement(Image, { style: styles.background, source: require('../../../img/nav_gradient.jpg') }),
            React.createElement(TouchableOpacity, { onPress: this.props.onDrawerButton.bind(this) },
                React.createElement(Image, { style: styles.nav_menu_bt, source: require('../../../img/menu.png') })),
            React.createElement(Image, { style: styles.nav_title, source: require('../../../img/uc-logo-2016-white-com.png') }),
            React.createElement(View, null));
    }
    renderList() {
        return this.state.dataSource && React.createElement(ListView, { style: styles.list_view, showsVerticalScrollIndicator: false, enableEmptySections: true, dataSource: this.state.dataSource, renderRow: (rowData) => React.createElement(HomeOfferItem, { app: this.props.app, data: rowData }), refreshControl: React.createElement(RefreshControl, { refreshing: this.state.visible, onRefresh: () => this.loadFeed.bind(this) }) });
    }
    onNotifyMe() {
        this.props.app.setState({ showDealAlertsOverlay: true });
    }
    render() {
        const app = this.props.app;
        const isSignedIn = app.isLoggedIn();
        const alreadyPush = !isEmpty(this.state.deviceToken);
        const showDealAlerts = app.state.showDealAlertsOverlay && isSignedIn;
        return (React.createElement(View, { style: styles.container },
            React.createElement(MyStatusBar, { backgroundColor: "#272727", barStyle: "light-content" }),
            React.createElement(View, null,
                this.renderNav(),
                false && isSignedIn && !alreadyPush && React.createElement(View, { style: styles.banner_container },
                    React.createElement(Text, { style: styles.banner_title }, "Never miss a deal!"),
                    React.createElement(TouchableOpacity, { style: styles.banner_bt, onPress: this.onNotifyMe.bind(this) },
                        React.createElement(Text, { style: styles.banner_bt_title }, "NOTIFY ME"))),
                this.renderList()),
            (this.props.app.getPurchase()) ? React.createElement(PurchaseConfirm, { app: this.props.app }) : null,
            showDealAlerts && !this.state.firstLogin && React.createElement(GuideDealAlerts, { app: this.props.app, glass: true })));
    }
}
const drawerStyles = {
    drawer: { shadowColor: '#000000', shadowOpacity: 0.8, shadowRadius: 3 },
    main: { paddingLeft: 3 },
};
//# sourceMappingURL=index.js.map