import React, { Component, useEffect, useState } from 'react';
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

export default function YourAccount(props) {
  // const [is_screen, set_is_screen] = useState(false)
  const [is_login, set_is_login] = useState(false)
  const [user_infor, set_user_infor] = useState({})
  const [user_token, set_user_token] = useState('')

  useEffect(() => {
    let x = check_login()
  }, []);


  const check_login = async () => {
    try {
      const value_token = await AsyncStorage.getItem('user')
      if (value_token) {
        set_user_token(value_token)
        get_account_infor(value_token).then(res => {
          if (res.success == true) {
            set_user_infor(res.data.account)
            set_is_login(true)
            return true
          }
        })
      }
      return false
    } catch (err) {
      return false
    }
  }

  const logout_user = async () => {
    try {
      // this.setState({ is_login: false })
      await AsyncStorage.removeItem('user')
      set_is_login(false)
      set_user_token('')
      set_user_infor({})
      // set_is_screen(true)
      props.navigation.navigate('SignIn')
      return true;
    } catch (err) {
      console.log(err);
    }
  }

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
          <Text style={{ fontSize: 18 }}>{user_infor.name}</Text>
        </View>

        <TouchableHighlight
          style={{ borderRadius: 30 }}
          onPress={() => {
            if (is_login === true) {
              props.navigation.navigate('EditAvatarAccount',
                { account: user_infor, user_token: user_token });
            }
          }}
        >
          <Image
            source={require('../images/room.jpg')}
            style={{ width: 60, height: 60, borderRadius: 30 }}
          />
        </TouchableHighlight>
      </View>

      <View
        style={styles.view_email}>
        <Text style={{ fontSize: 15, marginBottom: 10 }}>Email</Text>
        <Text style={{ fontSize: 18 }}>{user_infor.email}</Text>
      </View>

      <View
        style={styles.view_phone}>
        <Text style={{ fontSize: 15, marginBottom: 10 }}>Số điện thoại</Text>
        <Text style={{ fontSize: 18 }}>{user_infor.mobile}</Text>
      </View>

      <View
        style={styles.view_email}>
        <Text style={{ fontSize: 15, marginBottom: 10 }}>Địa chỉ</Text>
        <Text style={{ fontSize: 18 }}>{user_infor.address}</Text>
      </View>

      <TouchableHighlight
        underlayColor="transparent"
        style={{
          marginVertical: 10,
        }}
        onPress={() => {
          if (is_login === true) {
            props.navigation.navigate('EditAccountScreen',
              { account: user_infor, user_token: user_token })
          }
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
          if (is_login === true) {
            props.navigation.navigate('EditPasswordAccountScreen',
              { account: user_infor, user_token: user_token })
          }
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
          if (is_login === true) {
            props.navigation.navigate('FeedbackScreen',
              { account: user_infor, user_token: user_token });
          }
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

          logout_user()

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
          alert(is_login)
          // alert(props.route.params.islogin)
          // alert(user_token)
          // alert(props.navigation.route)
          check_login()
        }}
        title="Test Token"
        color="#f194ff"
        accessibilityLabel="Learn more about this purple button"
      ></Button>
      <Button
        onPress={() => {
          // if (!check_login()) {
          // alert('Bạn đã đăng nhập')
          // update_account()
          // props.navigation.navigate('SignIn')
          // }
        }}
        title="Dang nhap"
        color="#f194ff"
        accessibilityLabel="Learn more about this purple button"
      ></Button>
    </View >
  );

}


// export default class YourAccount extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       // tokenz: '',
//       user_infor: {},
//       is_fresh: false,
//       is_login: false
//     };
//   }
//   componentDidMount() {
//     this.setState({ is_fresh: !this.state.is_fresh })
//     this.get_infor()
//   }

//   get_infor = async () => {
//     try {
//       const value_token = await AsyncStorage.getItem('user')
//       if (value_token) {
//         get_account_infor(value_token).then(res => {
//           if (res.success == false) {
//             this.setState({ user_infor: { "name": "", "email": "", "mobile": "", "address": "" } })
//             alert('Vui lòng đăng nhập để tiếp tục')
//             return false
//             // this.props.navigation.navigate('SignIn');
//           }
//           if (res.success == true) {
//             this.setState({ user_infor: res.data.account })
//             this.setState({ is_login: true })
//             alert('Bạn đang đăng nhập')
//             return true
//           }
//         })
//       }
//       if (!value_token) {
//         alert('Bạn chưa đăng nhập')
//         this.setState({ is_login: false })
//         return false
//       }
//     } catch (err) {
//       console.log(err)
//       return false
//     }
//   }

//   logout_user = async () => {
//     try {
//       this.setState({ is_login: false })
//       await AsyncStorage.removeItem('user')
//       this.props.navigation.navigate('SignIn')
//       return true;
//     } catch (err) {
//       console.log(err);
//     }
//   }




