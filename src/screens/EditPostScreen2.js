import React, { useState, useEffect } from 'react'
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
import { add_post_with_image, update_post_with_image } from '../api/post_api'
import { AuthContext } from '../navigation/MyTabs'
import RNFetchBlob from 'rn-fetch-blob'
import { your_ip } from '../api/your_ip'
const api_posts = `${your_ip}:3000/posts`;

export default function EditPostScreen2(props) {
  const { post, img_post, post_image } = props.route.params
  const { token } = React.useContext(AuthContext)

  const [old_image, set_old_image] = useState(post_image) //mang anhh dien hien thi
  const [images, set_images] = useState(post_image)
  const [new_post, set_new_post] = useState(null)

  useEffect(() => {
    get_post_infor()
  }, [])

  const get_post_infor = () => {
    try {
      set_new_post(post)
    }
    catch (ex) { }
  }

  const openImagePicker = async () => {
    ImagePicker.openPicker({
      mediaType: 'photo',
    }).then(image => {
      let item = {
        width: image.width,
        height: image.height,
        name: String(image.filename || Math.floor(Math.random() * Math.floor(999999999))),
        filename: image.filename || Math.floor(Math.random() * Math.floor(999999999)) + '.jpg',
        type: image.type || 'image/png',
        uri: image.path,
        data: RNFetchBlob.wrap(image.path)
      }
      set_images((prev) => ([...prev, item]))
    })
  }

  const delete_image = (item) => {
    const arr_img = [...images]
    for (var i = 0; i < arr_img.length; i++) {
      if (arr_img[i].name == item.name) {
        arr_img.splice(i, 1);
      }
    }
    set_images(arr_img)
  }

  const show_image = () => {
    return (
      <FlatList
        horizontal={true}
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
                style={{
                  width: 100,
                  height: 100,
                }}
                source={{ uri: item.uri }}
              />
            </TouchableHighlight>
          );
        }}
      />)
  }

  const update_post = async () => {
    // alert(JSON.stringify(old_image) + ' === ' + JSON.stringify(images))
    // kiem tra image old va new
    try {

      let img_delete = []
      for (let i = 0; i < old_image.length; i++) {
        let vitrixoa = -1
        if (images.length == 0) {
          img_delete = old_image
          break
        }
        for (let j = 0; j < images.length; j++) {
          //anh cua va moi giong nhau, bo qua
          if (old_image[i].name != images[j].name) {
            vitrixoa = i
            continue
            //chuyen sang anh cu thu 2
          }
          if (old_image[i].name == images[j].name) {
            vitrixoa = -1
            break
            //chuyen sang anh cu thu 2
          }
        }
        if (vitrixoa != -1) {
          img_delete.push(old_image[vitrixoa])
        }
      }
      // alert(JSON.stringify(img_delete) + ' <====> ' + JSON.stringify(images))
      let send_post = new_post
      if (img_delete.length > 0) {
        send_post.delete_image = img_delete
      }

      const rs = await update_post_with_image(images, send_post, token)
      if (rs.error) {
        alert('Không thể sửa tin này, vui lòng trở lại sau!')
      } else {
        alert('Cập nhật thành công!')
      }

    } catch (ex) { console.log(ex) }

  };


  var width1 = Dimensions.get('window').width;
  return (
    <ScrollView style={{ backgroundColor: '#fff' }}>

      <TouchableHighlight
        underlayColor={'#ffceb56e'}
        disabled={images.length == 5 ? true : false}
        style={styles.touch_dangtin}
        onPress={() => { openImagePicker() }}
      >
        <Text style={{ textAlign: 'center' }}>
          {`Thêm ảnh(Còn lại: ${5 - images.length} ảnh)`}
        </Text>
      </TouchableHighlight>
      {show_image()}
      {/* <PostDetail
        post_item={post}
      /> */}
      <TouchableHighlight
        underlayColor={'#ffceb56e'}
        // disabled={images.length == 0 ? true : false}
        style={styles.touch_dangtin}
        onPress={() => {
          update_post()
        }}>
        <Text style={{ textAlign: 'center' }}>Lưu thay đổi</Text>
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
