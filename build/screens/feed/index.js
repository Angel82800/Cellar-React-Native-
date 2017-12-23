import React from 'react';
import { View, ListView, TouchableOpacity, } from 'react-native';
import styles from './styles';
import { FeedItem } from './feeditem';
export class Feed extends React.Component {
    constructor(props) {
        super(props);
        const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
        this.state = {
            dataSource: ds.cloneWithRows([]),
        };
    }
    componentDidMount() {
        let feeds = this.props.feeds;
        this.setState({ dataSource: this.state.dataSource.cloneWithRows(feeds) });
    }
    render() {
        return (React.createElement(View, { style: styles.container },
            React.createElement(ListView, { showsVerticalScrollIndicator: false, enableEmptySections: true, dataSource: this.state.dataSource, renderRow: (rowData) => React.createElement(TouchableOpacity, null,
                    React.createElement(FeedItem, { data: Object.assign({}, rowData) })) })));
    }
}
//# sourceMappingURL=index.js.map