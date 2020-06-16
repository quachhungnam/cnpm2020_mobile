import React, { Component, useEffect, useState } from 'react';
import { TextInput, Text, StyleSheet, ScrollView, View, TouchableHighlight, Button } from 'react-native';
import { send_feed_back } from '../networking/Server'
export default function Feedback(props) {
  const [feedback, set_feedback] = useState('')
  const [account_infor, set_account_infor] = useState({ _id: 1 })
  const [account_token, set_account_token] = useState('')

  useEffect(() => {
    get_account_infor()
  }, [])

  const send_feedback = () => {
    try {
      send_feed_back(account_infor, account_token, feedback).then(res => {
        if (res.success == true) {
          alert('Cảm ơn bạn đã gửi phản hồi')
          props.navigation.navigate('YourAccountScreen')
          return
        }
        if (res.success == false) {
          alert('Không thể gửi phản hồi')
        }
      })
    } catch (err) {
      console.log(err)
    }
  }
  const get_account_infor = () => {
    const { account, user_token } = props.route.params
    set_account_infor({
      _id: account._id,
    })
    set_account_token(user_token)
  }

  return (
    <ScrollView
      style={{ flex: 1, flexDirection: 'column', backgroundColor: '#fff' }}>
      <Text style={styles.txt_pass}>
        Phản hồi của bạn
      </Text>
      <TextInput
        style={styles.input_pass}
        returnKeyType="next"
        secureTextEntry
        autoCorrect={false}
        multiline={true}
        numberOfLines={6}
        onChangeText={(text) => {
          set_feedback(text)
        }}
      />

      <TouchableHighlight
        underlayColor={color_touch}
        style={styles.touch_changepass}
        onPress={() => {
          send_feedback()
        }}
      >
        <Text style={{ textAlign: 'center' }}>Gửi phản hồi</Text>
      </TouchableHighlight>
    </ScrollView>
  );
}

const color_touch = 'palegreen'
const styles = StyleSheet.create({
  view_out: { flex: 1, flexDirection: 'column', backgroundColor: '#fff' },
  txt_pass: { marginRight: 10, marginLeft: 10, marginTop: 10 },
  input_pass: {
    marginRight: 10,
    marginLeft: 10,
    padding: 10,
    marginTop: 10,
    borderRadius: 8,
    backgroundColor: '#fff',
    borderColor: '#333',
    borderWidth: 1,
    fontSize: 18,
  },
  touch_changepass: {
    marginBottom: 10,
    marginTop: 20,
    marginLeft: 10,
    marginRight: 10,
    paddingTop: 10,
    paddingBottom: 10,
    backgroundColor: '#ffceb5',
    borderRadius: 8,
  }
})