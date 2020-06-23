import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  TextInput,
  Text,
  TouchableHighlight,
  ScrollView,
} from 'react-native';
import { update_account_infor } from '../api/account_api'
export default function EditAccountScreen(props) {

  const [account_infor, set_account_infor] = useState({ _id: 1, name: '', email: '', mobile: '', address: '' })
  const [account_token, set_account_token] = useState('')

  useEffect(() => {
    get_account_infor()
  }, [])

  const get_account_infor = () => {
    const { account, user_token } = props.route.params
    set_account_infor({
      _id: account._id,
      name: account.name,
      email: account.email,
      mobile: account.mobile,
      address: account.address
    })
    set_account_token(user_token)
  }

  const update_account = async () => {
    try {

      update_account_infor(account_infor, account_token).then((res) => {
        if (res.success == true) {
          alert('Cập nhật thông tin thành công')
          props.navigation.navigate('YourAccountScreen')
          return
        }
        if (res.success == false) {
          alert('Cập nhật thông tin thất bại')
          return
        }
      })
    } catch (err) {
      console.log(err)
    }
  }


  return (
    <ScrollView
      style={{ flex: 1, flexDirection: 'column', backgroundColor: '#fff' }}>
      <Text style={styles.text_infor}>
        Tên chủ tài khoản
      </Text>
      <TextInput
        value={account_infor.name}
        style={styles.input_infor}
        returnKeyType="next"
        autoCorrect={false}
        onChangeText={(text) => {
          set_account_infor(prevState => ({
            ...prevState,
            name: text
          }))
        }}
      />

      <Text style={styles.text_infor}>
        Email
      </Text>
      <TextInput
        value={account_infor.email}
        style={styles.input_infor}
        returnKeyType="next"
        keyboardType="email-address"
        autoCorrect={false}
        // ref={'txtEmail'}
        onChangeText={(text) => {
          set_account_infor(prevState => ({
            ...prevState,
            email: text
          }))
        }}
      />

      <Text style={styles.text_infor}>
        Số điện thoại
      </Text>
      <TextInput
        style={styles.input_infor}
        value={account_infor.mobile}
        returnKeyType="next"
        keyboardType="numeric"
        autoCorrect={false}
        onChangeText={(text) => {
          set_account_infor(prevState => ({
            ...prevState,
            mobile: text
          }))
        }}
      />

      <Text style={styles.text_infor}>
        Địa chỉ
      </Text>
      <TextInput
        value={account_infor.address}
        style={styles.input_infor}
        multiline={true}
        returnKeyType="go"
        autoCorrect={false}
        onChangeText={(text) => {
          set_account_infor(prevState => ({
            ...prevState,
            address: text
          }))
        }}
      />

      <TouchableHighlight
        underlayColor='palegreen'
        style={styles.button_update}
        onPress={() => {
          update_account()
        }}>
        <Text style={{ textAlign: 'center' }}>Cập nhật</Text>
      </TouchableHighlight>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  text_infor: { marginRight: 10, marginLeft: 10, marginTop: 10 },
  input_infor: {
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
  button_update:
  {
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