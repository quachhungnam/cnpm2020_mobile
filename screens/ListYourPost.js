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
                
                <FlatList2 navigation={this.props.navigation} title="Danh sách tin đăng của bạn"></FlatList2>
                <TouchableHighlight
                    style={{marginLeft: 10, marginRight: 10, paddingTop: 5, paddingBottom: 5, backgroundColor: 'lightblue', borderRadius: 10}}
                    onPress={() => {
                        this.props.navigation.navigate('AddPostScreen');
                    }}
                >
                    <Text style={{textAlign: 'center'}}>Thêm bài đăng</Text>
                </TouchableHighlight>
            </View>
        )
        
    }
}