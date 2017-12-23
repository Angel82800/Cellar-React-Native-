import React from 'react';
import { View, ListView, TouchableOpacity, } from 'react-native';
import styles from './styles';
import { WineItem } from './wineitem';
export class Wine extends React.Component {
    constructor(props) {
        super(props);
        const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
        this.state = {
            dataSource: ds.cloneWithRows([]),
        };
    }
    componentDidMount() {
        let wines = this.props.wines;
        this.setState({ dataSource: this.state.dataSource.cloneWithRows(wines) });
    }
    render() {
        return (React.createElement(View, { style: styles.container },
            React.createElement(ListView, { showsVerticalScrollIndicator: false, enableEmptySections: true, dataSource: this.state.dataSource, renderRow: (rowData) => React.createElement(TouchableOpacity, null,
                    React.createElement(WineItem, { data: Object.assign({}, rowData) })) })));
    }
}
//# sourceMappingURL=index.js.map