import React from 'react';
import { View, Text, } from 'react-native';
import styles from './styles';
export class OfferState extends React.Component {
    constructor(props, context) {
        super(props, context);
    }
    getOfferContent() {
        var offerContent = "";
        for (var i = 0; i < this.props.data.states.length; i++) {
            offerContent += this.props.data.states[i] + " , ";
        }
        return offerContent === undefined ? "" : offerContent;
    }
    render() {
        return React.createElement(View, { style: styles.container },
            React.createElement(Text, { style: styles.content }, this.getOfferContent()));
    }
}
//# sourceMappingURL=index.js.map