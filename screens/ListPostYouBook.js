import React, { Component } from 'react';
import { View } from 'react-native';
import PostYouBookFlatList from '../components/PostYouBookFlatList';
export default class ListPostYouBook extends Component {
  render() {
    return (
      <View style={{ flex: 1, flexDirection: 'column', backgroundColor: '#fff' }}>
        <PostYouBookFlatList
          navigation={this.props.navigation}
          title="Danh sách tin bạn đã đặt"
        />
      </View>
    );
  }
}
