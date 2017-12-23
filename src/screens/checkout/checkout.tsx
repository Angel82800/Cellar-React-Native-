import React, {Component} from 'react';
import {
	View,
	Text,
	Image,
	TouchableOpacity,
	TextInput, Alert,
} from 'react-native'

import styles from './styles';
import {App} from '../../App';
import {KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import {Colors, Fonts} from "../../constants";
import {CommonHeading} from "../../components/heading";
import Icon from 'react-native-vector-icons/FontAwesome';
import {
	ApiBillingModelWithAuthnet, ApiBillingModelWithCardNumber, ApiResultOfferCheckoutModel, CheckoutApiApi,
	CheckoutPromoCodeModel, NhAddressModel,
	OfferCheckoutModel,
	OfferV2Entity
} from 'ucshared';
import {isEmpty} from "../../utility";
import {HomeModule} from "../home/home_offer_item/module";
import {RouteMap} from "../../routemap";

export class CheckoutState {
	promoCode: string;
	apiResult: ApiResultOfferCheckoutModel | null;
	isSubmitted: boolean;
	constructor() {
		this.promoCode = '';
		this.apiResult = null;
		this.isSubmitted = false;
	}
}

export interface CheckoutProps {
	app: App;
	qty: number;
	offer: OfferV2Entity;
	address: NhAddressModel | null;
	payment: ApiBillingModelWithCardNumber | ApiBillingModelWithAuthnet | null;
}

export class CheckoutPage extends React.Component<CheckoutProps, CheckoutState> {

	constructor(props, context) {
		super(props, context);
		this.state = new CheckoutState();
	}

	componentDidMount() {
		this.props.app.disableDrawer();
		this.updateTotals();
	}

	onBack() {
		if (!this.state.isSubmitted) {
			const app: App = this.props.app;
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
		const app: App = this.props.app;
		app.navigateToRoute(RouteMap.PaymentSelect);
	}

	getApiModel(user) {
		let pc: CheckoutPromoCodeModel[] = [];
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
		}
	}

	getActualResult() {
		if (!this.state) return null;
		if (!this.state.apiResult) return null;
		if (!this.state.apiResult.value) return null;
		return this.state.apiResult.value.result;
	}

	checkPromoError() {
		const res = this.getActualResult();
		if (res) {
			const pr = res.promotionsUsed;
			if (!pr || pr.length == 0) return;
			let pr0 = pr[0];
			let message = CheckoutPage.promoErrorMessage(parseInt(pr0.error || "0"), pr0.code);
			if (!isEmpty(message)) {
				Alert.alert('Promo code invalid', message);
				this.setState({promoCode: ''});
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
		this.setState({apiResult: null, isSubmitted: true}, () =>
			this.props.app.getCurrentUser().then(user => {
				const api = new CheckoutApiApi();
				api.checkoutApiPutFromSessionV3({
					sessionId: this.props.app.getCurrentUserId(),
					offerCheckoutInfo: this.getApiModel(user)
				}).then(
					(result: ApiResultOfferCheckoutModel) => {
						this.setState({
							apiResult: result,
							isSubmitted: false
						}, () => this.checkPromoError());
					},
					(err) => {
						Alert.alert(JSON.stringify(err));
						this.setState({isSubmitted: false});
					}
				);
			}));
	}

	doCheckout() {
		if (this.state.isSubmitted)
			return;
		this.setState({isSubmitted: true}, () =>
			this.props.app.getCurrentUser().then(user => {
				const api = new CheckoutApiApi();
				api.checkoutApiPostFromSessionV3({
					sessionId: this.props.app.getCurrentUserId(),
					offerCheckoutInfo: this.getApiModel(user)
				}).then(
					(result: ApiResultOfferCheckoutModel) => {
						//this.setState({isSubmitted: false});
						if (result.success && result.value) {
							this.props.app.handleCheckoutCompleted(result.value);
						} else if (typeof result.message === 'string') {
							Alert.alert("Error", result.message);
							this.setState({isSubmitted: false});
						} else {
							Alert.alert("Error", JSON.stringify(result));
							this.setState({isSubmitted: false});
						}
					},
					(err) => {
						Alert.alert("Oops!", "Sorry, we couldn't authorize the transaction. Please check your information and try again." + JSON.stringify(err));
						this.setState({isSubmitted: false});
					}
				);
			}, err => alert(JSON.stringify(err))));
	}

	qtyLabels: Array<string> = [];
	qtyValues: Array<number> = [];

	updateQtyPickerItems() {
		const offer = this.props.offer;
		if (offer && offer.numberOfUpgradesGuaranteed) {
			let options: Array<string> = [];
			let qtys: Array<number> = [];
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
		this.props.app.navigateToPicker(this.qtyLabels, (label, rowId: string|number) => {
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
		if (!r) return 0;
		let tc = r.taxComputed;
		if (!tc) return 0;
		return tc.orderTaxAmt;
	}

	getButtonText() {
		if (this.state.isSubmitted === true)
			return 'Please wait...';
		const ar = this.state.apiResult;
		if (ar) {
			if (!isEmpty(ar.message)) return ar.message;
		}
		return 'Place Order';
	}

	render() {
		this.updateQtyPickerItems();
		const payment: ApiBillingModelWithCardNumber | ApiBillingModelWithAuthnet | null = this.props.payment;
		const img = HomeModule.getImageURL(this.props.offer);
		const qtyLabel = this.qtyLabels[this.qtyValues.indexOf(this.props.qty)] || 'Pick Quantity';
		const tax = this.getTotalTax();
		const isSubmitted = this.state.isSubmitted;
		const result = this.getActualResult();
		return (
			<View style={styles.container}>
				<Image style={styles.backgroundImage} source={require('../../../img/gradientBottom.jpg')}/>
				<CommonHeading title="Checkout" onBack={this.onBack.bind(this)} />
				<KeyboardAwareScrollView
					extraScrollHeight={10}
					horizontal={false} style={{flex: 1, backgroundColor: 'transparent', paddingBottom: 40}}>

					{!isEmpty(img) && <Image
						style={{
							width: 600, //todo: make it full width
							height: 200,
						}}
						resizeMode={"cover"}
						source={{uri: img}}
					/>}

					<View style={{ paddingTop: 16 }}>
						<TouchableOpacity style={styles.checkoutRow} onPress={this.doQuantity.bind(this)}>

							<Text style={styles.checkoutRowLabel1}>QUANTITY</Text>
							<Text style={styles.checkoutRowLabel2}>{qtyLabel}</Text>
							<Icon style={styles.checkoutRowLabel3} name="chevron-right" size={16} color="#fff" />

						</TouchableOpacity>
						<View style={styles.separator}/>
						<TouchableOpacity style={styles.checkoutRow} onPress={this.doPayment.bind(this)}>

							<Text style={styles.checkoutRowLabel1}>PAYMENT{"\n"}METHOD</Text>
							{payment ? <Text style={styles.checkoutRowLabel2}>{payment.cardType} {payment.cardNumber}</Text> :
								<Text style={styles.checkoutRowLabel2}>Select</Text>}
							<Icon style={styles.checkoutRowLabel3} name="chevron-right" size={16} color="#fff" />
						</TouchableOpacity>
						<View style={styles.separator}/>
						<TouchableOpacity style={styles.checkoutRow} onPress={this.shippingInfo.bind(this)}>

							<Text style={styles.checkoutRowLabel1}>SHIPPING{"\n"}METHOD</Text>
							<Text style={styles.checkoutRowLabel2}>Free Shipping Available</Text>
							<Icon style={styles.checkoutRowLabel3} name="chevron-right" size={16} color="#fff" />

						</TouchableOpacity>
						<View style={styles.separator}/>

						<View style={styles.checkoutRow}>

							<TextInput
								placeholder="Promo or gift card to redeem?"
								placeholderTextColor={Colors.grayText}
								autoCorrect={false}
								keyboardAppearance="dark"
								autoCapitalize="characters"
								value={this.state.promoCode || ''}
								onChangeText={(pc) => this.setState({promoCode: pc.toUpperCase()})}
								style={{flex: 0.8, color: Colors.white,
									fontFamily: Fonts.body}}
							/>

							<TouchableOpacity
								style={{padding: 8, flex: 0.2, backgroundColor: Colors.redTint}}
								onPress={() => this.updateTotals()}
							>
								<Text style={{color: '#fff', flex: 1, textAlign: 'center',
									fontFamily: Fonts.body}}>Apply</Text>
							</TouchableOpacity>

						</View>
						<View style={styles.separator}/>

						{result != null && <View style={{flexDirection: 'column'}}>
							{result.subtotal && <View style={styles.summaryItem}>
								<Text style={styles.summaryLabel1}>SUBTOTAL</Text>
								<Text style={styles.summaryLabel2}>${result.subtotal.toFixed(2)}</Text>
							</View>}
							{(tax && (tax > 0) && <View style={styles.summaryItem}>
								<Text style={styles.summaryLabel1}>TAX</Text>
								<Text style={styles.summaryLabel2}>${tax.toFixed(2)}</Text>
							</View>) || null}
							{(result.accountBalanceAvailable||0) > 0 && result.accountBalanceUsed &&
							<View style={styles.summaryItem}>
								<Text style={styles.summaryLabel1}>CREDIT (${(result.accountBalanceAvailable||0).toFixed(2)} avail)</Text>
								<Text style={styles.summaryLabel2}>-{result.accountBalanceUsed.toFixed(2)}</Text>
							</View> || null}
							{(result.promotionsUsed && result.promotionsUsed.map((promo, i) =>
							<View key={'pc'+i} style={styles.summaryItem}>
								<Text style={styles.summaryLabel1}>DISCOUNT {promo.code}</Text>
								<Text style={styles.summaryLabel2}>-${(promo.discountApplied || 0).toFixed(2)}</Text>
							</View>)) || null}
							<View style={styles.summaryItem}>
								<Text style={styles.summaryLabel1}>CLOUDCELLAR</Text>
								<Text style={styles.summaryLabel2}>FREE!</Text>
							</View>
							<View style={styles.summaryItem}>
								<Text style={styles.finalLabel1}>GRAND TOTAL</Text>
								<Text style={styles.finalLabel2}>${(result.totalPrice || 0).toFixed(2)}</Text>
							</View>
						</View> || null}

						{result && <View style={styles.separator}/> || null}

					</View>
				</KeyboardAwareScrollView>
				<View style={styles.buy_bt_container}>
					<TouchableOpacity onPress={() => this.doCheckout()}>
						<Text style={styles.login_bt}>
							{this.getButtonText()}
						</Text>
					</TouchableOpacity>
				</View>
			</View>
		);
	}
}