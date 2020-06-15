import React, { Component } from 'react';
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
export default class EditAccountScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      account: {}
    }
  }
  componentDidMount() {
    this.get_account_infor()
  }
  get_account_infor() {
    const { account } = this.props.route.params
    this.setState({ account: account })
  }
  update_infor = () => {
    alert('canh bao')

  }
  render() {
    var options = ['Đà Nẵng', 'Savings', 'Car', 'GirlFriend'];
    return (
      <ScrollView
        style={{ flex: 1, flexDirection: 'column', backgroundColor: '#fff' }}>
        <Text style={styles.text_infor}>
          Tên chủ tài khoản
        </Text>
        <TextInput
          value={this.state.account.name}
          style={styles.input_infor}
          returnKeyType="next"
          autoCorrect={false}
          onSubmitEditing={() => this.refs.txtEmail.focus()}
        />

        <Text style={styles.text_infor}>
          Email
        </Text>
        <TextInput
          value={this.state.account.email}
          style={styles.input_infor}
          returnKeyType="next"
          keyboardType="email-address"
          autoCorrect={false}
          ref={'txtEmail'}
          onSubmitEditing={() => this.refs.txtMobile.focus()}
        />

        <Text style={styles.text_infor}>
          Số điện thoại
        </Text>
        <TextInput
          style={styles.input_infor}
          value={this.state.account.mobile}
          returnKeyType="next"
          keyboardType="numeric"
          autoCorrect={false}
          ref={'txtMobile'}
          onSubmitEditing={() => this.refs.txtAddress.focus()}
        />

        <Text style={styles.text_infor}>
          Địa chỉ
        </Text>
        <TextInput
          value={this.state.account.address}
          style={styles.input_infor}
          multiline={true}
          returnKeyType="go"
          autoCorrect={false}
          ref={'txtAddress'}
        />

        <TouchableHighlight
          style={styles.button_update}
          onPress={() => {
            this.update_infor()
            // this.props.navigation.navigate('AddPostScreen');
          }}>
          <Text style={{ textAlign: 'center' }}>Cập nhật</Text>
        </TouchableHighlight>
      </ScrollView>
    );
  }
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