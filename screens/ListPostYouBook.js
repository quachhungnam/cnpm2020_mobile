import React, {Component} from 'react';
import {View} from 'react-native';
import PostFlatList from '../components/PostFlatList';
export default class ListPostYouBook extends Component {
  render() {
    return (
      <View style={{flex: 1, flexDirection: 'column'}}>
        <PostFlatList
          navigation={this.props.navigation}
          title="Danh sách tin bạn đã đặt"
        />
      </View>
    );
  }
}
