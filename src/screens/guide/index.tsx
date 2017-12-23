import * as React from 'react';
import {
	View,
	Image,
	Text,
	TouchableOpacity,
	StatusBar,
} from 'react-native';

import {Actions} from 'react-native-router-flux';
import styles from './styles';
import ViewPager from 'react-native-viewpager';
import {RouteMap} from '../../routemap';
import {GuideSignUp} from './guide_signup';
import {App} from "../../App";
const MyStatusBar = ({backgroundColor, ...props}) => (
	<View style={[styles.statusBar, {backgroundColor}]}>
		<StatusBar backgroundColor={backgroundColor} {...props} />
	</View>
);

export class Guide extends React.Component<any, { dataSource: ViewPager.DataSource, data : any, index : number }> {

	private viewpager : ViewPager;
	private pageNumber : number;
	constructor(props: any, context: any) {
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
			(
				<View style={styles.guide_container}>
					<Image
						source={require('../../../img/i1-discover.png')}
						style={styles.guide_image}/>
					<Text style={styles.guide_title}>
						Guaranteed Upgrades with Every Purchase
					</Text>
					<Text style={styles.guide_detail}>
						Buy bottles from our daily curated collections
					</Text>
				</View>
			),
			(
				<View style={styles.guide_container}>
					<Image
						source={require('../../../img/i2-vertical.png')}
						style={styles.guide_image}/>
					<Text style={styles.guide_detail}>
						Bottles are swapped to more expensive ones for free
					</Text>
				</View>
			),
			(
				<View style={styles.guide_container}>
					<Image
						source={require('../../../img/i3-collect.png')}
						style={styles.guide_image}/>
					<Text style={styles.guide_title}>
						Complimentary Storage with Every Purchase
					</Text>
					<Text style={styles.guide_detail}>
						Store up to 500 bottles in our Napa Valley cellar
					</Text>
				</View>
			),
			(
				<View style={styles.guide_container}>
					<Image
						source={require('../../../img/i4-horizontal.png')}
						style={styles.guide_image}/>
					<Text style={styles.guide_detail}>
						Mix-and-match bottles into cases and ship for free
					</Text>
				</View>
			)
		];

		if (!props.guideApp.isLoggedIn()) {
			data.push(<View style={styles.guide_container}>
				<GuideSignUp gsApp={this.props.guideApp} />
			</View>);
			ids.push('signup');
		}

		this.state = {
			dataSource: dataSource.cloneWithPages(ids),
			data : data,
			index : 0
		}
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
		return (
			<View style={styles.container}>
				<MyStatusBar backgroundColor="#5E8D48" barStyle="light-content"/>
				<Image style={styles.background} source={require('../../../img/gradient.jpg')}/>
				<ViewPager
					ref={(viewpager) => {this.viewpager = viewpager}}
					style={styles.viewPager}
					dataSource={this.state.dataSource}
					renderPage={this._renderPage.bind(this)}
					isLoop={false}
					autoPlay={false}
					onChangePage={(number)=>{this.pageNumber = number}}/>
				{ this.props.guideApp.isLoggedIn() && <TouchableOpacity style={styles.btnCloseContainer} onPress={this.showHome.bind(this)}>
					<Image style={styles.btnImg} source={require('../../../img/close.png')}/>
				</TouchableOpacity> }
				{this.pageNumber > 4 ? <View /> : <TouchableOpacity style={styles.btnNextContainer} onPress={()=>{
					this.pageNumber = this.viewpager.getCurrentPage();
					if (this.pageNumber < 4) {
						this.viewpager.goToPage(this.pageNumber + 1);
            			this.pageNumber = this.pageNumber + 1;
					} else {
						this.setState({index : this.pageNumber});
					}
				}}><Text style={styles.largeLabel}>Next</Text></TouchableOpacity>}
			</View>
		);
	}

	_renderPage(data: Object, pageID: number | string) {
		return this.state.data[pageID];
	}
}
