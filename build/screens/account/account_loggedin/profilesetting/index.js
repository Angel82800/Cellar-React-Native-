import React from 'react';
import { View, Image, Text, } from 'react-native';
import styles from './styles';
export class ProfileSetting extends React.Component {
    constructor(props, context) {
        super(props, context);
    }
    componnentDidMount() {
        let data = this.props.data;
    }
    render() {
        let data = this.props.data;
        let rowID = this.props.index;
        let user = this.props.user;
        return (React.createElement(View, { style: styles.container },
            React.createElement(View, { style: styles.itemContainer },
                React.createElement(Text, { style: styles.text }, data),
                rowID === '1:0' || rowID === '1:1' ?
                    React.createElement(Image, { style: styles.icon, source: require('../../../../../img/accesorygray.png') }) : rowID === '1:2' ?
                    React.createElement(Text, { style: styles.rightText }, '$' + 0) : React.createElement(View, null))));
    }
}
//# sourceMappingURL=index.js.map