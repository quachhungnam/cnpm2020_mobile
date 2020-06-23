import React, { Component, useEffect, useState, useRef } from 'react';
import { TextInput, ScrollView, Text, View, TouchableHighlight, StyleSheet } from 'react-native';
import { update_account_password, check_account_password } from '../api/account_api'

export default function EditPasswordAccountScreen(props) {
  // const ref_oldpass = useRef(null)
  const [account_infor, set_account_infor] = useState({ _id: 1 })
  const [account_token, set_account_token] = useState('')
  const [old_pass, set_old_pass] = useState('')
  const [new_pass, set_new_pass] = useState({ password1: '', password2: '' })

  useEffect(() => {
    get_account_infor()
  }, [])

  const get_account_infor = () => {
    const { account, user_token } = props.route.params
    set_account_infor({
      _id: account._id,
    })
    set_account_token(user_token)
  }

  const change_password = () => {
    try {
      if (new_pass.password1 == new_pass.password2) {
        const old_user = { _id: account_infor._id, password: old_pass }
        check_account_password(old_user, account_token).then(rs => {
          if (rs.success == false) {
            alert('Mật khẩu hiện tại không đúng')
            return
          } else {
            const new_user = { _id: account_infor._id, password: new_pass.password1 }
            update_account_password(new_user, account_token).then(rs2 => {
              if (rs2.success == true) {
                alert('Đổi mật khẩu thành công')
                return
              } else {
                alert('Đổi mật khẩu không thành công')
                return
              }
            })
          }
        })
      }
    }
    catch (err) {
      console.log(err)
    }
  }


  return (
    <ScrollView
      style={{ flex: 1, flexDirection: 'column', backgroundColor: '#fff' }}>
      <Text style={styles.txt_pass}>
        Mật khẩu cũ
      </Text>
      <TextInput
        style={styles.input_pass}
        returnKeyType="next"
        secureTextEntry
        autoCorrect={false}
        onChangeText={(text) => {
          set_old_pass(text)
        }}
      />
      <Text style={styles.txt_pass}>
        Mật khẩu mới
      </Text>
      <TextInput
        style={styles.input_pass}
        returnKeyType="next"
        secureTextEntry
        autoCorrect={false}
        onChangeText={(text) => {
          set_new_pass((prevState) => ({ ...prevState, password1: text }))
        }}

      />
      <Text style={styles.txt_pass}>
        Xác nhận mật khẩu mới
      </Text>
      <TextInput
        style={styles.input_pass}
        returnKeyType="go"
        secureTextEntry
        autoCorrect={false}
        onChangeText={(text) => {
          set_new_pass((prevState) => ({ ...prevState, password2: text }))
        }}
      />
      <TouchableHighlight
        underlayColor='palegreen'
        style={styles.touch_changepass}
        onPress={() => {
          change_password()
        }}
      >
        <Text style={{ textAlign: 'center' }}>Đổi mật khẩu</Text>
      </TouchableHighlight>
    </ScrollView>
  );
}



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