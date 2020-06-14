import React, { Component } from 'react';
import { TextInput, Text, View, TouchableHighlight, Button } from 'react-native';
export default class Feedback extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <View style={{ flex: 1, flexDirection: 'column', backgroundColor: '#fff' }}>
        <Text style={{ marginRight: 10, marginLeft: 10, marginTop: 10 }}>
          Vấn đề bạn cần phản hồi
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
          numberOfLines={6}
          autoCorrect={false}
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
          <Text style={{ textAlign: 'center' }}>Gửi phản hồi</Text>
        </TouchableHighlight>
      </View>
    );
  }
}
