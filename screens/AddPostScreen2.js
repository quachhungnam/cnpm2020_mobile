import React, { Component, useState, useEffect } from 'react'
import {
  StyleSheet,
  Dimensions,
  Alert,
  Text,
  View,
  TouchableOpacity,
  TouchableHighlight,
  FlatList,
  ScrollView,
  Image,
} from 'react-native'
import ImagePicker from 'react-native-image-crop-picker'
import AsyncStorage from '@react-native-community/async-storage'
import { post_post, add_post } from '../networking/Server'
import { AuthContext } from '../components/MyTabs'


export default function AddPostScreen2(props) {
  const { token } = React.useContext(AuthContext)
  const [images, set_images] = useState([])
  const [post, set_post] = useState(null)

  useEffect(() => {
    get_post_infor()
  }, [])

  const get_post_infor = () => {
    try {
      const { post } = props.route.params
      set_post(post)
    }
    catch (ex) { }
  }

  const openImagePicker = () => {
    ImagePicker.openPicker({
      mediaType: 'photo',
    }).then(image => {
      let item = {
        width: image.width,
        height: image.height,
        uri: image.path,
        id: Date.now(),
      }
      set_images((prev) => ([...prev, item]))
    })
  }

  const delete_image = (item) => {
    const arr_img = [...images]
    for (var i = 0; i < arr_img.length; i++) {
      if (arr_img[i].id == item.id) {
        arr_img.splice(i, 1);
      }
    }
    set_images(arr_img)
  }

  const show_image = () => {
    return (
      <FlatList
        data={images}
        renderItem={({ item, index }) => {
          return (
            <TouchableHighlight
              onLongPress={() => {
                Alert.alert('Alert', 'Are you sure to delete this image?', [
                  { text: 'no', onPress: () => { }, style: 'cancel' },
                  {
                    text: 'yes',
                    onPress: () => {
                      delete_image(item)
                    },
                    style: 'cancel',
                  },
                ]);
              }}
              style={styles.touch_image}>
              <Image
                resizeMode="cover"
                style={{
                  overflow: 'visible',
                  height: (item.height * 1 * width1) / item.width,
                  width: 0.95 * width1,
                }}
                source={{ uri: item.uri }}
              />
            </TouchableHighlight>
          );
        }}
      />)
  }

  const post_a_post = async () => {
    try {
      // const n_post = {
      //   title: "post from mobile 19/06",
      //   province_code: 77,
      //   district_code: 751,
      //   post_type_id: "5ee48b21b48a4136ac219846",
      //   address_detail: "dia chi tu mobile",
      //   description: "mo ta tu mobile",
      //   price: 100,
      //   square: 50
      // }
      const rs = await add_post(post, token)
      if (rs.error) {
        alert('Đăng bài không thành công!')
        return
      }
      if (rs.message) {
        alert('Đăng bài thành công')
        props.navigation.navigate('ListYourPostScreen')
        return
      }

    } catch (err) {
      console.log(err)
    }
  }

  var width1 = Dimensions.get('window').width;

  return (
    <ScrollView style={{ backgroundColor: '#fff' }}>
      {/* show anh */}
      {show_image()}
      {/* chon anh */}
      <TouchableHighlight
        underlayColor={'#ffceb56e'}
        disabled={images.length == 5 ? true : false}
        style={styles.touch_dangtin}
        onPress={() => { openImagePicker() }}
      >
        <Text style={{ textAlign: 'center' }}>
          {`Thêm ảnh (Còn lại: ${5 - images.length} ảnh)`}
        </Text>
      </TouchableHighlight>

      <TouchableHighlight
        underlayColor={'#ffceb56e'}
        disabled={images.length == 0 ? true : false}
        style={styles.touch_dangtin}
        onPress={() => {
          post_a_post()
        }}>
        <Text style={{ textAlign: 'center' }}>Đăng tin</Text>
      </TouchableHighlight>
    </ScrollView>
  )
}


const styles = StyleSheet.create({
  touch_image: {
    marginBottom: 10,
    marginTop: 10,
    marginLeft: 10,
    marginRight: 10,
  },
  touch_dangtin: {
    marginBottom: 10,
    marginTop: 10,
    marginLeft: 10,
    marginRight: 10,
    paddingTop: 10,
    paddingBottom: 10,
    backgroundColor: '#ffceb5',
    borderRadius: 8,
  }
})

