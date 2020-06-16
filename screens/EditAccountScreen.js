import React, { Component, useState, useEffect } from 'react';
import {
  StyleSheet,
  TextInput,
  Text,
  View,
  TouchableHighlight,
  Button,
  Picker,
  ScrollView,
} from 'react-native';
import { update_account_infor } from '../networking/Server'
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
          return
        }
        if (res.success == false) {
          alert('Cập nhật thông tin thất bại')
          return
        }
        // alert('sau khi update')
      })
    } catch (err) {
      console.log(err)
    }
  }
  // const update_account = async () => {
  //   try {
  //     alert(account_infor.name)
  //     alert(account_token)
  //     update_account_infor().then((res) => {
  //       if (res.success == true) {
  //         alert('update thanh cong')
  //         // return
  //       }
  //       if (res.success == false) {
  //         alert('update that bai')
  //         // return
  //       }
  //       alert('sau khi update')
  //     })
  //   } catch (err) {
  //     console.log(err)
  //   }
  // }


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
      // onSubmitEditing={() => this.refs.txtEmail.focus()}
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
      // onSubmitEditing={() => this.refs.txtMobile.focus()}
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
      // ref={'txtMobile'}
      // onSubmitEditing={() => this.refs.txtAddress.focus()}
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
      // ref={'txtAddress'}
      />

      <TouchableHighlight
        style={styles.button_update}
        onPress={() => {

          // alert(account_infor._id)
          update_account()
          // this.update_infor()
          // this.props.navigation.navigate('AddPostScreen');
        }}>
        <Text style={{ textAlign: 'center' }}>Cập nhật</Text>
      </TouchableHighlight>
    </ScrollView>
  );
}

// export default class EditAccountScreen extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       account: {},
//       text_name: ''
//     }
//   }
//   componentDidMount() {
//     this.get_account_infor()
//   }
//   get_account_infor() {
//     const { account } = this.props.route.params
//     this.setState({ account: account })
//   }
//   update_infor = () => {
//     alert('canh bao')

//   }
//   render() {
//     return (
//       <ScrollView
//         style={{ flex: 1, flexDirection: 'column', backgroundColor: '#fff' }}>
//         <Text style={styles.text_infor}>
//           Tên chủ tài khoản
//         </Text>
//         <TextInput
//           value={this.state.account.name}
//           style={styles.input_infor}
//           returnKeyType="next"
//           autoCorrect={false}
//           onSubmitEditing={() => this.refs.txtEmail.focus()}
//         />

//         <Text style={styles.text_infor}>
//           Email
//         </Text>
//         <TextInput
//           value={this.state.account.email}
//           style={styles.input_infor}
//           returnKeyType="next"
//           keyboardType="email-address"
//           autoCorrect={false}
//           ref={'txtEmail'}
//           onChangeText={(text) => {
//             this.setState({ text_name: text })
//           }}
//           onSubmitEditing={() => this.refs.txtMobile.focus()}
//         />

//         <Text style={styles.text_infor}>
//           Số điện thoại
//         </Text>
//         <TextInput
//           style={styles.input_infor}
//           value={this.state.account.mobile}
//           returnKeyType="next"
//           keyboardType="numeric"
//           autoCorrect={false}
//           ref={'txtMobile'}
//           onSubmitEditing={() => this.refs.txtAddress.focus()}
//         />

//         <Text style={styles.text_infor}>
//           Địa chỉ
//         </Text>
//         <TextInput
//           value={this.state.account.address}
//           style={styles.input_infor}
//           multiline={true}
//           returnKeyType="go"
//           autoCorrect={false}
//           ref={'txtAddress'}
//         />

//         <TouchableHighlight
//           style={styles.button_update}
//           onPress={() => {
//             alert(this.state.text_name)
//             // this.update_infor()
//             // this.props.navigation.navigate('AddPostScreen');
//           }}>
//           <Text style={{ textAlign: 'center' }}>Cập nhật</Text>
//         </TouchableHighlight>
//       </ScrollView>
//     );
//   }
// }
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