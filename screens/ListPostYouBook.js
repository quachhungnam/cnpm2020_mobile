import React, {Component} from 'react';
import { TextInput, Text, View, TouchableHighlight } from 'react-native';
import FlatList2 from './FlatList2';
export default class ListScreen extends Component {
    render() {
        return (
            <View style={{flex: 1, flexDirection: 'column'}}>
                <FlatList2 navigation={this.props.navigation} title="Danh sách tin bạn đã đặt"></FlatList2>
            </View>
        )
        
    }
}