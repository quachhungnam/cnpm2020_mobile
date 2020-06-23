import React, { Component } from 'react';
import {
  Alert,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableWithoutFeedback,
  StatusBar,
  TextInput,
  SafeAreaView,
  Keyboard,
  TouchableOpacity,
  KeyboardAvoidingView,
  Dimensions,
  ScrollView,
} from 'react-native';
import {
  signup
} from '../api/account_api'
const width = Dimensions.get('window').width;

export default class Signup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password1: '',
      password2: '',
      email: '',
      name: '',
      mobile: '',
      address: ''
    };
    //this.add = this.add.bind(this);
  }

  post_signup = () => {
    if (this.state.password1 !== this.state.password2) {
      alert('Xác nhận mật khẩu không đúng')
      return
    }

    const new_user = {
      username: this.state.username,
      password: this.state.password1,
      email: this.state.email,
      name: this.state.name,
      mobile: this.state.mobile,
      address: this.state.address,
    }
    for (const [key, value] of Object.entries(new_user)) {
      if (new_user[key] == '') {
        Alert.alert(
          "Cảnh báo",
          "Vui lòng điền đầy đủ thông tin",
          [
            {
              text: "Cancel",
              onPress: () => { console.log("Cancel Pressed") },
              style: "cancel"
            },
            { text: "OK", onPress: () => { console.log("OK Pressed") } }
          ],
          { cancelable: false }
        )
        return
      }
    }
    //gui du lieu dang ky den api
    signup(new_user).then(res => {
      if (res.success == true) {
        Alert.alert(
          "Cảnh báo",
          "Tạo tài khoản thành công, chuyển hướng đến màn hình đăng nhập",
          [
            {
              text: "Cancel",
              onPress: () => { console.log("Cancel Pressed") },
              style: "cancel"
            },
            {
              text: "OK", onPress: () => {
                this.props.navigation.navigate('SignIn')
              }
            }
          ],
          { cancelable: false }
        )
        return true
      }
      if (res.success == false) {
        Alert.alert(
          "Lỗi",
          `${res.message}`,
          [
            {
              text: "Cancel",
              onPress: () => { console.log("Cancel Pressed") },
              style: "cancel"
            },
            {
              text: "OK", onPress: () => {
                this.props.navigation.navigate('SignIn')
              }
            }
          ],
          { cancelable: false }
        )
        return false
      }
    })

  }
  render() {
    const { navigation } = this.props;
    return (
      <ScrollView style={styles.container}>
        <View style={styles.iconContainer}>
          <Image
            source={require('../assets/images/sign-up.png')}
            style={styles.icon}
          />
        </View>
        <View style={styles.infoContainer}>
          <Text style={styles.label}>Tên đăng nhập</Text>
          <TextInput
            style={styles.input}
            returnKeyType="next"
            autoCorrect={false}
            onChangeText={(text) => {
              this.setState({ username: text })
            }}
            onSubmitEditing={() => this.refs.txtName.focus()}
          />
          <Text style={styles.label}>Họ tên</Text>
          <TextInput
            style={styles.input}
            returnKeyType="next"
            autoCorrect={false}
            onChangeText={(text) => {
              this.setState({ name: text })
            }}
            onSubmitEditing={() => this.refs.txtEmail.focus()}
            ref={'txtName'}
          />
          <Text style={styles.label}>Email</Text>
          <TextInput
            style={styles.input}
            keyboardType="email-address"
            returnKeyType="next"
            autoCorrect={false}
            onSubmitEditing={() => this.refs.txtMobile.focus()}
            ref={'txtEmail'}
            onChangeText={(text) => {
              this.setState({ email: text })
            }}
          />
          <Text style={styles.label}>Số điện thoại</Text>
          <TextInput
            style={styles.input}
            keyboardType="numeric"
            returnKeyType="next"
            autoCorrect={false}
            onSubmitEditing={() => this.refs.txtAddress.focus()}
            ref={'txtMobile'}
            onChangeText={(text) => {
              this.setState({ mobile: text })
            }}
          />
          <Text style={styles.label}>Địa chỉ</Text>
          <TextInput
            style={styles.input}
            returnKeyType="next"
            autoCorrect={false}
            // onSubmitEditing={() => this.refs.txtPassword.focus()}
            ref={'txtAddress'}
            multiline={true}
            onChangeText={(text) => {
              this.setState({ address: text })
            }}
          />
          <Text style={styles.label}>Mật khẩu</Text>
          <TextInput
            style={styles.input}
            returnKeyType="next"
            secureTextEntry
            autoCorrect={false}
            ref={'txtPassword'}
            onChangeText={(pass1) => {
              this.setState({ password1: pass1 })
            }}
            onSubmitEditing={() => this.refs.txtConfirmPassword.focus()}
          />
          <Text style={styles.label}>Xác nhận mật khẩu</Text>
          <TextInput
            style={styles.input}
            returnKeyType="go"
            secureTextEntry
            autoCorrect={false}
            onChangeText={(pass2) => {
              this.setState({ password2: pass2 })
            }}
            ref={'txtConfirmPassword'}
          />
          <TouchableOpacity
            style={styles.buttonContainer}
            onPress={() => {
              // this.props.navigation.navigate('SignUp');
              //goi ham dang ky
              let result = this.post_signup()
              if (result) {
                this.props.navigation.navigate('SignIn');
              }
            }}>
            <Text style={styles.buttonText}>Đăng ký</Text>
          </TouchableOpacity>
          <View style={styles.regContainer}>
            <Text style={styles.regText}>Bạn đã có tài khoản?</Text>
            <TouchableOpacity
              onPress={() => {
                this.props.navigation.navigate('SignIn')
              }}>
              <Text style={styles.regButtonText}>Đăng nhập</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    flexDirection: 'column',
  },
  iconContainer: {
    alignItems: 'center',
    marginVertical: 30,
  },
  icon: {
    width: 100,
    height: 100,
  },
  infoContainer: {
    paddingHorizontal: 30,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  label: {
    fontSize: 16,
    marginBottom: 10,
  },
  input: {
    height: 45,
    color: '#333',
    marginBottom: 20,
    borderColor: '#333',
    borderWidth: 1,
    borderRadius: 8,
  },
  buttonContainer: {
    backgroundColor: '#ffceb5',
    paddingVertical: 10,
    borderRadius: 8,
    marginBottom: 20,
  },
  buttonText: {
    textAlign: 'center',
    color: '#333',
    fontWeight: 'bold',
    fontSize: 18,
  },
  regContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 20,
  },
  regText: {
    fontSize: 16,
    marginRight: 10,
  },
  regButtonText: {
    color: '#e88a59',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
