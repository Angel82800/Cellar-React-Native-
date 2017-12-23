'use strict';
import * as React from 'react';
import {Component} from "react";
import {
	TouchableOpacity,
	Text,
	View,
	ListView,
	ListViewDataSource,
	Navigator, Alert,ScrollView
} from 'react-native';
import styles from './styles';
import {CommonHeading} from "../heading";
import {App} from "../../App";
import {RadioGroup, RadioButton} from 'react-native-flexi-radio-button';

export interface IPickerValueSelected {
	(selectedItem: string, selectedIndex: string | number);
}

export interface PickerProps {
	data: Array<string>;
	onValueSelected: IPickerValueSelected;
	selectItem:any;
	app: App
}

export interface PickerState {
	dataSource: ListViewDataSource;
	active:any;
}

export class PickerView extends Component<PickerProps, PickerState> {

	constructor(props, context) {
		super(props, context);
		const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
		this.state = {
			dataSource: ds.cloneWithRows([]),
			active:0,
		}
	}

	componentDidMount() {
		let dataList = this.props.data;
		console.log(this.props.selectItem.state);
		this.setState({dataSource: this.state.dataSource.cloneWithRows(dataList)});
		if (this.props.selectItem != null){
			if(this.props.selectItem.state != undefined && this.props.selectItem.state != "")
			for(let i=0;i<dataList.length;i++){
				if(this.props.selectItem.state == dataList[i]){
					this.setState({active:i});
				}
			}
		}
	}

	selectData(val: string, index: string | number) {
		if (typeof this.props.onValueSelected === 'function') {
			this.props.onValueSelected(val, index);
			this.props.app.goBack();
		}
		else {
			Alert.alert('Error', 'Please contact support for help with pickerview.');
		}
	}

	onSelect(index,value){
		this.setState({
			active:index
		})
		this.selectData(value,index);
	}

	render() {
		return (
			<View style={styles.container}>
				<CommonHeading
					title="Pick Item"
					onBack={() => this.props.app.goBack()}
				/>
				<ScrollView style={{flex:1}}>
				<RadioGroup
					color="#FFF"
					selectedIndex = {this.state.active}
					onSelect = {(index, value) => this.onSelect(index, value)}>
					{
						this.props.data.map((item,i)=>(							
							<RadioButton value={item.toString()}
                                                color="#FFF" style={{marginTop:-4,borderBottomColor:'white',borderBottomWidth:1,flex:1}}>
								<Text style={styles.description}>
									{item}
								</Text>
							</RadioButton>
						))
					}
				</RadioGroup></ScrollView>
			</View>
		);
	}
}


{/* <ListView
					style={styles.listView}
					showsVerticalScrollIndicator={false}
					enableEmptySections
					dataSource={this.state.dataSource}
					renderRow={(rowData, sectionID: string | number, rowID: string | number) =>
						<RadioButton value={rowData.toString()}
                                                color="#7ED321" style={{marginTop:15,marginBottom:10}}>
						<View style={{flex: 1,borderBottomColor:'white',borderBottomWidth:1}} >
							<Text style={styles.description}>
								{rowData}
							</Text>
						</View>
						</RadioButton>
					}
				/> */}
