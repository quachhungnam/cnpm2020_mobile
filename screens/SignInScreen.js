import React, {Component} from 'react';
import { Text, TextInput, View, ScrollView, Button, TouchableHighlight} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

const info = {username: "a", password: "a"};

export default class SignInScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: ''
        }
    }
    storeData = async (user) => {
        try {
          await AsyncStorage.setItem(
            'user',
            user
          );
          alert('da lưu');
        } catch (error) {
          // Error saving data
        }
    };
    retrieveData = async () => {
        try {
            const value = await AsyncStorage.getItem('user');
            console.log("try");
            alert(value);
            if(value != null) {
                this.setState({isLogged: true, user: value});
            }
            this.setState({isLogged: false, user: null});
            return value;
        } catch (error) {
            console.log("catch");
            return null;
        }
    };
    render() {
        return (
            <ScrollView style={{padding: 20, marginTop: 30}}>
                <Text 
                    style={{fontSize: 27, marginBottom: 20, color: 'deeppink'}}>
                    Đăng nhập
                </Text>

                <TextInput style={{marginBottom: 10, 
                    padding: 10, 
                    marginLeft: 10, 
                    marginRight: 10, 
                    backgroundColor: 'silver',
                    borderRadius: 10
                }}
                onChangeText={(text) => this.setState({username: text})} 
                placeholder='Username' 
                />

                <TextInput style={{
                    marginBottom: 10, 
                    padding: 10, 
                    marginLeft: 10, 
                    marginRight: 10, 
                    backgroundColor: 'silver',
                    borderRadius: 10
                }} 
                onChangeText={(text) => this.setState({password: text})} 
                placeholder='Password' 
                />

                <View style={{margin:7}} />
                <TouchableHighlight style={{
                    marginBottom: 10, 
                    marginTop: 10, marginLeft: 10, 
                    marginRight: 10, paddingTop: 5, 
                    paddingBottom: 5, backgroundColor: 'lightblue', 
                    borderRadius: 10
                }}
                onPress={() => {
                    if(this.state.username === info.username && this.state.password === info.password) {
                        alert('login successfullyy');
                        this.storeData(this.state.username);
                    }
                }}
                >
                    <Text style={{textAlign: 'center'}}>Đăng nhập</Text>
                </TouchableHighlight>
                <TouchableHighlight style={{
                    marginBottom: 10, 
                    marginTop: 10, marginLeft: 10, 
                    marginRight: 10, paddingTop: 5, 
                    paddingBottom: 5, backgroundColor: 'lightblue', 
                    borderRadius: 10
                }}
                onPress={() => {

                    this.retrieveData();
                }}
                >
                    <Text style={{textAlign: 'center'}}>Đăng nhập1</Text>
                </TouchableHighlight>

                <TouchableHighlight
                    onPress={() => {
                        this.props.navigation.navigate('SignUp');
                    }}
                    style={{marginBottom: 10, marginTop: 10, marginLeft: 10, marginRight: 10, paddingTop: 5, paddingBottom: 5, backgroundColor: 'lightblue', borderRadius: 10}}
                >
                    <Text style={{textAlign: 'center'}}>Chưa có tài khoản? Đăng kí ngay!</Text>
                </TouchableHighlight>
              </ScrollView>
        )
        
    }
}