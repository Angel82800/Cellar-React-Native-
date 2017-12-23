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
        // if ((this.props.data).length == 0) {
        //     return
        //     (<View style={styles.containerEmptyHeader}>
        //     </View>)
        // } else {
        //     return (<View style={styles.container}>
        //         <Text style={styles.textSmall}>{data}</Text>
        //     </View>)
        // }
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