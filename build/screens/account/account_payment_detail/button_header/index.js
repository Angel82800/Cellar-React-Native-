import React from 'react';
import { Text, TouchableOpacity, Platform } from 'react-native';
import { CardIOModule, CardIOUtilities } from 'react-native-awesome-card-io';
import styles from './styles';
export class ButtonHeader extends React.Component {
    constructor(props, context) {
        super(props, context);
    }
    componentWillMount() {
        if (Platform.OS === "ios") {
            CardIOUtilities.preload();
        }
    }
    scanCard() {
        CardIOModule
            .scanCard({
            useCardIOLogo: true
        })
            .then(card => {
            if (typeof this.props.onScanCard === 'function') {
                this.props.onScanCard(card);
            }
        })
            .catch(() => {
            // the user cancelled
        });
    }
    manageHeader() {
        // alert(this.props.data)
        return (React.createElement(TouchableOpacity, { style: styles.container, onPress: this.scanCard.bind(this) },
            React.createElement(Text, { style: styles.textSmall }, "or"),
            React.createElement(Text, { style: styles.textLarge }, "SCAN YOUR CARD")));
    }
    render() {
        return this.manageHeader();
    }
}
//# sourceMappingURL=index.js.map