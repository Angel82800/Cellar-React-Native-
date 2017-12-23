import React from 'react';
import { View, Image, Text, } from 'react-native';
import styles from './styles';
import { isEmpty } from "../../../utility";
import { HomeModule } from "../../home/home_offer_item/module";
export class OfferAvatar extends React.Component {
    constructor(props, context) {
        super(props, context);
    }
    componnentDidMount() {
        let data = this.props.data;
    }
    getBottlesRemaining() {
        const data = this.props.data;
        const bottlesRemaining = data.bottlesRemaining;
        if (bottlesRemaining === 0) {
            return "Sold out";
        }
        else {
            return "Less than " + bottlesRemaining + " left";
        }
    }
    getOfferDescription() {
        const data = this.props.data;
        const offerItemNamePlural = data.offerItemNamePlural;
        const minPrice = data.minPrice;
        if (!isEmpty(data.buyText)) {
            return data.buyText;
        }
        return "Buy " + (offerItemNamePlural || "bottles") + " from this deal for just $" + minPrice + " each, and 55% of them will be upgraded for FREE!";
    }
    render() {
        const imgUrl = HomeModule.getImageURL(this.props.data);
        return React.createElement(View, { style: styles.container },
            !isEmpty(imgUrl) && React.createElement(Image, { style: styles.offer_img, source: { uri: imgUrl } },
                React.createElement(View, { style: styles.offer_body_container },
                    React.createElement(Text, { style: styles.offer_bottle_label }, this.getBottlesRemaining()))),
            React.createElement(View, { style: styles.offer_footer_container },
                React.createElement(Image, { style: styles.shadow, source: require('../../../../img/gradient.jpg') }),
                React.createElement(Text, { style: styles.offer_description }, this.getOfferDescription())));
    }
}
//# sourceMappingURL=index.js.map