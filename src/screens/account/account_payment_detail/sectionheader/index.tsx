import React, {Component, PropTypes} from 'react';
import {View, Text, StyleSheet} from 'react-native';

import styles from './styles'

export class SectionHeader extends React.Component<{ data: any }, {}> {
    constructor(props, context) {
        super(props, context);
    }

    manageHeader(){
        // alert(this.props.data)
        let {data} = this.props;

        switch (this.props.data) {
            case '':
                return (<View style={styles.containerEmptyHeader}>
                </View>);
            default:
                return  (<View style={styles.container}>
                <Text style={styles.textSmall}>{data}</Text>
            </View>);
        }
    }

    render() {
        return this.manageHeader()

    }
}