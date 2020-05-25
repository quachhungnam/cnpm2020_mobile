import React, {Component} from 'react';
import { Text, TextInput, View, ScrollView, Button, TouchableHighlight } from 'react-native';

export default class HomeScreen extends Component {
    render() {
        return (
            <ScrollView style={{padding: 20, marginTop: 0}}>
                <Text 
                    style={{fontSize: 27, marginBottom: 20,  color: 'deeppink'}}>
                    Đăng kí tài khoản
                </Text>
                <TextInput style={{marginBottom: 10, padding: 10, marginLeft: 10, marginRight: 10, backgroundColor: 'silver',
                    borderRadius: 10
                }} placeholder='Tên đăng nhập' />
                <TextInput style={{marginBottom: 10, padding: 10, marginLeft: 10, marginRight: 10, backgroundColor: 'silver',
                    borderRadius: 10
                }} placeholder='Số điện thoại' />
                <TextInput style={{marginBottom: 10, padding: 10, marginLeft: 10, marginRight: 10, backgroundColor: 'silver',
                    borderRadius: 10
                }} placeholder='Địa chỉ' />
                <TextInput style={{marginBottom: 10, padding: 10, marginLeft: 10, marginRight: 10, backgroundColor: 'silver',
                    borderRadius: 10
                }} placeholder='Email' />
                <TextInput style={{marginBottom: 10, padding: 10, marginLeft: 10, marginRight: 10, backgroundColor: 'silver',
                    borderRadius: 10
                }} placeholder='Mật khẩu' />
                <TextInput style={{marginBottom: 10, padding: 10, marginLeft: 10, marginRight: 10, backgroundColor: 'silver',
                    borderRadius: 10
                }} placeholder='Nhập lại mật khẩu' />
                <TextInput style={{marginBottom: 10, padding: 10, marginLeft: 10, marginRight: 10, backgroundColor: 'silver',
                    borderRadius: 10
                }} placeholder='Mật khẩu cấp 2' />
                <View style={{margin:7}} />
                <TouchableHighlight
                    onPress={() => {
                        this.props.navigation.navigate('SignUp');
                    }}
                    style={{marginBottom: 10, marginTop: 10, marginLeft: 10, marginRight: 10, paddingTop: 5, paddingBottom: 5, backgroundColor: 'lightblue', borderRadius: 10}}
                >
                    <Text style={{textAlign: 'center'}}>Đăng kí</Text>
                </TouchableHighlight>
                <TouchableHighlight
                    onPress={() => {
                        this.props.navigation.navigate('SignIn');
                    }}
                    style={{marginBottom: 30, marginTop: 10, marginLeft: 10, marginRight: 10, paddingTop: 5, paddingBottom: 5, backgroundColor: 'lightblue', borderRadius: 10}}
                >
                    <Text style={{textAlign: 'center'}}>Đã có tài khoản? Đăng nhập ngay!</Text>
                </TouchableHighlight>
              </ScrollView>
        )
        
    }
}