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
import { add_post_with_image } from '../api/post_api'
import { AuthContext } from '../navigation/MyTabs'
import RNFetchBlob from 'rn-fetch-blob'


export default function AddPostScreen2(props) {
  const { post } = props.route.params
  const { token } = React.useContext(AuthContext)
  const [images, set_images] = useState([])
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


  const add_new_post = async () => {

    // alert(JSON.stringify(post))
    // const n_post = {
    //   title: "post from mobile 23/06",
    //   province_code: 77,
    //   district_code: 751,
    //   post_type_id: "5ee48b21b48a4136ac219846",
    //   address_detail: "dia chi tu mobile 11 1 1 ",
    //   description: "mo ta tu mobile 1 1 11",
    //   price: 100,
    //   square: 50
    // }
    try {
      const rs = await add_post_with_image(images, new_post, token)
      if (rs.error) {
          alert('Không thể đăng tin!')
      } else {
        alert('Đăng tin thành công!')
      }

    } catch (ex) { }

  };


  var width1 = Dimensions.get('window').width;
  return (
    <ScrollView style={{ backgroundColor: '#fff' }}>
      {/* show anh */}
      {/* chon anh */}
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
          add_new_post()
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
