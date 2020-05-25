import React, {Component} from 'react';
import { TextInput, Text, View, TouchableHighlight, Button } from 'react-native';
import FlatList2 from './FlatList2';
export default class ListScreen extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <View style={{flex: 1, flexDirection: 'column'}}>
                <TextInput style={{marginTop: 10, padding: 10, marginLeft: 10, marginRight: 10, backgroundColor: 'silver',
                    borderRadius: 10
                }} placeholder='Vấn đề bạn cần phản hồi'></TextInput>
                <TouchableHighlight
                    style={{marginBottom: 10, marginTop: 10, marginLeft: 10, marginRight: 10, paddingTop: 5, paddingBottom: 5, backgroundColor: 'lightblue', borderRadius: 10}}
                >
                    <Text style={{textAlign: 'center'}}>Gửi phản hồi</Text>
                </TouchableHighlight>
            </View>
        )
        
    }
}