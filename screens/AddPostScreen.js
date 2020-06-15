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
import {
  getPostsFromServer,
  get_all_province,
  get_district_with_province,
  get_all_posttypes
} from '../networking/Server'
import AddPostScreen2 from './AddPostScreen2';
import RadioForm, {
  RadioButton,
  RadioButtonInput,
  RadioButtonLabel,
} from 'react-native-simple-radio-button';

var postTypes = [
  { label: 'Phòng cho thuê', value: 0 },
  { label: 'Nhà nguyên căn', value: 1 },
  { label: 'Căn hộ', value: 2 },
];

export default class AddPostScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      value3Index: 0,
      provinces: [],
      seleted_province: -1,
      districts: [],
      selected_district: -1,
      post_types: [],
      selected_posttype: 1,
      title: '',
      address_detail: '',
      description: '',
      price: 1,
      square: 4

    };
  }
  componentDidMount() {
    this.get_posttypes()
    this.get_province()

  }
  get_province = () => {
    // this.setState({ refreshing: true })
    get_all_province()
      .then((all_province) => {
        this.setState({ provinces: all_province })
        // this.setState({ seleted_province: all_province[0].code })
        // this.setState({ refreshing: false });
      }).catch(err => {
        console.log(err)
        this.setState({ provinces: [] })
      })
    // this.setState({ refreshing: false })
  }


  get_posttypes = () => {
    get_all_posttypes()
      .then((all_posttypes) => {
        this.setState({ post_types: all_posttypes })
        this.setState({ selected_posttype: all_posttypes[0].code })
      }).catch(err => {
        this.setState({ post_types: [] })
      })
  }

  ///CHANGE SELECT DROP
  change_province = (new_province_code) => {
    if (new_province_code !== -1) {
      this.setState({ seleted_province: new_province_code })
      // alert(new_province_code)
      //get danh sach quan huyen
      get_district_with_province(new_province_code)
        .then((all_district) => {
          this.setState({ districts: all_district })
          this.setState({ selected_district: all_district[0].code })
        }).catch(err => {
          console.log(err)
          this.setState({ districts: [] })
        })
    } else {
      this.setState({ selected_district: -1 })
      this.setState({ districts: [] })
    }


  }
  change_district = (district_code) => {
    this.setState({ selected_district: district_code })
    // this.get_district()
  }
  change_posttypes = (posttype_id) => {
    this.setState({ selected_posttype: posttype_id })
    // this.get_district()
  }



  render() {
    return (
      <ScrollView
        style={{ flex: 1, flexDirection: 'column', backgroundColor: '#fff' }}>
        <Text
          style={styles.txt_mota}>
          Loại tin
        </Text>

        <View
          style={styles.view_posttype}>
          <Picker
            style={styles.picker_posttype}
            mode="dropdown"
            selectedValue={this.state.selected_posttype}
            onValueChange={(itemValue, itemIndex) => { this.change_posttypes(itemValue) }}
          >
            {Object.keys(this.state.post_types).map(key => {
              return (
                <Picker.Item
                  label={this.state.post_types[key].name}
                  value={this.state.post_types[key]._id}
                  key={key}
                />
              )
            })}
          </Picker>
        </View>

        <Text
          style={styles.txt_mota}>
          Tiêu đề
        </Text>
        <TextInput
          style={styles.txt_input}
          placeholder="Nhập tiêu đề tin đăng"
          multiline={true}
          autoCorrect={false}
          onChangeText={(text) => {
            this.setState({ title: text })
          }}
        />

        <Text
          style={styles.txt_mota}>
          Giá tiền / tháng
        </Text>
        <TextInput
          style={styles.txt_input}
          placeholder="Nhập giá tiền cho thuê"
          returnKeyType="next"
          keyboardType="numeric"
          autoCorrect={false}
          onSubmitEditing={() => this.refs.txtSquare.focus()}
          onChangeText={(text) => {
            this.setState({ price: text })
          }}
        />

        <Text
          style={styles.txt_mota}>
          Diện tích
        </Text>
        <TextInput
          style={styles.txt_input}
          placeholder="Nhập diện tích (m2)"
          returnKeyType="next"
          keyboardType="numeric"
          autoCorrect={false}
          ref={'txtSquare'}
          onChangeText={(text) => {
            this.setState({ square: text })
          }}
          onSubmitEditing={() => this.refs.txtDescription.focus()}
        />

        <Text
          style={styles.txt_mota}>
          Mô tả
        </Text>
        <TextInput
          style={styles.txt_input}
          placeholder="Nhập mô tả tin đăng"
          multiline={true}
          autoCorrect={false}
          ref={'txtDescription'}
          onChangeText={(text) => {
            this.setState({ description: text })
          }}
        />

        <Text
          style={styles.txt_address}>
          Địa chỉ
        </Text>
        <Picker
          style={styles.picker_province}
          mode="dropdown"
          selectedValue={this.state.seleted_province}
          onValueChange={(itemValue, itemIndex) => { this.change_province(itemValue) }}

        >
          <Picker.Item
            label="Tỉnh/ thành phố"
            value={this.seleted_province}
            key={this.seleted_province}
          />
          {Object.keys(this.state.provinces).map(key => {
            return (
              <Picker.Item
                label={this.state.provinces[key].name}
                value={this.state.provinces[key].code}
                key={this.state.provinces[key].code}
              />
            )
          })}
        </Picker>

        <Picker
          style={styles.picker_province}
          mode="dropdown"
          selectedValue={this.state.selected_district}
          onValueChange={(itemValue, itemIndex) => { this.change_district(itemValue) }}
        >
          <Picker.Item
            label="Quận/Huyện"
            value={this.state.selected_district}
            key={this.state.selected_district}
          />
          {Object.keys(this.state.districts).map(key => {
            return (
              <Picker.Item
                label={this.state.districts[key].name}
                value={this.state.districts[key].code}
                key={this.state.districts[key].code}
              />
            )
          })}
        </Picker>

        <Text
          style={styles.txt_address}>
          Địa chỉ chi tiết (thôn, xã / số nhà, đường, phường)
        </Text>
        <TextInput
          style={styles.txt_input}
          placeholder="Nhập địa chỉ chi tiết"
          multiline={true}
          autoCorrect={false}
          onChangeText={(text) => {
            this.setState({ address_detail: text })
          }}
        />

        <Text
          style={styles.txt_mota}>
          Số điện thoại
        </Text>
        <TextInput
          style={styles.txt_input}
          placeholder="Nhập số điện thoại liên hệ"
          returnKeyType="go"
          keyboardType="numeric"
          autoCorrect={false}
          onChangeText={(text) => {
            this.setState({ mobile: text })
          }}
        />

        <TouchableHighlight
          underlayColor={'#ffceb56e'}
          style={styles.touch_next}
          onPress={() => {
            const post = {
              title: "day la tieu de bai post",
              province_id: this.state.seleted_province,
              district_id: this.state.selected_district,
              post_type_id: this.state.selected_posttype,
              address_detail: this.state.address_detail,
              description: this.state.description,
              price: this.state.price,
              square: this.state.square
            }
 
            this.props.navigation.navigate('AddPostScreen2', {
              post: post
            });
          }}>
          <Text style={{ textAlign: 'center', fontSize: 18 }}>Tiếp theo</Text>
        </TouchableHighlight>
      </ScrollView>
    );
  }
}



const styles = StyleSheet.create({
  view_posttype: {
    marginTop: 10,
    flex: 1,
    justifyContent: 'center',
  },
  picker_province: {
    marginRight: 10,
    marginLeft: 10,
    flex: 1,
    alignItems: 'center',
  },
  picker_posttype: {
    // marginRight: 10,
    // marginLeft: ,
    flex: 1,
    alignItems: 'center',
  },
  txt_mota: {
    marginHorizontal: 10,
    marginTop: 10,
    fontSize: 18,
  },
  txt_address: {
    marginHorizontal: 10,
    fontSize: 18,
  },
  // txt_phone: {
  //   marginHorizontal: 10,
  //   marginTop: 10,
  //   fontSize: 18,
  // },
  txt_input: {
    fontSize: 16,
    marginRight: 10,
    marginLeft: 10,
    paddingTop: 5,
    paddingBottom: 10,
    borderRadius: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  touch_next: {
    marginBottom: 20,
    marginTop: 20,
    marginLeft: 10,
    marginRight: 10,
    paddingTop: 10,
    paddingBottom: 10,
    backgroundColor: '#ffceb5',
    borderRadius: 8,
  },
})