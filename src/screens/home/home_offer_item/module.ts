/**
 * UndergroundCellar
 * Copyright @ 2017 by Roderick L. 
 * @flow
**/

let moment = require('moment');
const CONSTANTS = require('../../../constants');

export class HomeModule {
	
	static getSalesString(data)	{
		const dateB = moment(data.expiryDate);
		const dateC = moment();
		const diff = dateB.diff(dateC, 'days');
		let saleDay = "";
		if (diff === "0") {
			saleDay = "Almost gone!";
		} else {
			let dayString = diff === "1" ? "Day" : "Days";
			saleDay = "Less then " + diff + " " + dayString + " left";
		}
		return saleDay;
	}

	static getImageURL(data)	{
		const imgName = data.offerImg[0];
		const imageURL = CONSTANTS.IMAGE_BASE_URL + imgName;
		return imageURL;
	}

	static getWineName(data)	{
		const winename = data.title;
		return winename;
	}

	static getPricePerBottle(data)	{
		let price = data.pricePerBottle + '.00';
		const pricePerBottle = '$' + price + "/bottle";
		return pricePerBottle;
	}

	static getWineryName(data)	{
		const wineryName = data.wineryName;
		return wineryName;
	}

	static getMaxPrice(data)	{
		const maxPrice = "Upgrades up to $" + data.maxPrice;
		return maxPrice;
	}
}
