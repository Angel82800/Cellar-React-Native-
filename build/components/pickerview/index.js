'use strict';
import * as React from 'react';
import { Component } from "react";
import { Text, View, ListView, Alert, ScrollView } from 'react-native';
import styles from './styles';
import { CommonHeading } from "../heading";
import { RadioGroup, RadioButton } from 'react-native-flexi-radio-button';
export class PickerView extends Component {
    constructor(props, context) {
        super(props, context);
        const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
        this.state = {
            dataSource: ds.cloneWithRows([]),
            active: 0,
        };
    }
    componentDidMount() {
        let dataList = this.props.data;
        console.log(this.props.selectItem.state);
        this.setState({ dataSource: this.state.dataSource.cloneWithRows(dataList) });
        if (this.props.selectItem != null) {
            if (this.props.selectItem.state != undefined && this.props.selectItem.state != "")
                for (let i = 0; i < dataList.length; i++) {
                    if (this.props.selectItem.state == dataList[i]) {
                        this.setState({ active: i });
                    }
                }
        }
    }
    selectData(val, index) {
        if (typeof this.props.onValueSelected === 'function') {
            this.props.onValueSelected(val, index);
            this.props.app.goBack();
        }
        else {
            Alert.alert('Error', 'Please contact support for help with pickerview.');
        }
    }
    onSelect(index, value) {
        this.setState({
            active: index
        });
        this.selectData(value, index);
    }
    render() {
        return (React.createElement(View, { style: styles.container },
            React.createElement(CommonHeading, { title: "Pick Item", onBack: () => this.props.app.goBack() }),
            React.createElement(ScrollView, { style: { flex: 1 } },
                React.createElement(RadioGroup, { color: "#FFF", selectedIndex: this.state.active, onSelect: (index, value) => this.onSelect(index, value) }, this.props.data.map((item, i) => (React.createElement(RadioButton, { value: item.toString(), color: "#FFF", style: { marginTop: -4, borderBottomColor: 'white', borderBottomWidth: 1, flex: 1 } },
                    React.createElement(Text, { style: styles.description }, item))))))));
    }
}
{
}
//# sourceMappingURL=index.js.map