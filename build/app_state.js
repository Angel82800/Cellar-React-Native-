'use strict';
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
}
//# sourceMappingURL=app_state.js.map