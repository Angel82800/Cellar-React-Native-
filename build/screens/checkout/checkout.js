import React from 'react';
import { View, Text, Image, TouchableOpacity, TextInput, Alert, } from 'react-native';
import styles from './styles';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Colors, Fonts } from "../../constants";
import { CommonHeading } from "../../components/heading";
import Icon from 'react-native-vector-icons/FontAwesome';
import { CheckoutApiApi } from 'ucshared';
import { isEmpty } from "../../utility";
import { HomeModule } from "../home/home_offer_item/module";
import { RouteMap } from "../../routemap";
export class CheckoutState {
    constructor() {
        this.promoCode = '';
        this.apiResult = null;
        this.isSubmitted = false;
    }
}
export class CheckoutPage extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.qtyLabels = [];
        this.qtyValues = [];
        this.state = new CheckoutState();
    }
    componentDidMount() {
        this.props.app.disableDrawer();
        this.updateTotals();
    }
    onBack() {
        if (!this.state.isSubmitted) {
            const app = this.props.app;
            this.props.app.enableDrawer();
            app.goBack();
        }
    }
    shippingInfo() {
        Alert.alert('Shipping and Delivery', 'Once your purchases arrive in your CloudCellar, you ' +
            'can pick and choose which bottles to ship where. You can split cases, mix and match, ' +
            'and save big on shipping fees when you ship multiple bottles!');
    }
    doPayment() {
        const app = this.props.app;
        app.navigateToRoute(RouteMap.PaymentSelect);
    }
    getApiModel(user) {
        let pc = [];
        if (!isEmpty(this.state.promoCode)) {
            pc.push({
                code: this.state.promoCode
            });
        }
        return {
            bottlesQty: this.props.qty,
            offerSef: this.props.offer.url,
            sessionUtmCampaign: 'app',
            sessionUtmMedium: 'app',
            sessionUtmSource: 'app',
            appId: 'rn-1',
            creditCardId: this.props.payment && this.props.payment.id || '',
            userGuid: user.sessionUserGuid || '',
            offerGuid: this.props.offer.offerGuid || '',
            promoCode: pc,
            useAccountCredit: true,
            shippingAddressId: '',
            revealDate: new Date(),
            validationErrors: [],
            validationWarnings: [],
            noAuthAddress: {},
            apiResult: {}
        };
    }
    getActualResult() {
        if (!this.state)
            return null;
        if (!this.state.apiResult)
            return null;
        if (!this.state.apiResult.value)
            return null;
        return this.state.apiResult.value.result;
    }
    checkPromoError() {
        const res = this.getActualResult();
        if (res) {
            const pr = res.promotionsUsed;
            if (!pr || pr.length == 0)
                return;
            let pr0 = pr[0];
            let message = CheckoutPage.promoErrorMessage(parseInt(pr0.error || "0"), pr0.code);
            if (!isEmpty(message)) {
                Alert.alert('Promo code invalid', message);
                this.setState({ promoCode: '' });
            }
        }
    }
    static promoErrorMessage(promoErrNo, promoCode) {
        switch (promoErrNo) {
            case 0: return '';
            case 1: return `Invalid promo code ${promoCode}.`;
            case 2: return `Promotion code ${promoCode} is expired.`;
            case 3: return `Promotion code ${promoCode} is valid only on first order.`;
            case 4: return `Promotion code ${promoCode} needs to be redeemed by Customer Service.`;
            case 5: return `Promotion code ${promoCode} has been redeemed the maximum number of times.`;
            default: return `Promotion code ${promoCode} cannot be used right now.`;
        }
    }
    updateTotals() {
        this.setState({ apiResult: null, isSubmitted: true }, () => this.props.app.getCurrentUser().then(user => {
            const api = new CheckoutApiApi();
            api.checkoutApiPutFromSessionV3({
                sessionId: this.props.app.getCurrentUserId(),
                offerCheckoutInfo: this.getApiModel(user)
            }).then((result) => {
                this.setState({
                    apiResult: result,
                    isSubmitted: false
                }, () => this.checkPromoError());
            }, (err) => {
                Alert.alert(JSON.stringify(err));
                this.setState({ isSubmitted: false });
            });
        }));
    }
    doCheckout() {
        if (this.state.isSubmitted)
            return;
        this.setState({ isSubmitted: true }, () => this.props.app.getCurrentUser().then(user => {
            const api = new CheckoutApiApi();
            api.checkoutApiPostFromSessionV3({
                sessionId: this.props.app.getCurrentUserId(),
                offerCheckoutInfo: this.getApiModel(user)
            }).then((result) => {
                //this.setState({isSubmitted: false});
                if (result.success && result.value) {
                    this.props.app.handleCheckoutCompleted(result.value);
                }
                else if (typeof result.message === 'string') {
                    Alert.alert("Error", result.message);
                    this.setState({ isSubmitted: false });
                }
                else {
                    Alert.alert("Error", JSON.stringify(result));
                    this.setState({ isSubmitted: false });
                }
            }, (err) => {
                Alert.alert("Oops!", "Sorry, we couldn't authorize the transaction. Please check your information and try again." + JSON.stringify(err));
                this.setState({ isSubmitted: false });
            });
        }, err => alert(JSON.stringify(err))));
    }
    updateQtyPickerItems() {
        const offer = this.props.offer;
        if (offer && offer.numberOfUpgradesGuaranteed) {
            let options = [];
            let qtys = [];
            for (let i = (offer.minQtyAllow || 1); i <= (offer.maxQtyAllow || 0); ++i) {
                const upgrades = (offer.numberOfUpgradesGuaranteed[i] || 0);
                const itemName = (i === 1 ? offer.offerItemName : offer.offerItemNamePlural) || 'bottle(s)';
                options.push(`${i} ${itemName} - ${upgrades} upgrade${upgrades != 1 ? 's' : ''} guaranteed`);
                qtys.push(i);
            }
            this.qtyLabels = options;
            this.qtyValues = qtys;
        }
    }
    doQuantity() {
        this.props.app.navigateToPicker(this.qtyLabels, (label, rowId) => {
            if (label.indexOf('0 upgrade') > -1) {
                Alert.alert('How Upgrades Work', "With the quantity you selected, you won't be upgraded " +
                    "to better bottles. Buy more bottles to improve your chances!");
            }
            let index = parseInt(rowId.toString());
            this.props.app.setQuantity(this.qtyValues[index], () => this.updateTotals());
        });
    }
    getTotalTax() {
        let r = this.getActualResult();
        if (!r)
            return 0;
        let tc = r.taxComputed;
        if (!tc)
            return 0;
        return tc.orderTaxAmt;
    }
    getButtonText() {
        if (this.state.isSubmitted === true)
            return 'Please wait...';
        const ar = this.state.apiResult;
        if (ar) {
            if (!isEmpty(ar.message))
                return ar.message;
        }
        return 'Place Order';
    }
    render() {
        this.updateQtyPickerItems();
        const payment = this.props.payment;
        const img = HomeModule.getImageURL(this.props.offer);
        const qtyLabel = this.qtyLabels[this.qtyValues.indexOf(this.props.qty)] || 'Pick Quantity';
        const tax = this.getTotalTax();
        const isSubmitted = this.state.isSubmitted;
        const result = this.getActualResult();
        return (React.createElement(View, { style: styles.container },
            React.createElement(Image, { style: styles.backgroundImage, source: require('../../../img/gradientBottom.jpg') }),
            React.createElement(CommonHeading, { title: "Checkout", onBack: this.onBack.bind(this) }),
            React.createElement(KeyboardAwareScrollView, { extraScrollHeight: 10, horizontal: false, style: { flex: 1, backgroundColor: 'transparent', paddingBottom: 40 } },
                !isEmpty(img) && React.createElement(Image, { style: {
                        width: 600,
                        height: 200,
                    }, resizeMode: "cover", source: { uri: img } }),
                React.createElement(View, { style: { paddingTop: 16 } },
                    React.createElement(TouchableOpacity, { style: styles.checkoutRow, onPress: this.doQuantity.bind(this) },
                        React.createElement(Text, { style: styles.checkoutRowLabel1 }, "QUANTITY"),
                        React.createElement(Text, { style: styles.checkoutRowLabel2 }, qtyLabel),
                        React.createElement(Icon, { style: styles.checkoutRowLabel3, name: "chevron-right", size: 16, color: "#fff" })),
                    React.createElement(View, { style: styles.separator }),
                    React.createElement(TouchableOpacity, { style: styles.checkoutRow, onPress: this.doPayment.bind(this) },
                        React.createElement(Text, { style: styles.checkoutRowLabel1 },
                            "PAYMENT",
                            "\n",
                            "METHOD"),
                        payment ? React.createElement(Text, { style: styles.checkoutRowLabel2 },
                            payment.cardType,
                            " ",
                            payment.cardNumber) :
                            React.createElement(Text, { style: styles.checkoutRowLabel2 }, "Select"),
                        React.createElement(Icon, { style: styles.checkoutRowLabel3, name: "chevron-right", size: 16, color: "#fff" })),
                    React.createElement(View, { style: styles.separator }),
                    React.createElement(TouchableOpacity, { style: styles.checkoutRow, onPress: this.shippingInfo.bind(this) },
                        React.createElement(Text, { style: styles.checkoutRowLabel1 },
                            "SHIPPING",
                            "\n",
                            "METHOD"),
                        React.createElement(Text, { style: styles.checkoutRowLabel2 }, "Free Shipping Available"),
                        React.createElement(Icon, { style: styles.checkoutRowLabel3, name: "chevron-right", size: 16, color: "#fff" })),
                    React.createElement(View, { style: styles.separator }),
                    React.createElement(View, { style: styles.checkoutRow },
                        React.createElement(TextInput, { placeholder: "Promo or gift card to redeem?", placeholderTextColor: Colors.grayText, autoCorrect: false, keyboardAppearance: "dark", autoCapitalize: "characters", value: this.state.promoCode || '', onChangeText: (pc) => this.setState({ promoCode: pc.toUpperCase() }), style: { flex: 0.8, color: Colors.white,
                                fontFamily: Fonts.body } }),
                        React.createElement(TouchableOpacity, { style: { padding: 8, flex: 0.2, backgroundColor: Colors.redTint }, onPress: () => this.updateTotals() },
                            React.createElement(Text, { style: { color: '#fff', flex: 1, textAlign: 'center',
                                    fontFamily: Fonts.body } }, "Apply"))),
                    React.createElement(View, { style: styles.separator }),
                    result != null && React.createElement(View, { style: { flexDirection: 'column' } },
                        result.subtotal && React.createElement(View, { style: styles.summaryItem },
                            React.createElement(Text, { style: styles.summaryLabel1 }, "SUBTOTAL"),
                            React.createElement(Text, { style: styles.summaryLabel2 },
                                "$",
                                result.subtotal.toFixed(2))),
                        (tax && (tax > 0) && React.createElement(View, { style: styles.summaryItem },
                            React.createElement(Text, { style: styles.summaryLabel1 }, "TAX"),
                            React.createElement(Text, { style: styles.summaryLabel2 },
                                "$",
                                tax.toFixed(2)))) || null,
                        (result.accountBalanceAvailable || 0) > 0 && result.accountBalanceUsed &&
                            React.createElement(View, { style: styles.summaryItem },
                                React.createElement(Text, { style: styles.summaryLabel1 },
                                    "CREDIT ($",
                                    (result.accountBalanceAvailable || 0).toFixed(2),
                                    " avail)"),
                                React.createElement(Text, { style: styles.summaryLabel2 },
                                    "-",
                                    result.accountBalanceUsed.toFixed(2))) || null,
                        (result.promotionsUsed && result.promotionsUsed.map((promo, i) => React.createElement(View, { key: 'pc' + i, style: styles.summaryItem },
                            React.createElement(Text, { style: styles.summaryLabel1 },
                                "DISCOUNT ",
                                promo.code),
                            React.createElement(Text, { style: styles.summaryLabel2 },
                                "-$",
                                (promo.discountApplied || 0).toFixed(2))))) || null,
                        React.createElement(View, { style: styles.summaryItem },
                            React.createElement(Text, { style: styles.summaryLabel1 }, "CLOUDCELLAR"),
                            React.createElement(Text, { style: styles.summaryLabel2 }, "FREE!")),
                        React.createElement(View, { style: styles.summaryItem },
                            React.createElement(Text, { style: styles.finalLabel1 }, "GRAND TOTAL"),
                            React.createElement(Text, { style: styles.finalLabel2 },
                                "$",
                                (result.totalPrice || 0).toFixed(2)))) || null,
                    result && React.createElement(View, { style: styles.separator }) || null)),
            React.createElement(View, { style: styles.buy_bt_container },
                React.createElement(TouchableOpacity, { onPress: () => this.doCheckout() },
                    React.createElement(Text, { style: styles.login_bt }, this.getButtonText())))));
    }
}
//# sourceMappingURL=checkout.js.map