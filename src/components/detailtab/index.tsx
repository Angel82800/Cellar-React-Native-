/**
 * UndergroundCellar
 * Copyright @ 2017 by Roderick L. 
 * @flow
**/

import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';

class DetailTabBar extends React.Component<{tabStyle?: any, title: boolean}, {}> {
  render() {
    return (
        <View style = {{flex : 1, }}>
          <Text style = {this.props.tabStyle}> 
            {this.props.title}
          </Text>
        </View>
      );
  }
}

export default DetailTabBar