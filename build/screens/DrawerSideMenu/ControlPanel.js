import * as React from 'react';
import { View, ListView, Image, Text, TouchableOpacity, ScrollView, Linking, } from 'react-native';
import styles from './styles';
import { menuItems } from "./menu.data";
import { RouteMap } from "../../routemap";
class ControlPanelState {
}
class ControlPanel extends React.Component {
    constructor(props, context) {
        super(props);
        const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
        this.dataSource = ds.cloneWithRows([]);
        this.state = {
            dataSource: ds.cloneWithRows([]),
            view_num: 0,
            visible: true
        };
    }
    setState(val) {
        super.setState(val);
    }
    signIn() {
        if (!this.props.app.navigator) {
            alert('No navigator in signIn');
            return;
        }
        let route = RouteMap.LoginScreen;
        route.data = this.props.app.navigator;
        this.props.app.navigator.push(route);
        this.props.closeDrawer();
    }
    accountClick() {
        if (!this.props.app.navigator) {
            alert('No navigator in accountClick');
            return;
        }
        let route = RouteMap.AccountScreen;
        route.data = this.props.app.navigator;
        this.props.app.navigator.push(route);
        this.props.closeDrawer();
    }
    pick(idx) {
        switch (idx) {
            case 1:
                this.props.app.goHome();
                break;
            case 2:
                // this.props.closeDrawer();
                const uri = 'https://www.undergroundcellar.com';
                return Linking.openURL(uri).catch(err => console.error('An error occurred', err));
            case 3:
                this.props.closeDrawer();
                this.props.app.navigateToRoute(RouteMap.Guide);
                break;
            case 4:
                this.props.closeDrawer();
                this.props.app.navigateToRoute(RouteMap.FAQ);
                break;
            case 5:
                const mailUri = 'mailto:support@undergroundcellar.com';
                Linking.openURL(mailUri).catch(err => console.error('An error occurred', err));
                break;
        }
    }
    render() {
        const { firstName, profileUrl } = this.props;
        return (React.createElement(ScrollView, { style: styles.container },
            React.createElement(View, { style: styles.header, key: 0 },
                React.createElement(View, { style: styles.headerIcon, key: 0 },
                    React.createElement(Image, { source: require('../../../img/pic-circular-large.png'), style: styles.headerIcon })),
                React.createElement(View, { style: styles.headerInfo, key: 1 }, (this.props.app.isLoggedIn() ?
                    React.createElement(TouchableOpacity, { style: styles.listItem, onPress: this.accountClick.bind(this) },
                        React.createElement(Text, { style: styles.headerTitle, key: 0 },
                            "Welcome ",
                            firstName)) :
                    React.createElement(TouchableOpacity, { style: styles.listItem, onPress: this.signIn.bind(this) },
                        React.createElement(Text, { style: styles.headerTitle, key: 0 },
                            "Sign In ",
                            firstName))))),
            React.createElement(View, { style: styles.content, key: 1 },
                React.createElement(View, null, menuItems.map((item, idx) => (React.createElement(TouchableOpacity, { key: idx, style: styles.listItem, onPress: this.pick.bind(this, item.index) },
                    React.createElement(Image, { source: item.thumb, style: styles.listItemImage }),
                    React.createElement(Text, { style: styles.listItemTitle }, item.label)))))),
            React.createElement(View, null, menuItems.map((item, idx) => (React.createElement(TouchableOpacity, { key: idx, style: styles.listItem }))))));
    }
}
export default ControlPanel;
//# sourceMappingURL=ControlPanel.js.map