import React from 'react';
import { View, Text, } from 'react-native';
import styles from './styles';
export class OfferDetail extends React.Component {
    constructor(props, context) {
        super(props, context);
    }
    getOfferContent() {
        let offerContent = this.props.data.offerContent;
        return offerContent === undefined ? "" : offerContent;
    }
    render() {
        return React.createElement(View, { style: styles.container },
            React.createElement(Text, { style: styles.content }, this.getOfferContent()));
    }
}
//# sourceMappingURL=index.js.map