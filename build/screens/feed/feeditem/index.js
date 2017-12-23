import React from 'react';
import { View, Text, } from 'react-native';
import styles from './styles';
export class FeedItem extends React.Component {
    constructor(props, context) {
        super(props, context);
    }
    getTitle() {
        let title = this.props.data.name + " bought " + this.props.data.quantity + " bottles";
        return title;
    }
    render() {
        let { data } = this.props.data;
        return React.createElement(View, { style: styles.container },
            React.createElement(Text, { style: styles.description }, this.getTitle()));
    }
}
//# sourceMappingURL=index.js.map