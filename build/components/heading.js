import React from 'react';
import { View, Text, Image, TouchableOpacity, } from 'react-native';
import { MyStatusBar } from "../screens/details/index";
import { Colors, Fonts } from "../constants";
export class CommonHeading extends React.Component {
    constructor(props, context) {
        super(props, context);
    }
    onBack() {
        if (typeof this.props.onBack === 'function') {
            this.props.onBack();
        }
    }
    onAction() {
        if (typeof this.props.onAction === 'function') {
            this.props.onAction();
        }
    }
    render() {
        let imgStyle = { position: 'absolute',
            right: 0,
            left: 0,
            bottom: 0,
            top: 0
        };
        if (!this.props.bottomless) {
            imgStyle.height = 54;
            imgStyle.resizeMode = 'stretch';
        }
        return (React.createElement(View, null,
            React.createElement(MyStatusBar, { backgroundColor: "#000000", barStyle: "light-content" }),
            React.createElement(View, { style: {
                    height: 54,
                } },
                React.createElement(Image, { style: imgStyle, source: require('../../img/nav_gradient.jpg') }),
                React.createElement(View, { style: { flexDirection: 'row', alignItems: 'center', padding: 12 } },
                    React.createElement(View, { style: { flex: 0.2 } },
                        React.createElement(TouchableOpacity, { style: {
                                width: 24,
                                flexDirection: 'row'
                            }, onPress: this.onBack.bind(this) },
                            React.createElement(Image, { style: {
                                    flex: 1,
                                    resizeMode: 'contain',
                                    tintColor: 'white',
                                }, source: require('../../img/back.png') }))),
                    React.createElement(Text, { style: {
                            fontSize: 16,
                            flex: 0.8,
                            color: 'white',
                            backgroundColor: 'transparent',
                            fontFamily: Fonts.body,
                            textAlignVertical: 'center',
                            textAlign: 'center'
                        } }, this.props.title),
                    React.createElement(TouchableOpacity, { style: {
                            flex: 0.2,
                            flexDirection: 'row'
                        }, onPress: this.onAction.bind(this) }, this.props.actionText && React.createElement(Text, { style: {
                            fontSize: 14,
                            color: 'white',
                            alignSelf: 'center',
                            flex: 1,
                            backgroundColor: 'transparent',
                            textAlign: 'right',
                            textAlignVertical: 'center',
                            fontFamily: Fonts.body,
                            fontWeight: 'bold'
                        } }, this.props.actionText.toUpperCase())))),
            !this.props.bottomless && React.createElement(View, { style: { height: 1, backgroundColor: Colors.grayText } })));
    }
}
//# sourceMappingURL=heading.js.map