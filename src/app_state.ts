'use strict';
import {
	ApiBillingModelWithAuthnet, ApiBillingModelWithCardNumber, NhAddressModel, OfferCheckoutModel, OfferV2Entity,
	SessionModel, UpgradeOrderResult,
} from 'ucshared';
import {IRoute} from "./screens/DrawerSideMenu/menu.data";

export class AppState {

	constructor() {
		this.drawerType = 'static';
		this.closedDrawerOffset = 0;
		this.openDrawerOffset = 100;
		this.panOpenMask = .5;
		this.panCloseMask = .20;
		this.relativeDrag = false;
		this.panThreshold = .25;
		this.tweenHandlerOn = false;
		this.tweenDuration = 350;
		this.tweenEasing = 'linear';
		this.drawerDisabled = false;
		this.tweenHandlerPreset = null;
		this.acceptDoubleTap = false;
		this.acceptTap = true;
		this.acceptPan = true;
		this.tapToClose = false;
		this.negotiatePan = true;
		this.rightSide = true;
		this.side = 'left';
		this.panStartCompensation = false;
		this.animation = true;
		this.routes = [];
		this.isDrawerClosed = true;
		this.session = null;
		this.captureGestures = true;
		this.tweenHandler = 0.5;
		this.selectedAddress = null;
		this.selectedPayment = null;
		this.selectedOffer = null;
		this.selectedQty = 6;
		this.currentPurchase = null;
		this.showDealAlertsOverlay = true;
		this.pushToken = null;
	}

	routes: Array<IRoute>;
	drawerType: string;
	tweenHandler: number;
	openDrawerOffset: number;
	closedDrawerOffset: number;
	panOpenMask: number;
	panCloseMask: number;
	relativeDrag: boolean;
	panThreshold: number;
	tweenHandlerOn: boolean;
	tweenDuration: number;
	tweenEasing: string;
	drawerDisabled: boolean;
	tweenHandlerPreset: null;
	acceptDoubleTap: boolean;
	acceptTap: boolean;
	acceptPan: boolean;
	tapToClose: boolean;
	negotiatePan: boolean;
	rightSide: boolean;
	side: string;
	panStartCompensation: boolean;
	animation: boolean;
	captureGestures: boolean;
	isDrawerClosed: boolean;
	session: SessionModel | null;
	selectedAddress: NhAddressModel | null;
	selectedPayment: ApiBillingModelWithCardNumber|ApiBillingModelWithAuthnet | null;
	selectedOffer: OfferV2Entity | null;
	selectedQty: number;
	currentAddresses : Array<NhAddressModel>;
	currentPayments : Array<ApiBillingModelWithAuthnet | ApiBillingModelWithCardNumber>;
	currentPickerValue : string;
	isPurchased : boolean;
	currentPurchase: OfferCheckoutModel | null;
	showDealAlertsOverlay: boolean;
	pushToken: string | null;
}

