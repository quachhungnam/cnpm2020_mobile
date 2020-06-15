import React, { Component } from 'react';
import {
  StyleSheet,
  Dimensions,
  Alert,
  Text,
  View,
  TouchableHighlight,
  FlatList,
  ScrollView,
  Image,
} from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';
import AsyncStorage from '@react-native-community/async-storage';
import { post_post } from '../networking/Server'
export default class AddPostScreen2 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      images: [],
      post: ''
    };
    this.openImagePicker = this.openImagePicker.bind(this);
  }
  componentDidMount() {
    this.set_id_test()
  }
  set_id_test = () => {
    const { post } = this.props.route.params || {};
    this.setState({ post: post })
  }
  getMyStringValue = async () => {
    try {
      var x = await AsyncStorage.getItem('user');
      alert(x);
      return x;
    } catch (e) {
      console.log(e);
    }

    console.log('Done.777');
  };
  setStringValue = async () => {
    try {
      await AsyncStorage.setItem('user', 'ngu vcl');
    } catch (e) {
      // save error
    }

    console.log('Done.');
  };
  openImagePicker() {
    const newData = this.state.images;
    ImagePicker.openPicker({
      //multiple: true,
      mediaType: 'photo',
    }).then(images1 => {
      let item = {
        width: images1.width,
        height: images1.height,
        uri: images1.path,
        id: Date.now(),
      };
      newData.push(item);
      this.setState({ images: newData });
      console.log(this.state.images);
    });
  }

  post_a_post = async () => {
    const n_post = {
      title: "post from mobile",
      province_id: "5edb1304dc02a80f643de182",
      district_id: "5edb12b7dc02a80f643ddf25",
      post_type_id: "5ee48b21b48a4136ac219846",
      address_detail: "Số 150 Lê Lợi, Đà Nẵng",
      description: "3 lầu, 3 mặt tiền, diện tích rộng lớn, có thể mở quán cà phê hoặc kinh doanh quần áo đều được",
      price: 20000000,
      square: 200
    }
    // alert(this.state.post.title)
    // alert('dang tin')
    post_post(n_post).then(res => {
      // alert('co nhay vao ko')
      if (res.success == false) {
        alert('Dang Nhap that bai')
        return
      }

      if (res.error) {
        alert('ko the tao bai dang')
        return
      }
      alert('tao bai dang thanh cong')




      // alert('sau do')
    }).catch(err => {
      alert(err)

      console.log(err)
    })
  }


  render() {
    var width1 = Dimensions.get('window').width;
    let a = <View />;
    if (this.state.images.length != 0) {
      a = (
        <Image
          style={{ width: 100, height: 70 }}
          source={{ uri: this.state.images[0] }}
        />
      );
    }
    return (
      <ScrollView style={{ backgroundColor: '#fff' }}>
        <FlatList
          data={this.state.images}
          renderItem={({ item, index }) => {
            return (
              <TouchableHighlight
                onLongPress={() => {
                  Alert.alert('Alert', 'Are you sure to delete this image?', [
                    { text: 'no', onPress: () => { }, style: 'cancel' },
                    {
                      text: 'yes',
                      onPress: () => {
                        const newData = this.state.images;
                        for (var i = 0; i < newData.length; i++) {
                          if (newData[i].id == item.id) {
                            newData.splice(i, 1);
                          }
                        }
                        this.setState({ images: newData });
                      },
                      style: 'cancel',
                    },
                  ]);
                }}
                style={{
                  marginBottom: 10,
                  marginTop: 10,
                  marginLeft: 10,
                  marginRight: 10,
                }}>
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
        />
        <TouchableHighlight
          underlayColor={'#ffceb56e'}
          disabled={this.state.images.length == 5 ? true : false}
          style={styles.touch_dangtin}
          onPress={this.openImagePicker}>
          <Text style={{ textAlign: 'center' }}>{`Thêm ảnh (Còn lại: ${5 -
            this.state.images.length} ảnh)`}</Text>
        </TouchableHighlight>
        <TouchableHighlight
          underlayColor={'#ffceb56e'}
          // disabled={this.state.images.length == 0 ? true : false}
          style={styles.touch_dangtin}
          onPress={() => {
            // alert(this.state.post.title)
            this.post_a_post()

          }}>
          <Text style={{ textAlign: 'center' }}>Đăng tin</Text>
        </TouchableHighlight>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
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