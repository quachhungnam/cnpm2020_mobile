import React, {Component, useState, useEffect} from 'react';
import {
  Text,
  View,
  TouchableHighlight,
  ScrollView,
  StyleSheet,
} from 'react-native';
import {get_account_infor} from '../networking/Server';
import YourPostFlatList from '../components/YourPostFlatList';
import AsyncStorage from '@react-native-community/async-storage';
export default function ListYourPost(props) {
  const [tokenz, set_tokenz] = useState(null);
  const [account, setAccount] = useState({});

  useEffect(() => {
    getAccount();
  }, []);

  const getAccount = async () => {
    try {
      const value_token = await AsyncStorage.getItem('user');
      if (value_token !== null) {
        get_account_infor(value_token)
          .then(result => {
            setAccount(result.data.account);
          })
          .catch(error => {
            setAccount({});
          });
      }
    } catch (err) {
      setAccount({});
    }
  };

  const add_post = () => {
    AsyncStorage.getItem('user').then(value => {
      set_tokenz(value);
    });
  };

  if (Object.keys(account).length !== 0) {
    return (
      <>
        <View
          style={{flex: 1, flexDirection: 'column', backgroundColor: '#fff'}}>
          <YourPostFlatList
            navigation={props.navigation}
            title="Danh sách tin đăng của bạn"
            account={account}
          />
        </View>
        <TouchableHighlight
          underlayColor="#ffceb588"
          style={styles.touch_view}
          onPress={() => {
            props.navigation.navigate('AddPostScreen');
          }}>
          <Text style={{textAlign: 'center'}}>Thêm tin đăng</Text>
        </TouchableHighlight>
      </>
    );
  }
  return <View />;
}

const styles = StyleSheet.create({
  touch_view: {
    marginTop: 10,
    marginLeft: 10,
    marginRight: 10,
    paddingTop: 10,
    paddingBottom: 10,
    backgroundColor: '#ffceb5',
    borderRadius: 8,
    marginBottom: 10,
  },
});
