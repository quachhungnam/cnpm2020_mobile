import React, {Component} from 'react';
import {
  TextInput,
  Text,
  View,
  TouchableHighlight,
  Button,
  Image,
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

export default class YourAccount extends Component {
  constructor(props) {
    super(props);
  }
  removeItemValue = async () => {
    try {
      await AsyncStorage.removeItem('user');
      alert('â');
      return true;
    } catch (exception) {
      console.log(exception);
    }
  };
  render() {
    return (
      <View
        style={{
          flex: 1,
          flexDirection: 'column',
          backgroundColor: '#fff',
        }}>
        <Text
          style={{
            fontSize: 18,
            textAlign: 'center',
            paddingVertical: 10,
            letterSpacing: 1,
            backgroundColor: '#eee',
          }}>
          Tài khoản
        </Text>
        <View
          style={{
            marginRight: 10,
            marginLeft: 10,
            paddingTop: 10,
            paddingBottom: 10,
            borderBottomWidth: 1,
            borderBottomColor: '#ccc',
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
          <View>
            <Text style={{fontSize: 15, marginBottom: 10}}>
              Tên chủ tài khoản
            </Text>
            <Text style={{fontSize: 18}}>Nguyễn Văn A</Text>
          </View>

          <Image
            source={require('../images/room.jpg')}
            style={{width: 60, height: 60, borderRadius: 30}}
          />
        </View>

        <View
          style={{
            marginRight: 10,
            marginLeft: 10,
            marginTop: 10,
            paddingBottom: 10,
            borderBottomWidth: 1,
            borderBottomColor: '#ccc',
          }}>
          <Text style={{fontSize: 15, marginBottom: 10}}>Email</Text>
          <Text style={{fontSize: 18}}>test@gmail.com</Text>
        </View>

        <View
          style={{
            marginRight: 10,
            marginLeft: 10,
            marginTop: 10,
            paddingBottom: 10,
            borderBottomWidth: 1,
            borderBottomColor: '#ccc',
          }}>
          <Text style={{fontSize: 15, marginBottom: 10}}>Số điện thoại</Text>
          <Text style={{fontSize: 18}}>0335941792</Text>
        </View>

        <View
          style={{
            marginRight: 10,
            marginLeft: 10,
            marginTop: 10,
            paddingBottom: 10,
            borderBottomWidth: 1,
            borderBottomColor: '#ccc',
          }}>
          <Text style={{fontSize: 15, marginBottom: 10}}>Địa chỉ</Text>
          <Text style={{fontSize: 18}}>Đà Nẵng</Text>
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
            style={{
              marginHorizontal: 10,
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}>
            <Text style={{color: '#e88a59', fontWeight: 'bold', fontSize: 16}}>
              Chỉnh sửa tài khoản
            </Text>
            <Image
              source={require('../images/next.png')}
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
            this.props.navigation.navigate('EditPasswordAccountScreen');
          }}>
          <View
            style={{
              marginHorizontal: 10,
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}>
            <Text style={{color: '#e88a59', fontWeight: 'bold', fontSize: 16}}>
              Chỉnh sửa mật khẩu
            </Text>
            <Image
              source={require('../images/next.png')}
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
            this.props.navigation.navigate('FeedbackScreen');
          }}>
          <View
            style={{
              marginHorizontal: 10,
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}>
            <Text style={{color: '#e88a59', fontWeight: 'bold', fontSize: 16}}>
              Phản hồi cho quản trị viên
            </Text>
            <Image
              source={require('../images/next.png')}
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
            this.removeItemValue();
          }}>
          <View
            style={{
              marginHorizontal: 10,
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}>
            <Text style={{color: '#e88a59', fontWeight: 'bold', fontSize: 16}}>
              Đăng xuất
            </Text>
          </View>
        </TouchableHighlight>
      </View>
    );
  }
}
