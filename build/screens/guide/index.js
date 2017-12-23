var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) if (e.indexOf(p[i]) < 0)
            t[p[i]] = s[p[i]];
    return t;
};
import * as React from 'react';
import { View, Image, Text, TouchableOpacity, StatusBar, } from 'react-native';
import styles from './styles';
import ViewPager from 'react-native-viewpager';
import { GuideSignUp } from './guide_signup';
const MyStatusBar = (_a) => {
    var { backgroundColor } = _a, props = __rest(_a, ["backgroundColor"]);
    return (React.createElement(View, { style: [styles.statusBar, { backgroundColor }] },
        React.createElement(StatusBar, Object.assign({ backgroundColor: backgroundColor }, props))));
};
export class Guide extends React.Component {
    constructor(props, context) {
        super(props);
        const dataSource = new ViewPager.DataSource({
            pageHasChanged: (p1, p2) => p1 !== p2,
        });
        this.pageNumber = 0;
        let ids = [
            'view1',
            'view2',
            'view3',
            'view4',
        ];
        let data = [
            (React.createElement(View, { style: styles.guide_container },
                React.createElement(Image, { source: require('../../../img/i1-discover.png'), style: styles.guide_image }),
                React.createElement(Text, { style: styles.guide_title }, "Guaranteed Upgrades with Every Purchase"),
                React.createElement(Text, { style: styles.guide_detail }, "Buy bottles from our daily curated collections"))),
            (React.createElement(View, { style: styles.guide_container },
                React.createElement(Image, { source: require('../../../img/i2-vertical.png'), style: styles.guide_image }),
                React.createElement(Text, { style: styles.guide_detail }, "Bottles are swapped to more expensive ones for free"))),
            (React.createElement(View, { style: styles.guide_container },
                React.createElement(Image, { source: require('../../../img/i3-collect.png'), style: styles.guide_image }),
                React.createElement(Text, { style: styles.guide_title }, "Complimentary Storage with Every Purchase"),
                React.createElement(Text, { style: styles.guide_detail }, "Store up to 500 bottles in our Napa Valley cellar"))),
            (React.createElement(View, { style: styles.guide_container },
                React.createElement(Image, { source: require('../../../img/i4-horizontal.png'), style: styles.guide_image }),
                React.createElement(Text, { style: styles.guide_detail }, "Mix-and-match bottles into cases and ship for free")))
        ];
        if (!props.guideApp.isLoggedIn()) {
            data.push(React.createElement(View, { style: styles.guide_container },
                React.createElement(GuideSignUp, { gsApp: this.props.guideApp })));
            ids.push('signup');
        }
        this.state = {
            dataSource: dataSource.cloneWithPages(ids),
            data: data,
            index: 0
        };
    }
    componentDidMount() {
        this.props.disableDrawer();
        this.pageNumber = this.viewpager.getCurrentPage();
    }
    showHome() {
        if (this.props.guideApp) {
            this.props.guideApp.goHome();
        }
    }
    render() {
        return (React.createElement(View, { style: styles.container },
            React.createElement(MyStatusBar, { backgroundColor: "#5E8D48", barStyle: "light-content" }),
            React.createElement(Image, { style: styles.background, source: require('../../../img/gradient.jpg') }),
            React.createElement(ViewPager, { ref: (viewpager) => { this.viewpager = viewpager; }, style: styles.viewPager, dataSource: this.state.dataSource, renderPage: this._renderPage.bind(this), isLoop: false, autoPlay: false, onChangePage: (number) => { this.pageNumber = number; } }),
            this.props.guideApp.isLoggedIn() && React.createElement(TouchableOpacity, { style: styles.btnCloseContainer, onPress: this.showHome.bind(this) },
                React.createElement(Image, { style: styles.btnImg, source: require('../../../img/close.png') })),
            this.pageNumber > 4 ? React.createElement(View, null) : React.createElement(TouchableOpacity, { style: styles.btnNextContainer, onPress: () => {
                    this.pageNumber = this.viewpager.getCurrentPage();
                    if (this.pageNumber < 4) {
                        this.viewpager.goToPage(this.pageNumber + 1);
                        this.pageNumber = this.pageNumber + 1;
                    }
                    else {
                        this.setState({ index: this.pageNumber });
                    }
                } },
                React.createElement(Text, { style: styles.largeLabel }, "Next"))));
    }
    _renderPage(data, pageID) {
        return this.state.data[pageID];
    }
}
//# sourceMappingURL=index.js.map