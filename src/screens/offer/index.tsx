import React, {Component} from 'react';
import {
	View,
	ScrollView,
	Text,
	ListView,
	Image,
	TouchableOpacity,
	ListViewDataSource,
} from 'react-native';

import styles from './styles';
import {SectionHeader} from './sectionheader';
import {OfferAvatar} from './offeravatar';
import {AboutWine} from './aboutwine';
import {OfferDetail} from './offerdetail';
import {OfferState} from './offerState';
import {OfferV2Entity} from 'ucshared';
import {isEmpty} from "../../utility";

export class Offer extends React.Component<any, { dataSource: ListViewDataSource, offer: OfferV2Entity }> {
	section_arr:any;
	constructor(props, context) {
		super(props, context);
		const ds = new ListView.DataSource({
			rowHasChanged: (r1, r2) => r1 !== r2,
			sectionHeaderHasChanged: (s1, s2) => s1 !== s2
		});
		this.section_arr=[0,0,0];
		this.state = {
			dataSource: ds.cloneWithRowsAndSections({}, [], []),
			offer: {},
		}
	}

	componentDidMount() {
		let offer = this.props.offer;
		const {dataBlob, sectionIds, rowIds} = this.formatData(offer);
		this.setState({
			dataSource: this.state.dataSource.cloneWithRowsAndSections(dataBlob, sectionIds, rowIds),
			offer: offer
		});
	}

	formatData(data) {
		const dataBlob = {};
		const sectionIds: Array<string> = [];
		const rowIds: Array<Array<string>> = [];
		console.log(data);
		var section_num = 1;
		if(data.offerContent != "" && data.offerContent != undefined)
			section_num++;
		if(data.wineryAbout != "" && data.wineryAbout != undefined)
			section_num++;
		if(data.states != null && data.states != undefined)
			section_num++;

		

		for (let i = 0; i < section_num; i++) {
			let sectionID = `${i}`;
			sectionIds.push(sectionID);
			rowIds[sectionID] = [];
			dataBlob[sectionID] = data;
			if (i === 0) {
				dataBlob[sectionID] = false;
			}
			//  else if (i === 2) {
			// 	dataBlob[sectionID] = "About the Winery";
			// } else if(i===1){
			// 	dataBlob[sectionID] = "About the Offer";
			// }else{
			// 	dataBlob[sectionID] = "States this offer can be shipped to";
			// }
			var val = 0;
			if(data.offerContent != "" && data.offerContent != undefined && this.section_arr[0]==0 && i>0 && val==0)
				{
					dataBlob[sectionID] = "About the Offer";
					this.section_arr[0] = 1;
					val = 1;
				}
			if(data.wineryAbout != "" && data.wineryAbout != undefined && this.section_arr[1]==0 && i>0 && val==0)
				{
					dataBlob[sectionID] = "About the Winery";
					this.section_arr[1] = 1;
					val = 1;
				}
			if(data.states != null && data.states != undefined && this.section_arr[2]==0 && i>0 && val==0)
				{
					dataBlob[sectionID] = "States this offer can be shipped to";
					this.section_arr[2] = 1;
					val = 1;
				}


			for (let j = 0; j < 1; j++) {
				const rowId = `${i}:${j}`;
				rowIds[sectionID].push(rowId);
				dataBlob[rowId] = data;
			}
		}

		return {dataBlob, sectionIds, rowIds};
	}

	render() {
		return (
			<View style={styles.container}>
				<ListView
					style={styles.listView}
					enableEmptySections
					dataSource={this.state.dataSource}
					renderRow={(rowData, sectionID) => {
						if(parseInt(sectionID.toString()) == 0)
							return <View>
									<OfferAvatar data={this.state.offer}/>
								</View>;
						if(this.state.offer.offerContent != "" && this.state.offer.offerContent != undefined && this.section_arr[0]==1 && parseInt(sectionID.toString()) == 1){
								
								return <View>
									<OfferDetail data={this.state.offer}/>
								</View>;
								}
						if(this.state.offer.wineryAbout != "" && this.state.offer.wineryAbout != undefined && this.section_arr[1]==1 && parseInt(sectionID.toString()) >1){
								
								return <View>
									 <AboutWine data={this.state.offer}/>
								</View>;
								}
						if(this.state.offer.states != null && this.state.offer.states != undefined && this.section_arr[2]==1 && parseInt(sectionID.toString()) > 1){
								
								return <View>
										<OfferState data={this.state.offer}/>
									</View>;}
						//switch (parseInt(sectionID.toString())) {
						//	case 0:
						//		return <View>
						//			<OfferAvatar data={this.state.offer}/>
						//		</View>;
						//	case 1:
						//	if(this.state.offer.offerContent != "" && this.state.offer.offerContent != undefined)
						//		return <View>
						//			<OfferDetail data={this.state.offer}/>
						//		</View>;
						//		else
						//			return <Text>Unknown sectionID</Text>;
						//	case 2:
						//		if(this.state.offer.wineryAbout != "" && this.state.offer.wineryAbout != undefined)
						//		return <View>
						//			 <AboutWine data={this.state.offer}/>
						//		</View>;
						//			else
						//				return <Text>Unknown sectionID</Text>;
						//	case 3:
						//		if(this.state.offer.states != null && this.state.offer.states != undefined)
						//		return <View>
						//				<OfferState data={this.state.offer}/>
						//			</View>;
						//		else
						//			return <Text>Unknown sectionID</Text>;
						//	default:
								return <Text>Unknown sectionID</Text>;
						//}

					}
					}
					renderSectionHeader={(sectionData) => sectionData && <SectionHeader data={sectionData}/> || null}
				/>
			</View>
		);
	}
}
