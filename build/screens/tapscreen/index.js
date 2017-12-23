import React from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import styles from "./styles";
import { RouteMap } from "../../routemap";
export class TapScreen extends React.Component {
    constructor(props, context) {
        super(props, context);
    }
    next() {
        let route = RouteMap.Guide;
        this.props.navigator.push(route);
    }
    render() {
        return (React.createElement(View, { style: styles.container },
            React.createElement(Image, { style: styles.background, source: require('../../../img/blue_wood.jpg') },
                React.createElement(TouchableOpacity, { style: styles.buttonContainer, onPress: () => this.next() },
                    React.createElement(Text, { style: styles.btTitle }, "tap to continue")))));
    }
}
//# sourceMappingURL=index.js.map