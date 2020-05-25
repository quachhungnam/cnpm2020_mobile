import React, {Component} from 'react';
import { TextInput, Text, View, TouchableHighlight, Button, Picker, ScrollView } from 'react-native';
import FlatList2 from './FlatList2';
export default class AddPostScreen extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        var options =["Tỉnh/Thành","Savings","Car","GirlFriend"];
        var options1 =["Quận/Huyện","Savings","Car","GirlFriend"];
        var options2 =["Loại phòng","Savings","Car","GirlFriend"];
        return (
            <ScrollView style={{flex: 1, flexDirection: 'column'}}>
                <TextInput style={{
                    marginRight: 10,
                    marginLeft: 10,
                    padding: 10,
                    marginTop: 10,
                    borderRadius: 10,
                    backgroundColor: 'silver'
                }}
                placeholder="Nhập tiêu đề">
                </TextInput>
                <TextInput style={{
                    marginRight: 10,
                    marginLeft: 10,
                    padding: 10,
                    marginTop: 10,
                    borderRadius: 10,
                    backgroundColor: 'silver'
                }}
                placeholder="Nhập giá tiền/1 tháng">
                </TextInput>
                <TextInput style={{
                    marginRight: 10,
                    marginLeft: 10,
                    padding: 10,
                    marginTop: 10,
                    borderRadius: 10,
                    backgroundColor: 'silver'
                }}
                placeholder="Diện tích">
                </TextInput>
                <TextInput style={{
                    marginRight: 10,
                    marginLeft: 10,
                    padding: 10,
                    marginTop: 10,
                    borderRadius: 10,
                    backgroundColor: 'silver'
                }}
                placeholder="Mô tả"
                multiline={true}>
                </TextInput>
                <Picker
                    style={{
                    marginRight: 10,
                    marginLeft: 10,
                    flex: 1,
                    alignItems: "center"
                }}
                    mode="dropdown"
                    //selectedValue={this.state.selected}
                    //onValueChange={()=>{}}
                >
                    
                    {Object.keys(options).map((key) => {
                        return (<Picker.Item label={options[key]} value={key} key={key}/>) //if you have a bunch of keys value pair
                    })}
                </Picker>
                <Picker style={{
                    marginRight: 10,
                    marginLeft: 10,
                    flex: 1,
                    alignItems: "center"
                }}
                    mode="dropdown"
                    //selectedValue={this.state.selected}
                    //onValueChange={()=>{}}
                >
                    {Object.keys(options1).map((key) => {
                        return (<Picker.Item label={options1[key]} value={key} key={key}/>) //if you have a bunch of keys value pair
                    })}
                    </Picker>
                <Picker style={{
                    marginRight: 10,
                    marginLeft: 10,
                    fontSize: 10,
                    flex: 1,
                    alignItems: "center"
                }}
                    mode="dropdown"
                    //selectedValue={this.state.selected}
                    //onValueChange={()=>{}}
                >
                    
                    {Object.keys(options1).map((key) => {
                        return (<Picker.Item label={options2[key]} value={key} key={key}/>) //if you have a bunch of keys value pair
                    })}
                </Picker>
                <TextInput style={{
                    marginRight: 10,
                    marginLeft: 10,
                    padding: 10,
                    marginTop: 10,
                    borderRadius: 10,
                    backgroundColor: 'silver'
                }}
                placeholder="Địa chỉ chi tiết (Thôn, số nhà, đường)">
                </TextInput>
                <TextInput style={{
                    marginRight: 10,
                    marginLeft: 10,
                    padding: 10,
                    marginTop: 10,
                    borderRadius: 10,
                    backgroundColor: 'silver'
                }}
                placeholder="Số điện thoại liên hệ">
                </TextInput>
                <TouchableHighlight style={{
                    marginBottom: 10,
                    marginTop: 10, 
                    marginLeft: 10, 
                    marginRight: 10, 
                    paddingTop: 5, 
                    paddingBottom: 5, 
                    backgroundColor: 'lightblue', 
                    borderRadius: 10
                }}
                    onPress={() => {
                        this.props.navigation.navigate('AddPostScreen2');
                    }}
                >
                    <Text style={{textAlign: 'center'}}>Tiếp theo</Text>
                </TouchableHighlight>
            </ScrollView>
        )
        
    }
}