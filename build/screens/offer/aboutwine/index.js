import React from 'react';
import { View, Text, } from 'react-native';
import styles from './styles';
export class AboutWine extends React.Component {
    constructor(props, context) {
        super(props, context);
    }
    getWineryAbout(data) {
        let wineryAbout = this.props.data.wineryAbout;
        return wineryAbout === undefined ? "" : wineryAbout;
    }
    render() {
        let { data } = this.props.data;
        return React.createElement(View, { style: styles.container },
            React.createElement(Text, { style: styles.content }, this.getWineryAbout(data)));
    }
}
//# sourceMappingURL=index.js.map