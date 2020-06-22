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

  componentDidMount() {
    this.getAccount();
  }

  getAccount = async () => {
    try {
      const value_token = await AsyncStorage.getItem('user');
      if (value_token !== null) {
        get_account_infor(value_token)
          .then(result => {
            this.setState({
              account: result.data.account,
            });
          })
          .catch(error => {
            this.setState({
              account: {},
            });
          });
      }
    } catch (err) {
      this.setState({
        account: {},
      });
    }
  };

  render() {
    if (Object.keys(this.state.account).length !== 0) {
      return (
        <View
          style={{ flex: 1, flexDirection: 'column', backgroundColor: '#fff' }}>
          <PostYouBookFlatList
            navigation={this.props.navigation}
            title="Danh sách tin bạn đã đặt"
            account={this.state.account}
          />
        </View>
      );
    }
    return <View />;
  }
}
