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

import AddPostScreen2 from './AddPostScreen2';

import RadioForm, {
  RadioButton,
  RadioButtonInput,
  RadioButtonLabel,
} from 'react-native-simple-radio-button';

var postTypes = [
  {label: 'Phòng cho thuê', value: 0},
  {label: 'Nhà nguyên căn', value: 1},
  {label: 'Căn hộ', value: 2},
];

export default class AddPostScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      value3Index: 0,
    };
  }
  render() {
    var options = ['Tỉnh / Thành phố', 'Savings', 'Car', 'GirlFriend'];
    var options1 = ['Quận / Huyện', 'Savings', 'Car', 'GirlFriend'];
    var options2 = ['Loại tin', 'Savings', 'Car', 'GirlFriend'];
    return (
      <ScrollView
        style={{flex: 1, flexDirection: 'column', backgroundColor: '#fff'}}>
        <Text
          style={{
            marginHorizontal: 10,
            marginTop: 10,
            fontSize: 18,
          }}>
          Loại tin
        </Text>

        <View
          style={{
            marginHorizontal: 15,
            marginTop: 10,
            flex: 1,
            justifyContent: 'center',
          }}>
          <RadioForm formHorizontal={false} animation={true}>
            {/* To create radio buttons, loop through your array of options */}
            {postTypes.map((obj, i) => (
              <RadioButton
                labelHorizontal={true}
                onPress={i => {
                  this.setState({
                    value3Index: i,
                  });
                }}
                key={i}
                style={{
                  borderBottomWidth: 1,
                  borderBottomColor: '#ccc',
                  paddingBottom: 15,
                  paddingTop: 10,
                }}>
                {/*  You can set RadioButtonLabel before RadioButtonInput */}
                <RadioButtonInput
                  obj={obj}
                  index={i}
                  isSelected={this.state.value3Index === i}
                  onPress={i => {
                    this.setState({
                      value3Index: i,
                    });
                  }}
                  borderWidth={1}
                  borderBottomColor={'#ccc'}
                  buttonInnerColor={'#e88a59'}
                  buttonOuterColor={
                    this.state.value3Index === i ? '#e88a59' : '#333'
                  }
                  buttonSize={14}
                  buttonOuterSize={20}
                  buttonStyle={{}}
                  buttonWrapStyle={{}}
                />
                <RadioButtonLabel
                  obj={obj}
                  index={i}
                  labelHorizontal={true}
                  onPress={i => {
                    this.setState({
                      value3Index: i,
                    });
                  }}
                  labelStyle={{fontSize: 16, color: '#333'}}
                  labelWrapStyle={{}}
                />
              </RadioButton>
            ))}
          </RadioForm>
        </View>

        <Text
          style={{
            marginHorizontal: 10,
            marginTop: 10,
            fontSize: 18,
          }}>
          Tiêu đề
        </Text>
        <TextInput
          style={{
            fontSize: 16,
            marginRight: 10,
            marginLeft: 10,
            paddingTop: 5,
            paddingBottom: 10,
            borderRadius: 8,
            borderBottomWidth: 1,
            borderBottomColor: '#ccc',
          }}
          placeholder="Nhập tiêu đề tin đăng"
          multiline={true}
          autoCorrect={false}
        />

        <Text
          style={{
            marginHorizontal: 10,
            marginTop: 10,
            fontSize: 18,
          }}>
          Giá tiền / tháng
        </Text>
        <TextInput
          style={{
            fontSize: 16,
            marginRight: 10,
            marginLeft: 10,
            paddingTop: 5,
            paddingBottom: 10,
            borderRadius: 8,
            borderBottomWidth: 1,
            borderBottomColor: '#ccc',
          }}
          placeholder="Nhập giá tiền cho thuê"
          returnKeyType="next"
          keyboardType="numeric"
          autoCorrect={false}
          onSubmitEditing={() => this.refs.txtSquare.focus()}
        />

        <Text
          style={{
            marginHorizontal: 10,
            marginTop: 10,
            fontSize: 18,
          }}>
          Diện tích
        </Text>
        <TextInput
          style={{
            fontSize: 16,
            marginRight: 10,
            marginLeft: 10,
            paddingTop: 5,
            paddingBottom: 10,
            borderRadius: 8,
            borderBottomWidth: 1,
            borderBottomColor: '#ccc',
          }}
          placeholder="Nhập diện tích (m2)"
          returnKeyType="next"
          keyboardType="numeric"
          autoCorrect={false}
          ref={'txtSquare'}
          onSubmitEditing={() => this.refs.txtDescription.focus()}
        />

        <Text
          style={{
            marginHorizontal: 10,
            marginTop: 10,
            fontSize: 18,
          }}>
          Mô tả
        </Text>
        <TextInput
          style={{
            fontSize: 16,
            marginRight: 10,
            marginLeft: 10,
            paddingTop: 5,
            paddingBottom: 10,
            borderRadius: 8,
            borderBottomWidth: 1,
            borderBottomColor: '#ccc',
          }}
          placeholder="Nhập mô tả tin đăng"
          multiline={true}
          autoCorrect={false}
          ref={'txtDescription'}
        />

        <Text
          style={{
            marginHorizontal: 10,
            marginTop: 10,
            fontSize: 18,
          }}>
          Địa chỉ
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
        </Picker>

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
          {Object.keys(options1).map(key => {
            return <Picker.Item label={options1[key]} value={key} key={key} />; //if you have a bunch of keys value pair
          })}
        </Picker>

        <Text
          style={{
            marginHorizontal: 10,
            fontSize: 18,
          }}>
          Địa chỉ chi tiết (thôn, xã / số nhà, đường, phường)
        </Text>
        <TextInput
          style={{
            fontSize: 16,
            marginRight: 10,
            marginLeft: 10,
            paddingTop: 5,
            paddingBottom: 10,
            borderRadius: 8,
            borderBottomWidth: 1,
            borderBottomColor: '#ccc',
          }}
          placeholder="Nhập địa chỉ chi tiết"
          multiline={true}
          autoCorrect={false}
        />

        <Text
          style={{
            marginHorizontal: 10,
            marginTop: 10,
            fontSize: 18,
          }}>
          Số điện thoại
        </Text>
        <TextInput
          style={{
            fontSize: 16,
            marginRight: 10,
            marginLeft: 10,
            paddingTop: 5,
            paddingBottom: 10,
            borderRadius: 8,
            borderBottomWidth: 1,
            borderBottomColor: '#ccc',
          }}
          placeholder="Nhập số điện thoại liên hệ"
          returnKeyType="go"
          keyboardType="numeric"
          autoCorrect={false}
        />

        <TouchableHighlight
          underlayColor={'#ffceb56e'}
          style={{
            marginBottom: 20,
            marginTop: 20,
            marginLeft: 10,
            marginRight: 10,
            paddingTop: 10,
            paddingBottom: 10,
            backgroundColor: '#ffceb5',
            borderRadius: 8,
          }}
          onPress={() => {
            this.props.navigation.navigate('AddPostScreen2');
          }}>
          <Text style={{textAlign: 'center', fontSize: 18}}>Tiếp theo</Text>
        </TouchableHighlight>
      </ScrollView>
    );
  }
}
