import React, {Component} from 'react';
import { TextInput, Text, View, TouchableHighlight } from 'react-native';
import FlatList1 from './FlatList1';
export default class ListScreen extends Component {
    render() {
        return (
            <View style={{flex: 1, flexDirection: 'column'}}>
                <Text style={{padding: 10,
                    margin: 10, textAlign: 'center', fontWeight: 'bold', letterSpacing: 2}}>Tìm kiếm bài đăng</Text>
                <TextInput style={{
                    padding: 10,
                    margin: 10,
                    borderRadius: 10,
                    backgroundColor: 'silver'
                }}
                placeholder="Tìm theo tên đường, tên quận, tên thành phố">
                </TextInput>
                <TouchableHighlight
                style={{margin: 10, padding: 10, backgroundColor: 'lightblue', borderRadius: 10}} >
                    <Text style={{textAlign: 'center'}}>Tìm kiếm</Text>
                </TouchableHighlight>
            </View>
        )
        
    }
}