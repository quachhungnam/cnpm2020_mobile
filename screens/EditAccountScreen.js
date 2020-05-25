import React, {Component} from 'react';
import { TextInput, Text, View, TouchableHighlight, Button, Picker, ScrollView } from 'react-native';
import FlatList2 from './FlatList2';
export default class EditAccountScreen extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        var options =["Đà Nẵng","Savings","Car","GirlFriend"];
        return (
            <ScrollView style={{flex: 1, flexDirection: 'column'}}>
                <Text style={{marginRight: 10,
                    marginLeft: 10, marginTop: 10}}>Họ và tên</Text>
                <TextInput style={{
                    marginRight: 10,
                    marginLeft: 10,
                    padding: 10,
                    marginTop: 0,
                    borderRadius: 10,
                    backgroundColor: 'silver'
                }}
                placeholder="Nhập họ và tên">
                </TextInput>

                <Text style={{marginRight: 10,
                    marginLeft: 10, marginTop: 10}}>Địa chỉ</Text>
                <TextInput style={{
                    marginRight: 10,
                    marginLeft: 10,
                    padding: 10,
                    marginTop: 0,
                    borderRadius: 10,
                    backgroundColor: 'silver'
                }}
                placeholder="Nhập địa chỉ">
                </TextInput>

                <Text style={{marginRight: 10,
                    marginLeft: 10, marginTop: 10}}>Số điện thoại</Text>
                <TextInput style={{
                    marginRight: 10,
                    marginLeft: 10,
                    padding: 10,
                    marginTop: 0,
                    borderRadius: 10,
                    backgroundColor: 'silver'
                }}
                placeholder="Số điện thoại">
                </TextInput>

                <Text style={{marginRight: 10,
                    marginLeft: 10, marginTop: 10}}>Email</Text>
                <TextInput style={{
                    marginRight: 10,
                    marginLeft: 10,
                    padding: 10,
                    marginTop: 0,
                    borderRadius: 10,
                    backgroundColor: 'silver'
                }}
                placeholder="Nhập email"
                multiline={true}>
                </TextInput>

                <Text style={{marginRight: 10,
                    marginLeft: 10, marginTop: 10}}>Khu vực của bạn</Text>
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


                <TextInput style={{marginBottom: 10, padding: 10, marginLeft: 10, marginRight: 10, backgroundColor: 'silver',
                    borderRadius: 10
                }} placeholder='Mật khẩu cấp 2'></TextInput>
                
                <TouchableHighlight
                    style={{marginBottom: 10, marginTop: 10, marginLeft: 10, marginRight: 10, paddingTop: 5, paddingBottom: 5, backgroundColor: 'lightblue', borderRadius: 10}}
                    onPress={() => {
                        this.props.navigation.navigate('AddPostScreen');
                    }}
                >
                    <Text style={{textAlign: 'center'}}>Cập nhật</Text>
                </TouchableHighlight>
            </ScrollView>
        )
        
    }
}