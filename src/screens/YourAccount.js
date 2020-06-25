import React, {Component, useEffect, useState} from 'react';
import {
  StyleSheet,
  ScrollView,
  Text,
  View,
  TouchableHighlight,
  Image,
  RefreshControl,
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import {get_account_infor} from '../api/account_api';
import {AuthContext} from '../navigation/MyTabs';

import {your_ip} from '../api/your_ip';

function wait(timeout) {
  return new Promise(resolve => {
    setTimeout(resolve, timeout);
  });
}

export default function YourAccount(props) {
  const {signOut, token} = React.useContext(AuthContext);
  const [user_infor, set_user_infor] = useState({});
  const [user_token, set_user_token] = useState(null);
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    check_login();
    wait(2000).then(() => setRefreshing(false));
  }, [refreshing]);

  useEffect(() => {
    check_login();
  }, []);

  const test2 = () => {
    alert(token);
  };
  const check_login = async () => {
    try {
      const value_token = await AsyncStorage.getItem('user');
      const infor = await get_account_infor(value_token);
      if (infor.success == true) {
        set_user_infor(infor.data.account);
        set_user_token(value_token);
      }
    } catch (err) {}
  };
  console.log('hihi: ' + JSON.stringify(user_infor));
  return (
    <ScrollView
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
      style={{
        flex: 1,
        flexDirection: 'column',
        backgroundColor: '#fff',
      }}>
      <Text style={styles.text_account}>Thông tin tài khoản</Text>
      <View style={styles.view_account}>
        <View>
          <Text style={{fontSize: 15, marginBottom: 10}}>Username</Text>
          <Text style={{fontSize: 18}}>{user_infor.username}</Text>
        </View>

        <TouchableHighlight
          style={{borderRadius: 30}}
          onPress={() => {
            props.navigation.navigate('EditAvatarAccount', {
              account: user_infor,
              user_token: user_token,
            });
          }}>
          <Image
            source={{
              uri: your_ip + ':3000/' + user_infor.avatar,
            }}
            style={{width: 60, height: 60, borderRadius: 30}}
          />
        </TouchableHighlight>
      </View>

      <View style={styles.view_email}>
        <Text style={{fontSize: 15, marginBottom: 10}}>Tên chủ tài khoản</Text>
        <Text style={{fontSize: 18}}>{user_infor.name}</Text>
      </View>
      <View style={styles.view_email}>
        <Text style={{fontSize: 15, marginBottom: 10}}>Email</Text>
        <Text style={{fontSize: 18}}>{user_infor.email}</Text>
      </View>

      <View style={styles.view_phone}>
        <Text style={{fontSize: 15, marginBottom: 10}}>Số điện thoại</Text>
        <Text style={{fontSize: 18}}>{user_infor.mobile}</Text>
      </View>

      <View style={styles.view_email}>
        <Text style={{fontSize: 15, marginBottom: 10}}>Địa chỉ</Text>
        <Text style={{fontSize: 18}}>{user_infor.address}</Text>
      </View>

      <TouchableHighlight
        underlayColor="transparent"
        style={{
          marginVertical: 10,
        }}
        onPress={() => {
          props.navigation.navigate('EditAccountScreen', {
            account: user_infor,
            user_token: user_token,
          });
        }}>
        <View style={styles.view_option_edit}>
          <Text style={{color: '#e88a59', fontWeight: 'bold', fontSize: 16}}>
            Chỉnh sửa tài khoản
          </Text>
          <Image
            source={require('../assets/images/next.png')}
            style={{width: 15, height: 15}}
          />
        </View>
      </TouchableHighlight>
      <TouchableHighlight
        underlayColor="transparent"
        style={{
          marginVertical: 10,
        }}
        onPress={() => {
          props.navigation.navigate('EditPasswordAccountScreen', {
            account: user_infor,
            user_token: user_token,
          });
        }}>
        <View style={styles.view_option_edit}>
          <Text style={{color: '#e88a59', fontWeight: 'bold', fontSize: 16}}>
            Chỉnh sửa mật khẩu
          </Text>
          <Image
            source={require('../assets/images/next.png')}
            style={{width: 15, height: 15}}
          />
        </View>
      </TouchableHighlight>
      <TouchableHighlight
        underlayColor="transparent"
        style={{
          marginVertical: 10,
        }}
        onPress={() => {
          props.navigation.navigate('FeedbackScreen', {
            account: user_infor,
            user_token: user_token,
          });
        }}>
        <View style={styles.view_option_edit}>
          <Text style={{color: '#e88a59', fontWeight: 'bold', fontSize: 16}}>
            Phản hồi cho quản trị viên
          </Text>
          <Image
            source={require('../assets/images/next.png')}
            style={{width: 15, height: 15}}
          />
        </View>
      </TouchableHighlight>
      <TouchableHighlight
        underlayColor="transparent"
        style={{
          marginVertical: 10,
        }}
        onPress={() => {
          signOut();
        }}>
        <View style={styles.view_option_edit}>
          <Text style={{color: '#e88a59', fontWeight: 'bold', fontSize: 16}}>
            Đăng xuất
          </Text>
        </View>
      </TouchableHighlight>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  view_account: {
    marginRight: 10,
    marginLeft: 10,
    paddingTop: 10,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  view_email: {
    marginRight: 10,
    marginLeft: 10,
    marginTop: 10,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  view_phone: {
    marginRight: 10,
    marginLeft: 10,
    marginTop: 10,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  view_option_edit: {
    marginHorizontal: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  text_account: {
    fontSize: 18,
    textAlign: 'center',
    paddingVertical: 10,
    letterSpacing: 1,
    backgroundColor: '#eee',
  },
});
