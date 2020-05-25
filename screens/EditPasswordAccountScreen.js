import React, {Component} from 'react';
import { TextInput, Text, View, TouchableHighlight, Button } from 'react-native';
import FlatList2 from './FlatList2';
export default class EditPasswordAccountScreen extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <View style={{flex: 1, flexDirection: 'column'}}>
                <TextInput style={{marginTop: 10, marginBottom: 10, padding: 10, marginLeft: 10, marginRight: 10, backgroundColor: 'silver',
                    borderRadius: 10
                }} placeholder='Mật khẩu cũ'></TextInput>
                <TextInput style={{marginBottom: 10, padding: 10, marginLeft: 10, marginRight: 10, backgroundColor: 'silver',
                    borderRadius: 10
                }} placeholder='Mật khẩu mới'></TextInput>
                <TextInput style={{marginBottom: 10, padding: 10, marginLeft: 10, marginRight: 10, backgroundColor: 'silver',
                    borderRadius: 10
                }} placeholder='Xác nhận mật khẩu mới'></TextInput>
                <TextInput style={{marginBottom: 10, padding: 10, marginLeft: 10, marginRight: 10, backgroundColor: 'silver',
                    borderRadius: 10
                }} placeholder='Mật khẩu cấp 2'></TextInput>
                <TouchableHighlight
                    style={{marginBottom: 10, marginTop: 10, marginLeft: 10, marginRight: 10, paddingTop: 5, paddingBottom: 5, backgroundColor: 'lightblue', borderRadius: 10}}
                >
                    <Text style={{textAlign: 'center'}}>Đổi mật khẩu</Text>
                </TouchableHighlight>
            </View>
        )
        
    }
}