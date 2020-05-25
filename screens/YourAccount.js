import React, {Component} from 'react';
import { TextInput, Text, View, TouchableHighlight, Button } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

export default class ListScreen extends Component {
    constructor(props) {
        super(props);
    }
    removeItemValue = async() => {
        try {
            await AsyncStorage.removeItem('user');
            alert('â');
            return true;
            
        }
        catch(exception) {
            console.log(exception);
        }
    }
    render() {
        return (
            <View style={{flex: 1, flexDirection: 'column'}}>
                <Text style={{fontSize: 16, textAlign: 'center', marginTop: 10, marginBottom: 10, letterSpacing: 1}}>Tài khoản của bạn</Text> 

                <Text style={{fontSize: 15, marginRight: 10, marginLeft: 10, marginTop: 10}}>Họ và tên: Nguyễn Văn A</Text>
                <Text style={{fontSize: 15, marginRight: 10, marginLeft: 10, marginTop: 10}}>Địa chỉ: Đà Nẵng</Text>
                <Text style={{fontSize: 15, marginRight: 10, marginLeft: 10, marginTop: 10}}>Khu vực của bạn: Đà Nẵng</Text>
                <Text style={{fontSize: 15, marginRight: 10, marginLeft: 10, marginTop: 10}}>Số điện thoại: 0335941792</Text>
                <Text style={{fontSize: 15, marginRight: 10, marginLeft: 10, marginTop: 10}}>Email: giakhanh9890@gmail.com</Text>

                <TouchableHighlight
                    style={{marginTop: 20, marginBottom: 10, marginLeft: 10, marginRight: 10, paddingTop: 5, paddingBottom: 5, backgroundColor: 'lightblue', borderRadius: 10}}
                    onPress={() => {
                        this.props.navigation.navigate('EditAccountScreen');
                    }}
                >
                    <Text style={{textAlign: 'center'}}>Chỉnh sửa thông tin cá nhân</Text>
                </TouchableHighlight>
                <TouchableHighlight
                    style={{marginBottom: 10, marginLeft: 10, marginRight: 10, paddingTop: 5, paddingBottom: 5, backgroundColor: 'lightblue', borderRadius: 10}}
                    onPress={() => {
                        this.props.navigation.navigate('EditPasswordAccountScreen');
                    }}
                >
                    <Text style={{textAlign: 'center'}}>Chỉnh sửa mật khẩu</Text>
                </TouchableHighlight>
                <TouchableHighlight
                    style={{marginBottom: 10, marginLeft: 10, marginRight: 10, paddingTop: 5, paddingBottom: 5, backgroundColor: 'lightblue', borderRadius: 10}}
                    onPress={() => {
                        this.props.navigation.navigate('FeedbackScreen');
                    }}
                >
                    <Text style={{textAlign: 'center'}}>Phản hồi cho quản trị viên</Text>
                </TouchableHighlight>
                <TouchableHighlight
                    style={{marginBottom: 10, marginLeft: 10, marginRight: 10, paddingTop: 5, paddingBottom: 5, backgroundColor: 'lightblue', borderRadius: 10}}
                    onPress={() => {
                        this.removeItemValue();
                    }}
                >
                    <Text style={{textAlign: 'center'}}>Đăng xuất</Text>
                </TouchableHighlight>
            </View>
        )
        
    }
}