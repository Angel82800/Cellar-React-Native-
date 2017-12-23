import React, {Component} from 'react';
import {
	View,
	ScrollView,
	Text,
	ListView,
	Image,
	TouchableOpacity, ListViewDataSource, ViewStyle,
} from 'react-native';

import styles from './styles';
import {WineItem} from './wineitem';

export class Wine extends React.Component<{ wines: any, style: ViewStyle }, { dataSource: ListViewDataSource }> {

	constructor(props) {
		super(props);
		const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
		this.state = {
			dataSource: ds.cloneWithRows([]),
		}
	}

	componentDidMount() {
		let wines = this.props.wines;
		this.setState({dataSource: this.state.dataSource.cloneWithRows(wines)});
	}

	render() {
		return (
			<View style={styles.container}>
				<ListView
					showsVerticalScrollIndicator={false}
					enableEmptySections
					dataSource={this.state.dataSource}
					renderRow={(rowData) =>
						<TouchableOpacity >
							<WineItem
								data={{...rowData}}
							/>
						</TouchableOpacity>
					}
				/>
			</View>
		);
	}
}
