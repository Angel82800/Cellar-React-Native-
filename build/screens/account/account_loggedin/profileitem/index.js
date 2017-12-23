import React from 'react';
import { View, Text, Image, } from 'react-native';
import styles from './styles';
export class ProfileCell extends React.Component {
    constructor(props, context) {
        super(props, context);
    }
    render() {
        const user = this.props.user;
        return (React.createElement(View, { style: styles.container },
            React.createElement(View, { style: styles.nameContainer },
                React.createElement(View, { style: styles.nameTitleContainer },
                    React.createElement(View, { style: styles.itemContainer },
                        React.createElement(Text, { style: styles.text }, user.firstName)),
                    React.createElement(View, { style: styles.separator }),
                    React.createElement(View, { style: styles.itemContainer },
                        React.createElement(Text, { style: styles.text }, user.lastName))),
                React.createElement(Image, { style: styles.avatar, source: require('../../../../../img/pic-circular-large.png') })),
            React.createElement(View, { style: styles.separator }),
            React.createElement(View, { style: styles.itemContainer },
                React.createElement(Text, { style: styles.text }, user.email))));
    }
}
//# sourceMappingURL=index.js.map