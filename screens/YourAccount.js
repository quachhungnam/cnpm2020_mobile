import React, { Component } from 'react';
import {
  StyleSheet,
  TextInput,
  Text,
  View,
  TouchableHighlight,
  Button,
  Image,
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage'
import { get_account_infor } from '../networking/Server'
export default class YourAccount extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tokenz: '',
      user_in: {},
      is_fresh: false
    };
  }
  componentDidMount() {
    this.get_infor()
  }

  get_infor = async () => {
    try {
      const value_token = await AsyncStorage.getItem('user')
      if (value_token) {
        get_account_infor(value_token).then(res => {
          if (res.success == false) {
            this.setState({ user_in: { "name": "", "email": "", "mobile": "", "address": "" } })
            alert('Vui lòng đăng nhập để tiếp tục')
            // this.props.navigation.navigate('SignIn');
          }
          if (res.success == true) {
            this.setState({ user_in: res.data.account })
            alert('Bạn đang đăng nhập')
          }
        })
      }
      if (!value_token) {
        alert('user not found')
      }
    } catch (err) {
      console.log(err)
    }


  }

  logout_user = async () => {
    try {
      await AsyncStorage.removeItem('user')
      this.props.navigation.navigate('SignIn')
      return true;
    } catch (err) {
      console.log(err);
    }
  }

  render() {
    return (
      <View
        style={{
          flex: 1,
          flexDirection: 'column',
          backgroundColor: '#fff',
        }}>
        <Text
          style={styles.text_account}>
          Thông tin tài khoản
        </Text>
        <View
          style={styles.view_account}>
          <View>
            <Text style={{ fontSize: 15, marginBottom: 10 }}>
              Tên chủ tài khoản
            </Text>
            <Text style={{ fontSize: 18 }}>{this.state.user_in.name}</Text>
          </View>

          <TouchableHighlight
            style={{ borderRadius: 30 }}
            onPress={() => {
              this.props.navigation.navigate('EditAvatarAccount');
            }}>
            <Image
              source={require('../images/room.jpg')}
              style={{ width: 60, height: 60, borderRadius: 30 }}
            />
          </TouchableHighlight>
        </View>

        <View
          style={styles.view_email}>
          <Text style={{ fontSize: 15, marginBottom: 10 }}>Email</Text>
          <Text style={{ fontSize: 18 }}>{this.state.user_in.email}</Text>
        </View>

        <View
          style={styles.view_phone}>
          <Text style={{ fontSize: 15, marginBottom: 10 }}>Số điện thoại</Text>
          <Text style={{ fontSize: 18 }}>{this.state.user_in.mobile}</Text>
        </View>

        <View
          style={styles.view_email}>
          <Text style={{ fontSize: 15, marginBottom: 10 }}>Địa chỉ</Text>
          <Text style={{ fontSize: 18 }}>{this.state.user_in.address}</Text>
        </View>

        <TouchableHighlight
          underlayColor="transparent"
          style={{
            marginVertical: 10,
          }}
          onPress={() => {
            this.props.navigation.navigate('EditAccountScreen');
          }}>
          <View
            style={styles.view_option_edit}>
            <Text style={{ color: '#e88a59', fontWeight: 'bold', fontSize: 16 }}>
              Chỉnh sửa tài khoản
            </Text>
            <Image
              source={require('../images/next.png')}
              style={{ width: 15, height: 15 }}
            />
          </View>
        </TouchableHighlight>
        <TouchableHighlight
          underlayColor="transparent"
          style={{
            marginVertical: 10,
          }}
          onPress={() => {
            this.props.navigation.navigate('EditPasswordAccountScreen');
          }}>
          <View
            style={styles.view_option_edit}>
            <Text style={{ color: '#e88a59', fontWeight: 'bold', fontSize: 16 }}>
              Chỉnh sửa mật khẩu
            </Text>
            <Image
              source={require('../images/next.png')}
              style={{ width: 15, height: 15 }}
            />
          </View>
        </TouchableHighlight>
        <TouchableHighlight
          underlayColor="transparent"
          style={{
            marginVertical: 10,
          }}
          onPress={() => {
            this.props.navigation.navigate('FeedbackScreen');
          }}>
          <View
            style={styles.view_option_edit}>
            <Text style={{ color: '#e88a59', fontWeight: 'bold', fontSize: 16 }}>
              Phản hồi cho quản trị viên
            </Text>
            <Image
              source={require('../images/next.png')}
              style={{ width: 15, height: 15 }}
            />
          </View>
        </TouchableHighlight>
        <TouchableHighlight
          underlayColor="transparent"
          style={{
            marginVertical: 10,
          }}
          onPress={() => {
            this.logout_user();
          }}>
          <View
            style={styles.view_option_edit}>
            <Text style={{ color: '#e88a59', fontWeight: 'bold', fontSize: 16 }}>
              Đăng xuất
            </Text>
          </View>
        </TouchableHighlight>
        <Button
          onPress={() => {
            // this.get_token()
            this.get_infor()
            // alert(this.state.tokenz)
          }}
          title="Test Token"
          color="#f194ff"
          accessibilityLabel="Learn more about this purple button"
        ></Button>
      </View >
    );
  }
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
  }
})