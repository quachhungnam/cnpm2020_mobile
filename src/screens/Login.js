import React, { useState, useEffect } from 'react';
import { AuthContext } from '../navigation/MyTabs';
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
} from 'react-native';
const width = Dimensions.get('window').width;


export default function Login(props) {
  const { signIn } = React.useContext(AuthContext)
  const [account, set_account] = useState({ username: 'quachhungnam', password: '123' })
  process_login = () => {
    signIn(account)
  }

  return (
    // vùng an toàn tránh tai thỏ trong iphone
    // StatusBar thanh giờ wifi
    // KeyboardAvoidingView: TextInput đẩy lên cùng với keyboard
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />
      <KeyboardAvoidingView style={styles.container} behavior="height">
        <TouchableWithoutFeedback
          style={styles.container}
          onPress={Keyboard.dismiss}>
          <View style={styles.logoContainer}>
            <View style={styles.logoContainer}>
              <Image
                style={styles.logo}
                source={require('../assets/images/logo.png')}
              />
            </View>
            <View style={styles.infoContainer}>
              <TextInput
                style={styles.input}
                placeholder="Tên đăng nhập"
                placeholderTextColor="#333"
                keyboardType="email-address"
                returnKeyType="next"
                autoCorrect={false}
                // onSubmitEditing={() => this.refs.txtPassword.focus()}
                // onChangeText={text => this.setState({ username: text })}
                onChangeText={(text) => {
                  set_account((pre) => ({ ...pre, username: text }))
                }}
              />
              <TextInput
                style={styles.input}
                placeholder="Mật khẩu"
                placeholderTextColor="#333"
                returnKeyType="go"
                secureTextEntry
                autoCorrect={false}
                // ref={'txtPassword'}
                // onChangeText={password => this.setState({ password: password })}
                onChangeText={(pass) => {
                  set_account((pre) => ({ ...pre, password: pass }))
                }}
              />
              <TouchableOpacity
                style={styles.buttonContainer}
                onPress={() => {
                  // alert(account.username)
                  // alert(account.password)

                  process_login()
                }}
              >
                <Text style={styles.buttonText}>Đăng nhập</Text>
              </TouchableOpacity>
              <View style={styles.regContainer}>
                <Text style={styles.regText}>Bạn chưa có tài khoản?</Text>
                <TouchableOpacity
                  onPress={() => {
                    props.navigation.navigate('SignUp')
                    // this.props.navigation.navigate('SignUp');
                  }}>
                  <Text style={styles.regButtonText}>Đăng ký ngay</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    flexDirection: 'column',
  },
  logoContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  logo: {
    width: 150,
    height: 150,
  },
  infoContainer: {
    width: width,
    left: 0,
    right: 0,
    bottom: 0,
    height: 236,
    paddingHorizontal: 30,
  },
  input: {
    height: 45,
    color: '#333',
    marginBottom: 20,
    paddingHorizontal: 10,
    borderColor: '#333',
    borderWidth: 1,
    borderRadius: 8,
  },
  buttonContainer: {
    backgroundColor: '#ffceb5',
    paddingVertical: 10,
    borderRadius: 8,
  },
  buttonText: {
    textAlign: 'center',
    color: '#333',
    fontWeight: 'bold',
    fontSize: 18,
  },
  regContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
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
