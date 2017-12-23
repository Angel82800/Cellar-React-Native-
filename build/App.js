'use strict';
import * as React from 'react';
import Drawer from 'react-native-drawer';
import { Navigator, AppRegistry, Alert, Linking, Platform } from 'react-native';
import { Actions, Scene } from 'react-native-router-flux';
import { Detail } from "./screens/details";
import ControlPanel from "./screens/DrawerSideMenu/ControlPanel";
import { routes } from "./screens/DrawerSideMenu/menu.data";
import { Home } from "./screens/home/index";
import { Guide } from "./screens/guide";
import { FAQ } from "./screens/faq";
import { TapScreen } from "./screens/tapscreen";
import { AddressApi, OfferApi, PaymentApi, SessionApi } from 'ucshared';
import { SignIn } from "./screens/account/account_index";
import { PasswordRecovery } from "./screens/account/forgot_password";
import { LoggedInAccount } from "./screens/account/account_loggedin";
import { PaymentListPage } from "./screens/account/account_payment_list";
import { AddressDetailPage } from "./screens/account/account_address_detail";
import { AddressListPage } from "./screens/account/account_address_list";
import { AppState } from "./app_state";
import { PaymentDetailPage } from "./screens/account/account_payment_detail";
import { CheckoutPage } from "./screens/checkout/checkout";
import { PickerView } from './components/pickerview';
import store from 'react-native-simple-store';
import { isEmpty } from "./utility";
import { RouteMap } from "./routemap";
var PushNotification = require('react-native-push-notification');
const scenes = Actions.create(React.createElement(Scene, { key: "root" },
    React.createElement(Scene, { key: "home", component: Home, navigationBarStyle: { backgroundColor: 'black' }, hideNavBar: true })));
