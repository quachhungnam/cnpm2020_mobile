import React, { Component } from 'react';
import { View } from 'react-native';
import PostYouBookFlatList from '../components/PostYouBookFlatList';
import AsyncStorage from '@react-native-community/async-storage';
import { get_account_infor } from '../api/account_api';
export default class ListPostYouBook extends Component {
  constructor(props) {
    super(props);
    this.state = {
      account: {},
    };
  }
  render() {
    return (
      <View
        style={{ flex: 1, flexDirection: 'column', backgroundColor: '#fff' }}>
        <PostYouBookFlatList
          navigation={this.props.navigation}
          title="Danh sách tin bạn đã đặt"
        // account={this.state.account}
        />
      </View>
    );
  }
}
