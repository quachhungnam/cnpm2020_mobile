// import React, { Component, useState, useEffect } from 'react'
// import {
//   StyleSheet,
//   Dimensions,
//   Alert,
//   Text,
//   View,
//   TouchableOpacity,
//   TouchableHighlight,
//   FlatList,
//   ScrollView,
//   Image,
// } from 'react-native'
// import ImagePicker from 'react-native-image-crop-picker'
// import AsyncStorage from '@react-native-community/async-storage'
// import { post_post, add_post } from '../networking/Server'
// import { AuthContext } from '../components/MyTabs'
// import { add_product } from '../networking/server_upload'
// const axios = require('axios');

// export default function AddPostScreen2(props) {
//   const { token } = React.useContext(AuthContext)
//   const [images, set_images] = useState([])
//   const [post, set_post] = useState(null)
//   var data = new FormData();
//   useEffect(() => {
//     get_post_infor()
//   }, [])

//   const get_post_infor = () => {
//     try {
//       const { post } = props.route.params
//       set_post(post)
//     }
//     catch (ex) { }
//   }

//   const openImagePicker = () => {
//     ImagePicker.openPicker({
//       mediaType: 'photo',
//     }).then(image => {
//       let item = {
//         // width: image.width,
//         // height: image.height,
//         uri: image.path,
//         name: image.filename || Math.floor(Math.random() * Math.floor(999999999)) + '.jpg',
//         type: image.type,
//         // id: Date.now(),
//       }
//       // data.append("doc[]", item)
//       // data.append("doc[]", {
//       //   uri: image.uri,
//       //   type: "image/jpeg",
//       //   name: image.filename || `filename${i}.jpg`,
//       // });
//       data.append("doc[]", item)
//       set_images((prev) => ([...prev, item]))
//     })
//   }

//   const delete_image = (item) => {
//     const arr_img = [...images]
//     for (var i = 0; i < arr_img.length; i++) {
//       if (arr_img[i].id == item.id) {
//         arr_img.splice(i, 1);
//       }
//     }
//     set_images(arr_img)
//   }

//   const show_image = () => {
//     return (
//       <FlatList
//         data={images}
//         renderItem={({ item, index }) => {
//           return (
//             <TouchableHighlight
//               onLongPress={() => {
//                 Alert.alert('Alert', 'Are you sure to delete this image?', [
//                   { text: 'no', onPress: () => { }, style: 'cancel' },
//                   {
//                     text: 'yes',
//                     onPress: () => {
//                       delete_image(item)
//                     },
//                     style: 'cancel',
//                   },
//                 ]);
//               }}
//               style={styles.touch_image}>
//               <Image
//                 resizeMode="cover"
//                 style={{
//                   overflow: 'visible',
//                   // height: (item.height * 1 * width1) / item.width,
//                   // width: 0.95 * width1,
//                 }}
//                 source={{ uri: item.uri }}
//               />
//             </TouchableHighlight>
//           );
//         }}
//       />)
//   }

//   const post_a_post = async () => {
//     try {
//       // const n_post = {
//       //   title: "post from mobile 19/06",
//       //   province_code: 77,
//       //   district_code: 751,
//       //   post_type_id: "5ee48b21b48a4136ac219846",
//       //   address_detail: "dia chi tu mobile",
//       //   description: "mo ta tu mobile",
//       //   price: 100,
//       //   square: 50
//       // }
//       const rs = await add_post(post, token)
//       if (rs.error) {
//         alert('Đăng bài không thành công!')
//         return
//       }
//       if (rs.message) {
//         alert('Đăng bài thành công')
//         props.navigation.navigate('ListYourPostScreen')
//         return
//       }

//     } catch (err) {
//       console.log(err)
//     }
//   }


//   const createFormData = (body) => {
//     const data = new FormData();

//     data.append('photo', images[0])

//     Object.keys(body).forEach(key => {
//       data.append(key, body[key]);
//     });

//     return data;
//   };

//   const handleUploadPhoto = () => {


