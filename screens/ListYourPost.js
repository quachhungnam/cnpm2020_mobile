import React, { Component } from 'react';
import { Text, View, TouchableHighlight, ScrollView, AsyncStorage, } from 'react-native';
import PostYouBookFlatList from '../components/PostYouBookFlatList';
export default class ListYourPost extends Component {
  constructor(props) {
    super(props);
    this.state = {

      tokenz: ''
    };
  }
  add_post = () => {
    AsyncStorage.getItem('user').then(value =>
    //AsyncStorage returns a promise so adding a callback to get the value
    {
      this.setState({ tokenz: value })
      console.log(this.state.tokenz)
      alert(this.state.tokenz)
    }
      //Setting the value in Text
    );
  }
  render() {
    return (
      <ScrollView
        style={{ flex: 1, flexDirection: 'column', backgroundColor: '#fff' }}>
        <PostYouBookFlatList
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
            this.add_post()
            // this.props.navigation.navigate('AddPostScreen');
          }}>
          <Text style={{ textAlign: 'center' }}>Thêm tin đăng</Text>
        </TouchableHighlight>
      </ScrollView>
    );
  }
}
