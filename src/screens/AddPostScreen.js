import React, { Component, useState, useEffect } from 'react';
import {
  StyleSheet, TextInput,
  Text,
  View,
  TouchableHighlight,
  Button,
  Picker,
  ScrollView,
} from 'react-native'

import { getPostsFromServer } from '../api/post_api'
import { get_all_province2 } from '../api/province_api'
import { get_all_posttypes2 } from '../api/posttype_api'
import { get_district_with_province } from '../api/district_api'



import { AuthContext } from '../navigation/MyTabs'

export default function AddPostScreen(props) {
  const { token } = React.useContext(AuthContext)
  let init_post = {
    title: "day la tieu de bai post",
    province_code: null,
    district_code: null,
    post_type_id: null,
    address_detail: '',
    description: '',
    price: 1,
    square: 1
  }
  const [post_infor, set_post_infor] = useState(init_post)

  const [posttypes, set_posttypes] = useState([])
  const [select_posttype, set_select_posttype] = useState(null)

  const [provinces, set_provinces] = useState([{ name: "Tỉnh/ Thành phố", code: -1 }])
  const [select_provinces, set_select_provinces] = useState(-1)

  const [districts, set_districts] = useState([{ name: "Huyện/ Quận", code: -1 }])
  const [select_districts, set_select_districts] = useState(-1)

  useEffect(() => {
    get_posttypes()
    get_provinces()
  }, [])

  const get_posttypes = async () => {
    try {
      const res = await get_all_posttypes2()
      if (res.error) {
        return
      } else {
        set_posttypes(res.post_type)
        set_post_infor((pre) => ({ ...pre, post_type_id: res.post_type[0]._id }))
      }
    } catch (ex) { }
  }

  const get_provinces = async () => {
    try {
      const res = await get_all_province2()
      if (res.error) {
        return
      } else {
        let new_arr = res.data.provinces
        new_arr.unshift({ "name": "Tỉnh/ Thành phố", "code": -1 })
        set_provinces(new_arr)

      }
    } catch (ex) { }
  }

  const change_province = async (item) => {
    try {
      set_select_provinces(item)
      set_post_infor((pre) => ({ ...pre, province_code: item }))
      if (item == -1) {
        set_districts([{ name: "Huyện/ Quận", code: -1 }])
        set_post_infor((pre) => ({ ...pre, district_code: item }))
        set_select_districts(-1)
        return
      } else {
        const all_district = await get_district_with_province(item)
        let arr_district = all_district
        all_district.unshift({ name: "Huyện/ Quận", code: -1 })
        set_districts(arr_district)
      }

    } catch (ex) { }
  }

  const change_district = async (item) => {
    set_select_districts(item)
    set_post_infor((pre) => ({ ...pre, district_code: item }))
  }

  const change_posttype = async (item) => {
    set_select_posttype(item)
    set_post_infor((pre) => ({ ...pre, post_type_id: item }))
  }

  const show = () => {
    alert(post_infor.province_code)
    alert(post_infor.district_code)
    alert(post_infor.post_type_id)
  }

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
          selectedValue={select_posttype}
          onValueChange={(itemValue, itemIndex) => { change_posttype(itemValue) }}
        >
          {Object.keys(posttypes).map(key => {
            return (
              <Picker.Item
                label={posttypes[key].name}
                value={posttypes[key]._id}
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
          set_post_infor(preState => ({ ...preState, title: text }))
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
        onChangeText={(text) => {
          set_post_infor(preState => ({ ...preState, price: text }))
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
        onChangeText={(text) => {
          set_post_infor(preState => ({ ...preState, square: text }))
        }}
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
        onChangeText={(text) => {
          set_post_infor(preState => ({ ...preState, description: text }))
        }}
      />

      <Text
        style={styles.txt_address}>
        Địa chỉ
        </Text>
      <Picker
        style={styles.picker_province}
        mode="dropdown"
        selectedValue={select_provinces}
        onValueChange={(itemValue, itemIndex) => { change_province(itemValue) }}
      >

        {Object.keys(provinces).map(key => {
          return (
            <Picker.Item
              label={provinces[key].name}
              value={provinces[key].code}
              key={provinces[key].code}
            />
          )
        })}
      </Picker>

      <Picker
        style={styles.picker_province}
        mode="dropdown"
        selectedValue={select_districts}
        onValueChange={(itemValue, itemIndex) => { change_district(itemValue) }}
      >
        {Object.keys(districts).map(key => {
          return (
            <Picker.Item
              label={districts[key].name}
              value={districts[key].code}
              key={districts[key].code}
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
          set_post_infor(preState => ({ ...preState, address_detail: text }))
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
          set_post_infor(preState => ({ ...preState, mobile: text }))
        }}
      />

      <TouchableHighlight
        underlayColor={'#ffceb56e'}
        style={styles.touch_next}
        onPress={() => {
          props.navigation.navigate('AddPostScreen2', {
            post: post_infor
          })

        }}>
        <Text style={{ textAlign: 'center', fontSize: 18 }}>Tiếp theo</Text>
      </TouchableHighlight>

      <TouchableHighlight
        underlayColor={'#ffceb56e'}
        style={styles.touch_next}
        onPress={() => {
          show()
        }}>
        <Text style={{ textAlign: 'center', fontSize: 18 }}>Test token</Text>
      </TouchableHighlight>
    </ScrollView>
  );
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