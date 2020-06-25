import React, {Component} from 'react';
import {
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
import {update_account_avatar} from '../api/account_api';

import RNFetchBlob from 'rn-fetch-blob';

export default class EditAvatarAccount extends Component {
  constructor(props) {
    super(props);
    this.state = {
      images: [],
    };
    this.openImagePicker = this.openImagePicker.bind(this);
  }

  openImagePicker() {
    const newData = this.state.images;
    ImagePicker.openPicker({
      mediaType: 'photo',
    }).then(image => {
      let item = {
        width: image.width,
        height: image.height,
        name: String(
          image.filename || Math.floor(Math.random() * Math.floor(999999999)),
        ),
        filename:
          image.filename ||
          Math.floor(Math.random() * Math.floor(999999999)) + '.jpg',
        type: image.type || 'image/jpeg',
        uri: image.path,
        data: RNFetchBlob.wrap(image.path),
      };
      newData.push(item);
      this.setState({images: newData});
    });
  }

  updateAvatar = async () => {
    update_account_avatar(
      this.state.images,
      this.props.route.params.account,
      this.props.route.params.user_token,
    )
      .then(res => {
        if (res.success === true) {
          alert('Cập nhật thành công!');
          this.props.navigation.navigate('YourAccountScreen');
        } else {
          alert('Cập nhật không thành công!');
        }
      })
      .catch(err => {
        console.error(err);
      });
  };

  render() {
    var width1 = Dimensions.get('window').width;
    let a = <View />;
    if (this.state.images.length != 0) {
      a = (
        <Image
          style={{width: 100, height: 70}}
          source={{uri: this.state.images[0]}}
        />
      );
    }
    return (
      <ScrollView style={{backgroundColor: '#fff'}}>
        <FlatList
          data={this.state.images}
          renderItem={({item, index}) => {
            return (
              <TouchableHighlight
                onLongPress={() => {
                  Alert.alert(
                    'Thông báo',
                    'Bạn có chắc chắn muốn xóa ảnh này?',
                    [
                      {text: 'Không', onPress: () => {}, style: 'cancel'},
                      {
                        text: 'có',
                        onPress: () => {
                          const newData = this.state.images;
                          for (var i = 0; i < newData.length; i++) {
                            if (newData[i].id == item.id) {
                              newData.splice(i, 1);
                            }
                          }
                          this.setState({images: newData});
                        },
                        style: 'cancel',
                      },
                    ],
                  );
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
                  source={{uri: item.uri}}
                />
              </TouchableHighlight>
            );
          }}
        />
        <TouchableHighlight
          underlayColor={'#ffceb56e'}
          disabled={this.state.images.length == 1 ? true : false}
          style={{
            marginBottom: 10,
            marginTop: 10,
            marginLeft: 10,
            marginRight: 10,
            paddingTop: 10,
            paddingBottom: 10,
            backgroundColor: '#ffceb5',
            borderRadius: 8,
          }}
          onPress={this.openImagePicker}>
          <Text style={{textAlign: 'center'}}>Chọn ảnh</Text>
        </TouchableHighlight>
        <TouchableHighlight
          underlayColor={'#ffceb56e'}
          disabled={this.state.images.length == 0 ? true : false}
          style={{
            marginBottom: 10,
            marginTop: 10,
            marginLeft: 10,
            marginRight: 10,
            paddingTop: 10,
            paddingBottom: 10,
            backgroundColor: '#ffceb5',
            borderRadius: 8,
          }}
          onPress={() => {
            this.updateAvatar();
          }}>
          <Text style={{textAlign: 'center'}}>Cập nhật</Text>
        </TouchableHighlight>
      </ScrollView>
    );
  }
}
