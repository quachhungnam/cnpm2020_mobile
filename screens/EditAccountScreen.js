import React, {Component} from 'react';
import {
  TextInput,
  Text,
  View,
  TouchableHighlight,
  Button,
  Picker,
  ScrollView,
} from 'react-native';
export default class EditAccountScreen extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    var options = ['Đà Nẵng', 'Savings', 'Car', 'GirlFriend'];
    return (
      <ScrollView
        style={{flex: 1, flexDirection: 'column', backgroundColor: '#fff'}}>
        <Text style={{marginRight: 10, marginLeft: 10, marginTop: 10}}>
          Tên chủ tài khoản
        </Text>
        <TextInput
          style={{
            marginRight: 10,
            marginLeft: 10,
            padding: 10,
            marginTop: 10,
            borderRadius: 8,
            backgroundColor: '#fff',
            borderColor: '#333',
            borderWidth: 1,
            fontSize: 18,
          }}
          returnKeyType="next"
          autoCorrect={false}
          onSubmitEditing={() => this.refs.txtEmail.focus()}
        />

        <Text style={{marginRight: 10, marginLeft: 10, marginTop: 10}}>
          Email
        </Text>
        <TextInput
          style={{
            marginRight: 10,
            marginLeft: 10,
            padding: 10,
            marginTop: 10,
            borderRadius: 8,
            backgroundColor: '#fff',
            borderColor: '#333',
            borderWidth: 1,
          }}
          returnKeyType="next"
          keyboardType="email-address"
          autoCorrect={false}
          ref={'txtEmail'}
          onSubmitEditing={() => this.refs.txtMobile.focus()}
        />

        <Text style={{marginRight: 10, marginLeft: 10, marginTop: 10}}>
          Số điện thoại
        </Text>
        <TextInput
          style={{
            marginRight: 10,
            marginLeft: 10,
            padding: 10,
            marginTop: 10,
            borderRadius: 8,
            backgroundColor: '#fff',
            borderColor: '#333',
            borderWidth: 1,
          }}
          returnKeyType="next"
          keyboardType="numeric"
          autoCorrect={false}
          ref={'txtMobile'}
          onSubmitEditing={() => this.refs.txtAddress.focus()}
        />

        <Text style={{marginRight: 10, marginLeft: 10, marginTop: 10}}>
          Địa chỉ
        </Text>
        <TextInput
          style={{
            marginRight: 10,
            marginLeft: 10,
            padding: 10,
            marginTop: 10,
            borderRadius: 8,
            backgroundColor: '#fff',
            borderColor: '#333',
            borderWidth: 1,
          }}
          multiline={true}
          returnKeyType="go"
          autoCorrect={false}
          ref={'txtAddress'}
        />

        {/* <Text style={{marginRight: 10, marginLeft: 10, marginTop: 10}}>
          Khu vực của bạn
        </Text>
        <Picker
          style={{
            marginRight: 10,
            marginLeft: 10,
            flex: 1,
            alignItems: 'center',
          }}
          mode="dropdown"
          //selectedValue={this.state.selected}
          //onValueChange={()=>{}}
        >
          {Object.keys(options).map(key => {
            return <Picker.Item label={options[key]} value={key} key={key} />; //if you have a bunch of keys value pair
          })}
        </Picker> */}

        <TouchableHighlight
          style={{
            marginBottom: 10,
            marginTop: 20,
            marginLeft: 10,
            marginRight: 10,
            paddingTop: 10,
            paddingBottom: 10,
            backgroundColor: '#ffceb5',
            borderRadius: 8,
          }}
          onPress={() => {
            this.props.navigation.navigate('AddPostScreen');
          }}>
          <Text style={{textAlign: 'center'}}>Cập nhật</Text>
        </TouchableHighlight>
      </ScrollView>
    );
  }
}
