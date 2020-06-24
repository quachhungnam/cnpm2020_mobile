import React, { useState, useEffect } from 'react';
import {
  StyleSheet, TextInput,
  Text,
  View,
  TouchableHighlight,
  ScrollView,
} from 'react-native'

import { Picker } from '@react-native-community/picker';
import { get_all_province2 } from '../api/province_api'
import { get_all_posttypes2 } from '../api/posttype_api'
import { get_district_with_province } from '../api/district_api'

import { AuthContext } from '../navigation/MyTabs'


export default function EditPostScreen(props) {
  const { token } = React.useContext(AuthContext)
  const { post_item } = props.route.params

  let init_post = {
    _id: post_item._id,
    title: post_item.title,
    province_code: post_item.province_id.code,
    district_code: post_item.district_id.code,
    post_type_id: post_item.post_type_id._id,
    address_detail: post_item.address_detail,
    description: post_item.description,
    post_image: post_item.post_image,
    price: post_item.price,
    square: post_item.square
  }

  const [post_infor, set_post_infor] = useState(init_post)

  const [posttypes, set_posttypes] = useState([{ "name": "LOẠI TIN", "_id": -1 }])
  const [select_posttype, set_select_posttype] = useState(init_post.post_type_id)

  const [provinces, set_provinces] = useState([{ name: "Tỉnh/ Thành phố", code: -1 }])
  const [select_province, set_select_province] = useState(init_post.province_code)

  const [districts, set_districts] = useState([{ name: "Huyện/ Quận", code: -1 }])
  const [select_district, set_select_district] = useState(-1)


  useEffect(() => {
    set_post_infor(init_post)
    get_posttypes()
    get_provinces()
    get_districts()
  }, [])

  const get_posttypes = async () => {
    try {
      const res = await get_all_posttypes2()
      if (res.error) {
        return
      } else {
        let new_arr = res.post_type
        // new_arr.unshift({ "name": "LOẠI TIN", "_id": -1 })
        set_posttypes(new_arr)
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
        set_provinces(new_arr)
      }
    } catch (ex) { }
  }

  const get_districts = async () => {
    try {
      // alert(JSON.stringify(post_item))
      const all_district = await get_district_with_province(post_item.province_id.code)
      all_district.unshift({ name: "Huyện/ Quận", code: -1 })
      let arr_district = all_district
      set_districts(arr_district)
      set_select_district(init_post.district_code)
    } catch (ex) { console.log(ex) }
  }

  const change_province = async (item) => {
    try {
      set_select_province(item)
      if (item == -1) {
        set_districts([{ name: "Huyện/ Quận", code: -1 }])
        return
      } else {
        const all_district = await get_district_with_province(item)
        let arr_district = all_district
        all_district.unshift({ name: "Huyện/ Quận", code: -1 })
        set_select_district(-1)
        set_districts(arr_district)
      }
    } catch (ex) { }
  }

  const change_district = async (item) => {
    set_select_district(item)
  }

  const change_posttype = async (item) => {
    set_select_posttype(item)
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
          style={styles.picker_province}
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
        value={post_infor.title}
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
        value={String(post_infor.price)}
        style={styles.txt_input}
        placeholder="Nhập giá tiền cho thuê"
        returnKeyType="next"
        // keyboardType="numeric"
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
        value={String(post_infor.square)}
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
        value={post_infor.description}
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
        selectedValue={select_province}
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
        selectedValue={select_district}
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
        value={post_infor.address_detail}
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
        //  value={post_infor.mo}
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

          let edit_post = {
            _id: post_infor._id,
            title: post_infor.title,
            province_code: select_province,
            district_code: select_district,
            post_type_id: select_posttype,
            address_detail: post_infor.address_detail,
            post_image: post_infor.post_image,
            description: post_infor.description,
            price: post_infor.price,
            square: post_infor.square
          }
          // alert(JSON.stringify(edit_post))
          props.navigation.navigate('EditPostScreen2', {
            post: edit_post
          })

        }}>
        <Text style={{ textAlign: 'center', fontSize: 18 }}>Tiếp theo</Text>
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