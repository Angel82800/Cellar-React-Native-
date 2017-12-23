/**
 * UndergroundCellar
 * Copyright @ 2017 by Roderick L.
 * @flow
**/
import React from 'react';
import { Text, View, } from 'react-native';
class DetailTabBar extends React.Component {
    render() {
        return (React.createElement(View, { style: { flex: 1, } },
            React.createElement(Text, { style: this.props.tabStyle }, this.props.title)));
    }
}
export default DetailTabBar;
//# sourceMappingURL=index.js.map