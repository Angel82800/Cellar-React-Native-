import React from 'react';
import { View, Text } from 'react-native';
import styles from './styles';
export class SectionHeader extends React.Component {
    constructor(props, context) {
        super(props, context);
    }
    manageHeader() {
        // alert(this.props.data)
        let { data } = this.props;
        switch (this.props.data) {
            case '':
                return (React.createElement(View, { style: styles.containerEmptyHeader }));
            default:
                return (React.createElement(View, { style: styles.container },
                    React.createElement(Text, { style: styles.textSmall }, data)));
        }
    }
    render() {
        return this.manageHeader();
    }
}
//# sourceMappingURL=index.js.map