export class App extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.navigateTo = this.navigateTo.bind(this);
        this.state = new AppState();
    }
    componentDidMount() {
        // register deep-link handler
        if (Platform.OS === 'android') {
            Linking.getInitialURL().then(url => {
                this.handleOpenURL(url);
            });
        }
        else {
            Linking.addEventListener('url', (event) => this.handleOpenURL(event.url));
        }
        this.getCurrentUser().then(user => {
            // decide if user is logged in and show the appropriate default screen
            if (this.isLoggedIn()) {
                this.goHome();
            }
            else {
                this.navigateToRoute(RouteMap.Guide);
            }
        });
    }
    componentWillMount() {
        // PushNotificationIOS.addEventListener('register', this._onRegistered);
        // PushNotificationIOS.addEventListener('registrationError', this._onRegistrationError);
        // PushNotificationIOS.addEventListener('notification', this._onRemoteNotification);
        // PushNotificationIOS.addEventListener('localNotification', this._onLocalNotification);
    }
    componentWillUnmount() {
        Linking.removeEventListener('url', this.handleOpenURL);
    }
    handleOpenURL(url) {
        if (!url)
            return;
        const route = url.replace(/.*?:\/\//g, '');
        const id = route.match(/\/([^\/]+)\/?$/)[1];
        const routeName = route.split('/')[0];
        if (routeName === 'wine-deals' || routeName === 'offer') {
            const api = new OfferApi();
            api.offerHttpGetAdminV2OfferSef({ offerSef: id }).then(offer => this.navigateToRoute(RouteMap.Detail, offer));
        }
        else if (routeName === 'winery') {
            //todo: winery route
        }
        else if (routeName === 'wine') {
            //todo: wine route
        }
        else {
            this.navigateToRoute(RouteMap.Home);
        }
    }
    goBack() {
        this.navigator.pop();
    }
    goHome() {
        this.closeDrawer();
        this.navigator.resetTo(RouteMap.Home);
    }
    navigateToRoute(route, data) {
        if (typeof data !== 'undefined') {
            route.data = data;
        }
        this.navigator.push(route);
    }
    navigateToPicker(list, onValueSelected) {
        if (typeof onValueSelected === 'function') {
            this.navigateToRoute(RouteMap.PickerView, {
                list: list,
                onValueSelected: (x, i) => onValueSelected(x, i)
            });
        }
        else {
            Alert.alert('Invalid argument to navigateToPicker');
        }
    }
    navigateTo(idx) {
        this.drawer.closeDrawer();
        let _routes = routes.slice();
        let hasRoute = false;
        if (idx === 0) {
            this.navigator.resetTo(routes[0]);
            this.setState({
                routes: _routes
            });
        }
        else {
            hasRoute = _routes.some((item, index, array) => {
                if (item === idx) {
                    this.navigator.popN(_routes.length - 1 - index);
                    _routes = routes.slice(0, index + 1);
                    return true;
                }
                return false;
            });
            if (!hasRoute) {
                this.navigator.push(routes[idx]);
            }
            if (hasRoute) {
                this.setState({
                    routes: _routes
                });
            }
            else {
                this.setState({
                    routes: [...this.state.routes, idx]
                });
            }
        }
    }
    setCurrentUser(newSession, callback, paymentCallback, addressCallback) {
        // Save newSession persistent so that it can be restored next time app starts.
        store.save('profile_session', newSession).then(() => {
            if (typeof callback === 'function') {
                this.setState({ session: newSession }, () => callback());
            }
            else {
                this.setState({ session: newSession });
            }
            if (newSession && (newSession.sessionUserFname || '').length > 0) {
                const paymentApi = new PaymentApi();
                const addressApi = new AddressApi();
                const sessionReq = { sessionId: newSession.sessionId || '' };
                paymentApi.paymentSessionGetPaymentsList(sessionReq).then(payments => this.setState({
                    currentPayments: payments,
                    selectedPayment: payments.length > 0 ? payments[0] : null
                }, () => { if (typeof paymentCallback === 'function')
                    paymentCallback(); }), err => {
                });
                addressApi.addressSessionGetAddressList(sessionReq).then(addresses => this.setState({
                    currentAddresses: addresses,
                    selectedAddress: addresses.length > 0 ? addresses[0] : null
                }, () => { if (typeof addressCallback === 'function')
                    addressCallback(); }), err => {
                });
            }
        });
    }
    isLoggedIn() {
        if (!this.state.session)
            return false;
        return !isEmpty(this.state.session.sessionUserUrlProfile);
    }
    getCurrentUser() {
        return new Promise((resolve, reject) => {
            if (this.state.session && !isEmpty(this.state.session.sessionId)) {
                resolve(this.state.session);
                return;
            }
            // try to get from storage
            store.get('profile_session').then((sessionFromLocalStorage) => {
                const sId = sessionFromLocalStorage && sessionFromLocalStorage.sessionId;
                if (!isEmpty(sId)) {
                    //ok - from storage
                    this.setCurrentUser(sessionFromLocalStorage, () => resolve(sessionFromLocalStorage));
                }
                else {
                    //nope - need to get new from server
                    const api = new SessionApi();
                    api.sessionGet().then(apiSession => {
                        // ok- from server, need to save in storage
                        this.setCurrentUser(apiSession, () => resolve(apiSession));
                    }, err => reject(err));
                }
            });
        });
    }
    getCurrentUserId() {
        const session = this.state.session;
        return session && session.sessionId || '';
    }
    openDrawer() {
        this.drawer.open();
        this.setState({ isDrawerClosed: false });
    }
    closeDrawer() {
        this.drawer.close();
        this.setState({ isDrawerClosed: true });
    }
    //Todo: Cleanup. used other way, probably this one will not needed
    toggleDrawer() {
        if (this.state.isDrawerClosed === true) {
            this.openDrawer();
        }
        else {
            this.closeDrawer();
        }
    }
    setQuantity(qty, callback) {
        this.setState({ selectedQty: qty }, callback);
    }
    handleCheckoutCompleted(result) {
        this.setState({ currentPurchase: result }, () => {
            if (result) {
                this.setState({ drawerDisabled: true }, () => this.goHome());
            }
            else {
                this.setState({ drawerDisabled: false });
            }
        });
    }
    getPurchase() {
        return this.state.currentPurchase;
    }
    renderScene(route, navigator) {
        switch (route.id) {
            case RouteMap.Detail.id:
                return React.createElement(Detail, { navigator: navigator, data: route.data, app: this });
            case RouteMap.LoginScreen.id:
                return React.createElement(SignIn, { navigator: navigator, app: this, data: route.data });
            case RouteMap.AccountScreen.id:
                return React.createElement(LoggedInAccount, { navigator: navigator, app: this });
            case RouteMap.PasswordRecovery.id:
                return React.createElement(PasswordRecovery, { navigator: navigator });
            case RouteMap.Guide.id:
                return React.createElement(Guide, { guideApp: this, disableDrawer: this.disableDrawer.bind(this) });
            case RouteMap.PaymentDetail.id:
                return React.createElement(PaymentDetailPage, { navigator: navigator, app: this });
            case RouteMap.PaymentList.id:
                return React.createElement(PaymentListPage, { navigator: navigator, app: this, paymentList: this.state.currentPayments, selectedPayment: this.state.selectedPayment });
            case RouteMap.PaymentSelect.id:
                return React.createElement(PaymentListPage, { navigator: navigator, app: this, paymentList: this.state.currentPayments, selectedPayment: this.state.selectedPayment, selectOnly: true, onChangePayment: pp => this.setState({ selectedPayment: pp }) });
            case RouteMap.FAQ.id:
                return React.createElement(FAQ, { app: this, navigator: navigator });
            case RouteMap.AddressDetail.id:
                return React.createElement(AddressDetailPage, { navigator: navigator, app: this, selectedAddress: this.state.selectedAddress, onAddressChange: address => this.setState({ selectedAddress: address }) });
            case RouteMap.AddressList.id:
                return React.createElement(AddressListPage, { navigator: navigator, app: this, selectOnly: route.data ? true : false, onChangeAddress: address => this.setState({ selectedAddress: address }) });
            case RouteMap.AddressSelect.id:
                return React.createElement(AddressListPage, { navigator: navigator, app: this, selectOnly: true, onChangeAddress: address => this.setState({ selectedAddress: address }) });
            case RouteMap.Checkout.id:
                return React.createElement(CheckoutPage, { app: this, address: this.state.selectedAddress, payment: this.state.selectedPayment, offer: route.data, qty: this.state.selectedQty });
            case RouteMap.PickerView.id:
                return React.createElement(PickerView, { data: route.data.list, selectItem: this.state.selectedAddress, app: this, onValueSelected: route.data.onValueSelected });
            case RouteMap.Home.id:
                return React.createElement(Home, { onDrawerButton: this.toggleDrawer.bind(this), navigator: navigator, openDrawer: this.openDrawer.bind(this), app: this });
            default:
                return React.createElement(TapScreen, { navigator: navigator });
        }
    }
    disableDrawer() { this.setState({ drawerDisabled: true }); }
    enableDrawer() { this.setState({ drawerDisabled: false }); }
    render() {
        let controlPanel = React.createElement(ControlPanel, { app: this, closeDrawer: () => this.closeDrawer(), onDrawerButton: this.toggleDrawer.bind(this), firstName: this.state.session && this.state.session.sessionUserFname || '', profileUrl: this.state.session && this.state.session.sessionUserUrlProfile || '' });
        let disabled = this.state.drawerDisabled || !!this.getPurchase();
        return (React.createElement(Drawer, { drawerType: this.state.drawerType, onDrawerButton: this.toggleDrawer.bind(this), closedDrawerOffset: this.state.closedDrawerOffset, openDrawerOffset: this.state.openDrawerOffset, panOpenMask: this.state.panOpenMask, panCloseMask: this.state.panCloseMask, relativeDrag: this.state.relativeDrag, panStartCompensation: this.state.panStartCompensation, tweenHandlerOn: this.state.tweenHandlerOn, disabled: disabled, panThreshold: this.state.panThreshold, tweenEasing: this.state.tweenEasing, tweenHandlerPreset: this.state.tweenHandlerPreset, animation: this.state.animation, acceptTap: this.state.acceptTap, acceptDoubleTap: this.state.acceptDoubleTap, acceptPan: this.state.acceptPan, tapToClose: this.state.tapToClose, negotiatePan: this.state.negotiatePan, side: this.state.side, navigator: navigator, content: controlPanel, styles: drawerStyles, ref: e => this.drawer = e, tweenHandler: Drawer.tweenPresets.parallax, isDrawerClosed: disabled || this.state.isDrawerClosed },
            React.createElement(Navigator, { ref: (ref) => this.navigator = ref, configureScene: (route) => Navigator.SceneConfigs.FloatFromLeft, initialRoute: RouteMap.TapScreen, renderScene: (route, navigator) => this.renderScene(route, navigator) })));
    }
}
const drawerStyles = {
    drawer: { shadowColor: '#000000', shadowOpacity: 0.8, shadowRadius: 3 },
    main: { paddingLeft: 0 },
};
AppRegistry.registerComponent('UndergroundCellar', () => App);
//# sourceMappingURL=App.js.map