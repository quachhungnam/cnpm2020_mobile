import React, {Component} from 'react';
import {TextInput, Text, View, TouchableHighlight} from 'react-native';
export default class EditPasswordAccountScreen extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <View style={{flex: 1, flexDirection: 'column', backgroundColor: '#fff'}}>
        <Text style={{marginRight: 10, marginLeft: 10, marginTop: 10}}>
          Mật khẩu cũ
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
          secureTextEntry
          autoCorrect={false}
          onSubmitEditing={() => this.refs.txtNewPassword.focus()}
        />
        <Text style={{marginRight: 10, marginLeft: 10, marginTop: 10}}>
          Mật khẩu mới
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
          secureTextEntry
          autoCorrect={false}
          ref={'txtNewPassword'}
          onSubmitEditing={() => this.refs.txtConfirmPassword.focus()}
        />
        <Text style={{marginRight: 10, marginLeft: 10, marginTop: 10}}>
          Xác nhận mật khẩu mới
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
          returnKeyType="go"
          secureTextEntry
          autoCorrect={false}
          ref={'txtConfirmPassword'}
        />
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
          }}>
          <Text style={{textAlign: 'center'}}>Đổi mật khẩu</Text>
        </TouchableHighlight>
      </View>
    );
  }
}