//     let dt = new FormData()
//     dt.append('file',{type:'jpg',name:'fddsdf.jpg',uri:images[0].uri})
//     fetch(`http://192.168.0.102:8888/products`, {
//       method: "POST",
//       // headers: {
//       //   Accept: "application/x-www-form-urlencoded",
//       // },
//       body: dt,
//     }).then(res => res.json())
//       .then(res => {
//         alert('success')
//         // Alert.alert(
//         //   "Success",
//         //   "Bill of Loading Uploaded Successfully!",
//         //   [{ text: "OK", onPress: () => that.props.close() }],
//         //   { cancelable: false }
//         // );
//       })
//       .catch(err => {
//         alert(JSON.stringify(dt));
//         alert(JSON.stringify(err));
//         // console.error("error uploading images: ", err);
//       });
//   };


//   const onDoUploadPress = () => {
//     // const { localPhotos } = this.state;
//     // if (localPhotos && localPhotos.length > 0) {
//     let formData = new FormData();
//     formData.append('files',images)

//     axios
//       .post('https://192.168.0.102:8888/products', formData)
//       .then(response => {
//         // this.setState({ logs: JSON.stringify(response.data) });
//       })
//       .catch(error => {
//         alert(JSON.stringify(error));
//       });

//   }




//   var width1 = Dimensions.get('window').width;

//   return (
//     <ScrollView style={{ backgroundColor: '#fff' }}>
//       {/* show anh */}
//       {show_image()}
//       {/* chon anh */}
//       <TouchableHighlight
//         underlayColor={'#ffceb56e'}
//         disabled={images.length == 5 ? true : false}
//         style={styles.touch_dangtin}
//         onPress={() => { openImagePicker() }}
//       >
//         <Text style={{ textAlign: 'center' }}>
//           {`Thêm ảnh(Còn lại: ${5 - images.length} ảnh)`}
//         </Text>
//       </TouchableHighlight>

//       <TouchableHighlight
//         underlayColor={'#ffceb56e'}
//         // disabled={images.length == 0 ? true : false}
//         style={styles.touch_dangtin}
//         onPress={() => {
//           // post_a_post()
//           handleUploadPhoto()
//           // onDoUploadPress()
//         }}>
//         <Text style={{ textAlign: 'center' }}>Đăng tin</Text>
//       </TouchableHighlight>
//     </ScrollView>
//   )
// }


// const styles = StyleSheet.create({
//   touch_image: {
//     marginBottom: 10,
//     marginTop: 10,
//     marginLeft: 10,
//     marginRight: 10,
//   },
//   touch_dangtin: {
//     marginBottom: 10,
//     marginTop: 10,
//     marginLeft: 10,
//     marginRight: 10,
//     paddingTop: 10,
//     paddingBottom: 10,
//     backgroundColor: '#ffceb5',
//     borderRadius: 8,
//   }
// })

/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Fragment } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  Image,
  TextInput,
  TouchableOpacity
} from 'react-native';

import {
  Header,
  Colors,
} from 'react-native/Libraries/NewAppScreen';

import ImagePicker from 'react-native-image-crop-picker';
import ActionSheet from 'react-native-actionsheet';
import axios from 'axios';

