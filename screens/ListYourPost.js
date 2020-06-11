import React, {Component} from 'react';
import {Text, View, TouchableHighlight, ScrollView} from 'react-native';
import PostFlatList from '../components/PostFlatList';
export default class ListYourPost extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <ScrollView
        style={{flex: 1, flexDirection: 'column', backgroundColor: '#fff'}}>
        <PostFlatList
          navigation={this.props.navigation}
          title="Danh sách tin đăng của bạn"
        />
        <TouchableHighlight
          underlayColor="#ffceb588"
          style={{
            marginLeft: 10,
            marginRight: 10,
            paddingTop: 10,
            paddingBottom: 10,
            backgroundColor: '#ffceb5',
            borderRadius: 8,
            marginBottom: 30,
          }}
          onPress={() => {
            this.props.navigation.navigate('AddPostScreen');
          }}>
          <Text style={{textAlign: 'center'}}>Thêm tin đăng</Text>
        </TouchableHighlight>
      </ScrollView>
    );
  }
}
