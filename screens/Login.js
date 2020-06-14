import React, { Component } from 'react';
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
  AsyncStorage,
} from 'react-native';

import { uuidv4 } from 'uuidv4';

const width = Dimensions.get('window').width;

const info = { username: 'a', password: 'a' };

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
    };
  }

  // handleSignIn = async data => {
  //   await AsyncStorage.setItem(
  //     'authentication_data',
  //     JSON.stringify({
  //       authToken: data.token,
  //       deviceId: data.deviceId,
  //       timestamp: data.timestamp,
  //     }),
  //   );
  //   this.props.setSignIn({...data});
  //   console.log('data=' + data);
  // };

  // onSubmit = async values => {
  //   const deviceId = uuidv4();
  //   fetch('http://192.168.1.8:3000/accounts/login', {
  //     headers: {
  //       Accept: 'application/json',
  //       'Content-Type': 'application/json',
  //     },
  //     method: 'POST',
  //     body: JSON.stringify({
  //       username: values.username,
  //       password: values.password,
  //       deviceId: deviceId,
  //     }),
  //   })
  //     .then(res => res.json())
  //     .then(data => {
  //       if (data.success === true) {
  //         this.handleSignIn(data.response);
  //       } else {
  //         this.setState({
  //           error: true,
  //         });
  //       }
  //     })
  //     .catch(e => {
  //       this.setState({
  //         error: true,
  //       });
  //     });
  // };

  // initAuthToken = async () => {
  //   const authData = await AsyncStorage.getItem('authentication_data');

  //   if (authData !== null) {
  //     const authDataJson = JSON.parse(authData);

  //     // get user data
  //     fetch('http://192.168.1.8:3000/accounts/login', {
  //       headers: {
  //         Accept: 'application/json',
  //         'Content-Type': 'application/json',
  //       },
  //       body: JSON.stringify({
  //         authToken: authData.authToken,
  //         deviceId: authData.deviceId,
  //       }),
  //       method: 'POST',
  //     })
  //       .then(res => res.json())
  //       .then(data => {
  //         if (data.success === true) {
  //           this.populateUserSettings(data.response);
  //         } else {
  //           //this.props.navigation.navigate('SignIn');
  //           alert('Login');
  //         }
  //       })
  //       .catch(e => {
  //         this.setState({
  //           error: true,
  //         });
  //       });
  //   } else {
  //     //this.props.navigation.navigate('SignIn');
  //     alert('Login');
  //   }
  // };

  // componentDidUpdate() {
  //   if (this.props.userSettings !== undefined) {
  //     //this.props.navigate('Home');
  //     alert('Home');
  //   }
  //   if (this.props.signedIn !== undefined) {
  //     //this.props.navigate("Home");
  //     alert('Home');
  //   }
  // }

  // componentDidMount() {
  //   this.initAuthToken();
  // }

  storeData = async user => {
    try {
      await AsyncStorage.setItem('user', user);
      alert('da lưu');
    } catch (error) {
      // Error saving data
    }
  };
  retrieveData = async () => {
    try {
      const value = await AsyncStorage.getItem('user');
      console.log('try');
      alert(value);
      if (value != null) {
        this.setState({
          isLogged: true,
          user: value,
        });
      }
      this.setState({
        isLogged: false,
        user: null,
      });
      return value;
    } catch (error) {
      console.log('catch');
      return null;
    }
  };

  render() {
    const { navigation } = this.props;
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
                  source={require('../images/logo.png')}
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
                  onSubmitEditing={() => this.refs.txtPassword.focus()}
                  onChangeText={text => this.setState({ username: text })}
                />
                <TextInput
                  style={styles.input}
                  placeholder="Mật khẩu"
                  placeholderTextColor="#333"
                  returnKeyType="go"
                  secureTextEntry
                  autoCorrect={false}
                  ref={'txtPassword'}
                  onChangeText={text => this.setState({ password: text })}
                />
                <TouchableOpacity
                  style={styles.buttonContainer}
                  onPress={this.onSubmit}>
                  <Text style={styles.buttonText}>Đăng nhập</Text>
                </TouchableOpacity>
                <View style={styles.regContainer}>
                  <Text style={styles.regText}>Bạn chưa có tài khoản?</Text>
                  <TouchableOpacity
                    onPress={() => {
                      this.props.navigation.navigate('SignUp');
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