export default class AddPostScreen2 extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      logs: 'ahihi',
      selectedPhotoIndex: 0,
      localPhotos: []
    };
    this.onDoUploadPress = this.onDoUploadPress.bind(this);
  }

  onPressAddPhotoBtn = () => {
    this.ActionSheetSelectPhoto.show();
  };
  showActionSheet = index => {
    this.setState({
      selectedPhotoIndex: index
    });
    this.ActionSheet.show();
  };

  onDoUploadPress() {
    const { localPhotos } = this.state;
    if (localPhotos && localPhotos.length > 0) {
      let formData = new FormData();
      localPhotos.forEach((image) => {
        const file = {
          uri: image.path,
          name: image.filename || Math.floor(Math.random() * Math.floor(999999999)) + '.jpg',
          type: image.mime || 'image/jpeg'
        };
        // formData.append('files', file);
      });

      axios
        .post('http://192.168.0.102:8888/products', formData)
        .then(response => {
          this.setState({ logs: JSON.stringify(response.data) });
        })
        .catch(error => {
          alert(JSON.stringify(error));
        });
    } else {
      alert('No photo selected');
    }
  }

  onActionDeleteDone = index => {
    if (index === 0) {
      const array = [...this.state.localPhotos];
      array.splice(this.state.selectedPhotoIndex, 1);
      this.setState({ localPhotos: array });
    }
  };
  onActionSelectPhotoDone = index => {
    switch (index) {
      case 0:
        ImagePicker.openCamera({}).then(image => {
          this.setState({
            localPhotos: [...this.state.localPhotos, image]
          });
        });
        break;
      case 1:
        ImagePicker.openPicker({
          multiple: true,
          maxFiles: 10,
          mediaType: 'photo'
        }).then(images => {
          images.forEach((image) => {
            this.setState({
              localPhotos: [...this.state.localPhotos, image]
            });
          });
        }).catch(error => {
          alert(JSON.stringify(error));
        });
        break;
      default:
        break;
    }
  };

  renderListPhotos = localPhotos => {
    const photos = localPhotos.map((photo, index) => (
      <TouchableOpacity key={index}
        onPress={() => {
          this.showActionSheet(index);
        }}
      >
        <Image style={styles.photo} source={{ uri: photo.path }} />
      </TouchableOpacity>
    ));

    return photos;
  };

  renderSelectPhotoControl = localPhotos => {
    return (
      <View style={styles.sectionContainer}>
        <Text style={styles.sectionTitle}>Select photos</Text>
        <ScrollView style={styles.photoList} horizontal={true}>
          {this.renderListPhotos(localPhotos)}
          <TouchableOpacity onPress={this.onPressAddPhotoBtn.bind(this)}>
            <View style={[styles.addButton, styles.photo]}>
              <Text style={styles.addButtonText}>+</Text>
            </View>
          </TouchableOpacity>
        </ScrollView>
      </View>
    );
  };

  render() {
    return (
      <Fragment>
        <StatusBar barStyle="dark-content" />
        <SafeAreaView>
          <ScrollView
            contentInsetAdjustmentBehavior="automatic"
            style={styles.scrollView}>
            <Header />
            <Image style={{ width: 143, height: 30 }} source={{ uri: 'https://tuanitpro.com/wp-content/uploads/2015/04/logo.png' }} />
            <View style={styles.body}>
              {this.renderSelectPhotoControl(this.state.localPhotos)}
              <View style={styles.sectionContainer}>
                <TouchableOpacity onPress={this.onDoUploadPress}>
                  <Text style={styles.sectionTitle}>Upload now</Text>
                </TouchableOpacity>
              </View>
              <View style={styles.sectionContainer}>
                <Text style={styles.sectionTitle}>Logs</Text>
                <TextInput multiline numberOfLines={10} style={{ height: 250, borderColor: 'gray', borderWidth: 1 }}
                  value={this.state.logs}
                />
              </View>
            </View>
          </ScrollView>
          <ActionSheet
            ref={o => (this.ActionSheet = o)}
            title={'Confirm delete photo'}
            options={['Confirm', 'Cancel']}
            cancelButtonIndex={1}
            destructiveButtonIndex={0}
            onPress={index => {
              this.onActionDeleteDone(index);
            }}
          />
          <ActionSheet
            ref={o => (this.ActionSheetSelectPhoto = o)}
            title={'Select photo'}
            options={['Take Photo...', 'Choose from Library...', 'Cancel']}
            cancelButtonIndex={2}
            destructiveButtonIndex={1}
            onPress={index => {
              this.onActionSelectPhotoDone(index);
            }}
          />
        </SafeAreaView>
      </Fragment>
    );
  }
}

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: Colors.lighter,
  },
  body: {
    backgroundColor: Colors.white,
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: Colors.black,
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
    color: Colors.dark,
  },
  highlight: {
    fontWeight: '700',
  },
  section: {
    backgroundColor: Colors.white
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10
  },
  addPhotoTitle: {

    fontSize: 15,

    fontWeight: 'bold'
  },
  photoList: {
    height: 70,
    marginTop: 15,
    marginBottom: 15,
    marginRight: 10
  },
  photo: {
    marginRight: 10,
    width: 70,
    height: 70,
    borderRadius: 10
  },

  addButton: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#3399cc'
  },
  photoIcon: {
    width: 50,
    height: 50
  },
  addButtonContainer: {
    padding: 15,
    justifyContent: 'flex-end'
  },
  addButtonText: {
    color: Colors.white,
    fontWeight: 'bold',
    fontSize: 48
  }
});

// export default App;
