import React from 'react';
import { View, Image, Text, } from 'react-native';
import styles from './styles';
export class NewPaymentCell extends React.Component {
    constructor(props, context) {
        super(props, context);
    }
    render() {
        // let data = this.props.data;
        // let rowID = this.props.index;
        // let user = this.props.user;
        return (React.createElement(View, { style: styles.container },
            React.createElement(Text, { style: styles.text }, "Add a new Payment"),
            React.createElement(Image, { style: styles.icon, source: require('../../../../../img/accesorygray.png') })));
    }
}
//# sourceMappingURL=index.js.map