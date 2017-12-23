import React from 'react';
import { View, Image, Text, } from 'react-native';
import styles from './styles';
export class AddressCell extends React.Component {
    constructor(props, context) {
        super(props, context);
    }
    render() {
        let address = this.props.address;
        return (React.createElement(View, { style: styles.container },
            React.createElement(View, { style: styles.itemContainer },
                React.createElement(Text, { style: styles.text }, address.firstName + " " + address.lastName),
                React.createElement(Text, { style: styles.text }, address.address1),
                React.createElement(Text, { style: styles.text }, address.city + ", " + address.state + " " + address.zip),
                React.createElement(Text, { style: styles.text }, address.phone)),
            React.createElement(Image, { style: styles.icon, source: require('../../../../../img/accesorygray.png') })));
    }
}
//# sourceMappingURL=index.js.map