//   render() {
//     return (
//       <View
//         style={{
//           flex: 1,
//           flexDirection: 'column',
//           backgroundColor: '#fff',
//         }}>
//         <Text
//           style={styles.text_account}>
//           Thông tin tài khoản
//         </Text>
//         <View
//           style={styles.view_account}>
//           <View>
//             <Text style={{ fontSize: 15, marginBottom: 10 }}>
//               Tên chủ tài khoản
//             </Text>
//             <Text style={{ fontSize: 18 }}>{this.state.user_infor.name}</Text>
//           </View>

//           <TouchableHighlight
//             style={{ borderRadius: 30 }}
//             onPress={() => {
//               if (this.state.is_login === true) {
//                 this.props.navigation.navigate('EditAvatarAccount');
//               }
//             }}>
//             <Image
//               source={require('../images/room.jpg')}
//               style={{ width: 60, height: 60, borderRadius: 30 }}
//             />
//           </TouchableHighlight>
//         </View>

//         <View
//           style={styles.view_email}>
//           <Text style={{ fontSize: 15, marginBottom: 10 }}>Email</Text>
//           <Text style={{ fontSize: 18 }}>{this.state.user_infor.email}</Text>
//         </View>

//         <View
//           style={styles.view_phone}>
//           <Text style={{ fontSize: 15, marginBottom: 10 }}>Số điện thoại</Text>
//           <Text style={{ fontSize: 18 }}>{this.state.user_infor.mobile}</Text>
//         </View>

//         <View
//           style={styles.view_email}>
//           <Text style={{ fontSize: 15, marginBottom: 10 }}>Địa chỉ</Text>
//           <Text style={{ fontSize: 18 }}>{this.state.user_infor.address}</Text>
//         </View>

//         <TouchableHighlight
//           underlayColor="transparent"
//           style={{
//             marginVertical: 10,
//           }}
//           onPress={() => {
//             if (this.state.is_login === true) {
//               this.props.navigation.navigate('EditAccountScreen')
//             }
//           }}>
//           <View
//             style={styles.view_option_edit}>
//             <Text style={{ color: '#e88a59', fontWeight: 'bold', fontSize: 16 }}>
//               Chỉnh sửa tài khoản
//             </Text>
//             <Image
//               source={require('../images/next.png')}
//               style={{ width: 15, height: 15 }}
//             />
//           </View>
//         </TouchableHighlight>
//         <TouchableHighlight
//           underlayColor="transparent"
//           style={{
//             marginVertical: 10,
//           }}
//           onPress={() => {
//             if (this.state.is_login === true) {
//               this.props.navigation.navigate('EditPasswordAccountScreen')
//             }
//           }}>
//           <View
//             style={styles.view_option_edit}>
//             <Text style={{ color: '#e88a59', fontWeight: 'bold', fontSize: 16 }}>
//               Chỉnh sửa mật khẩu
//             </Text>
//             <Image
//               source={require('../images/next.png')}
//               style={{ width: 15, height: 15 }}
//             />
//           </View>
//         </TouchableHighlight>
//         <TouchableHighlight
//           underlayColor="transparent"
//           style={{
//             marginVertical: 10,
//           }}
//           onPress={() => {
//             if (this.state.is_login === true) {
//               this.props.navigation.navigate('FeedbackScreen');
//             }
//           }}>
//           <View
//             style={styles.view_option_edit}>
//             <Text style={{ color: '#e88a59', fontWeight: 'bold', fontSize: 16 }}>
//               Phản hồi cho quản trị viên
//             </Text>
//             <Image
//               source={require('../images/next.png')}
//               style={{ width: 15, height: 15 }}
//             />
//           </View>
//         </TouchableHighlight>
//         <TouchableHighlight
//           underlayColor="transparent"
//           style={{
//             marginVertical: 10,
//           }}
//           onPress={() => {
//             if (this.state.is_login === true) {
//               this.logout_user()
//             }
//           }}>
//           <View
//             style={styles.view_option_edit}>
//             <Text style={{ color: '#e88a59', fontWeight: 'bold', fontSize: 16 }}>
//               Đăng xuất
//             </Text>
//           </View>
//         </TouchableHighlight>
//         <Button
//           onPress={() => {
//             // this.get_token()
//             this.get_infor()
//             // alert(this.state.tokenz)
//           }}
//           title="Test Token"
//           color="#f194ff"
//           accessibilityLabel="Learn more about this purple button"
//         ></Button>
//         <Button
//           onPress={() => {
//             this.props.navigation.navigate('SignIn')

//             // this.get_token()
//             // this.get_infor()
//             // alert(this.state.tokenz)
//           }}
//           title="Dang nhap"
//           color="#f194ff"
//           accessibilityLabel="Learn more about this purple button"
//         ></Button>
//       </View >
//     );
//   }
// }

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