import React, {Component} from 'react';
import {
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

const width = Dimensions.get('window').width;

export default class Signup extends Component {
  render() {
    const {navigation} = this.props;
    return (
      <ScrollView style={styles.container}>
        <View style={styles.iconContainer}>
          <Image
            source={require('../images/sign-up.png')}
            style={styles.icon}
          />
        </View>
        <View style={styles.infoContainer}>
          <Text style={styles.label}>Tên đăng nhập</Text>
          <TextInput
            style={styles.input}
            returnKeyType="next"
            autoCorrect={false}
            onSubmitEditing={() => this.refs.txtName.focus()}
          />
          <Text style={styles.label}>Họ tên</Text>
          <TextInput
            style={styles.input}
            returnKeyType="next"
            autoCorrect={false}
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
          />
          <Text style={styles.label}>Số điện thoại</Text>
          <TextInput
            style={styles.input}
            keyboardType="numeric"
            returnKeyType="next"
            autoCorrect={false}
            onSubmitEditing={() => this.refs.txtAddress.focus()}
            ref={'txtMobile'}
          />
          <Text style={styles.label}>Địa chỉ</Text>
          <TextInput
            style={styles.input}
            returnKeyType="next"
            autoCorrect={false}
            onSubmitEditing={() => this.refs.txtPassword.focus()}
            ref={'txtAddress'}
            multiline={true}
          />
          <Text style={styles.label}>Mật khẩu</Text>
          <TextInput
            style={styles.input}
            returnKeyType="next"
            secureTextEntry
            autoCorrect={false}
            ref={'txtPassword'}
            onSubmitEditing={() => this.refs.txtConfirmPassword.focus()}
          />
          <Text style={styles.label}>Xác nhận mật khẩu</Text>
          <TextInput
            style={styles.input}
            returnKeyType="go"
            secureTextEntry
            autoCorrect={false}
            ref={'txtConfirmPassword'}
          />
          <TouchableOpacity
            style={styles.buttonContainer}
            onPress={() => {
              this.props.navigation.navigate('SignUp');
            }}>
            <Text style={styles.buttonText}>Đăng ký</Text>
          </TouchableOpacity>
          <View style={styles.regContainer}>
            <Text style={styles.regText}>Bạn đã có tài khoản?</Text>
            <TouchableOpacity
              onPress={() => {
                this.props.navigation.navigate('SignIn');
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
