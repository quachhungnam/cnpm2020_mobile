import React, {useState, useEffect} from 'react';
import {
  Text,
  View,
  Image,
  ScrollView,
  Alert,
  StyleSheet,
  SafeAreaView,
  FlatList,
} from 'react-native';
import {TouchableHighlight} from 'react-native-gesture-handler';
import {SliderBox} from 'react-native-image-slider-box';
import {updatePostStatus, delete_a_post} from '../api/post_api';
import {getRateOfPost2} from '../api/rate_api';
import {AuthContext} from '../navigation/MyTabs';
import {your_ip} from '../api/your_ip';

var images = [
  'https://images.pexels.com/photos/1903702/pexels-photo-1903702.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
  'https://images.pexels.com/photos/1261728/pexels-photo-1261728.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
  'https://images.pexels.com/photos/1562/italian-landscape-mountains-nature.jpg?auto=compress&cs=tinysrgb&dpr=1&w=500',
  'https://images.pexels.com/photos/917494/pexels-photo-917494.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500', // Network image
];

function formatDate(date) {
  const day = `0${date.getDate()}`.slice(-2);
  const month = `0${date.getMonth() + 1}`.slice(-2);
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
}

function calStarAverage(rate) {
  const starSum = rate.reduce((sum, item) => sum + item.star, 0);
  return starSum / rate.length;
}

export default function YourPostDetail(props) {
  const {token} = React.useContext(AuthContext);
  const {post_item} = props.route.params;
  const post_image = post_item.post_image;
  const [rate, setRate] = useState([]);
  const [img_post, set_img_post] = useState([]);

  useEffect(() => {
    getAllRate();
    set_post_img();
  }, []);

  const set_post_img = () => {
    if (post_item.post_image.length === 0) {
      post_item.post_image.push({
        _id: new Date(),
        path: 'uploads/2020-06-26T05-02-35.813Z418788080.jpg',
      });
    }
    let arr_images = post_item.post_image;
    let arr_uri = [];
    for (let i = 0; i < arr_images.length; i++) {
      let uri = your_ip + ':3000/' + arr_images[i].path;
      arr_uri.push(uri);
    }
    set_img_post(arr_uri);
  };

  const getAllRate = async () => {
    try {
      const res = await getRateOfPost2(post_item._id);
      if (res.error) {
      } else {
        setRate(res.rate);
      }
    } catch (ex) {}
  };

  //xac nhan cho thue
  const rented = () => {
    statusCode = 3;
    updatePostStatus(
      this.state.user_token,
      this.props.route.params.id,
      statusCode,
    ).then(res => {
      if (res.message === 'updated status of post') {
        Alert.alert(
          'Thông báo',
          'Xác nhận đã cho thuê thành công',
          [
            {
              text: 'OK',
              onPress: () => {},
            },
          ],
          {cancelable: false},
        );
        return;
      }
      if (res.error) {
        Alert.alert(
          'Thông báo',
          'Tin này không tồn tại',
          [
            {
              text: 'OK',
              onPress: () => {},
            },
          ],
          {cancelable: false},
        );
      }
    });
  };

  const confirmRent = () => {
    try {
      Alert.alert(
        'Thông báo',
        'Bạn muốn xác nhận đã cho thuê tin này chứ?',
        [
          {
            text: 'Không',
            onPress: () => {},
            style: 'cancel',
          },
          {
            text: 'Có',
            onPress: () => {
              rented();
            },
          },
        ],
        {cancelable: false},
      );
    } catch (err) {
      console.error(err);
    }
  };

  //xac nhan huy yeu cau dat phong
  const delTran = () => {
    statusCode = 1;
    updatePostStatus(token, post_item._id, statusCode).then(res => {
      if (res.message === 'updated status of post') {
        Alert.alert(
          'Thông báo',
          'Xóa yêu cầu đặt thành công',
          [
            {
              text: 'OK',
              onPress: () => {},
            },
          ],
          {cancelable: false},
        );
        return;
      }
      if (res.error) {
        Alert.alert(
          'Thông báo',
          'Tin này không tồn tại',
          [
            {
              text: 'OK',
              onPress: () => {},
            },
          ],
          {cancelable: false},
        );
      }
    });
  };

  const delPost = () => {
    try {
      Alert.alert(
        'Thông báo',
        'Bạn muốn xóa yêu cầu đặt tin này chứ?',
        [
          {
            text: 'Không',
            onPress: () => {},
            style: 'cancel',
          },
          {
            text: 'Có',
            onPress: () => {
              delTran();
            },
          },
        ],
        {cancelable: false},
      );
    } catch (err) {
      console.error(err);
    }
  };

  const delete_post = async () => {
    try {
      const rs = await delete_a_post(token, post_item._id);
      if (rs.error) {
        alert('Bạn không thể xóa post này');
        return;
      } else {
        alert('Thành công!');
        props.navigation.navigate('ListYourPostScreen');
      }
    } catch (ex) {}
  };

  const on_delete_post = () => {
    Alert.alert('Alert', 'Bạn muốn xóa tin này?', [
      {text: 'no', onPress: () => {}, style: 'cancel'},
      {
        text: 'yes',
        onPress: () => {
          delete_post();
        },
        style: 'cancel',
      },
    ]);
  };

  const go_edit_screen1 = () => {
    for (let i = 0; i < post_image.length; i++) {
      post_image[i].uri = img_post[i];
      post_image[i].name = post_image[i]._id;
    }
    props.navigation.navigate('EditPostScreen', {
      post_item: post_item,
      img_post: img_post,
      post_image: post_image,
    });
  };

  return (
    <ScrollView
      style={{backgroundColor: '#fff'}}
      showsVerticalScrollIndicator={true}>
      {/* hoat anh */}
      <SliderBox images={img_post} />
      {/* view 2 hang dau */}
      <View style={styles.view_2rowdau}>
        {/* tieu de post, loai post, va gia */}
        <Text style={styles.txt_posttype}>{post_item.post_type_id.name}</Text>
        <Text style={styles.txt_title}>{post_item.title}</Text>
        <Text style={styles.txt_price}>
          {`Giá: ${post_item.price} VND / tháng`}
        </Text>
        {/* view dien tich va trang thai da dat  */}
        <View style={styles.view_square_status}>
          <View style={styles.view_square}>
            <Image
              source={require('../assets/images/cube.png')}
              style={{width: 30, height: 30}}
            />
            <Text style={styles.txt_square}>{`${post_item.square} m2`}</Text>
          </View>
          <View style={styles.view_status}>
            <Image
              source={require('../assets/images/question.png')}
              style={{width: 30, height: 30}}
            />
            <Text style={styles.txt_square}>
              {`${post_item.status_id.code === 2 ? 'Đã đặt' : 'Chưa đặt'}`}
            </Text>
          </View>
        </View>
      </View>

      {/* view mo ta chi tiet */}
      <View style={styles.view_contact}>
        <Text style={styles.txt_detail}>Mô tả chi tiết</Text>
        <Text>{post_item.description}</Text>
      </View>
      {/* view dia chi chi tiet gom 3 phan */}
      <View style={styles.view_addressdetail}>
        <Text style={styles.txt_detail}>Địa chỉ chi tiết</Text>
        <View style={styles.view_diachichitiet}>
          <View style={styles.view_province}>
            <Text style={{textAlign: 'center', fontSize: 14}}>
              Số nhà, Đường
            </Text>
            <Text style={styles.txt_address_detail}>
              {post_item.address_detail.split(',')[0]}
            </Text>
          </View>
          <View style={styles.view_province}>
            <Text style={{textAlign: 'center', fontSize: 14}}>
              Quận / Huyện
            </Text>
            <Text style={styles.txt_province}>
              {post_item.district_id.name}
            </Text>
          </View>
          <View style={styles.view_province}>
            <Text style={{textAlign: 'center', fontSize: 14}}>
              Tỉnh / Thành phố
            </Text>
            <Text style={styles.txt_province}>
              {post_item.province_id.name}
            </Text>
          </View>
        </View>
      </View>
      {/* view so dien thoai lien he */}
      <View style={styles.view_contact}>
        <Text style={styles.txt_detail}>Số điện thoại liên hệ</Text>
        <Text>{post_item.host_id.mobile}</Text>
      </View>
      {/* view ngay dang */}
      <View style={styles.view_datepost}>
        <Text style={styles.txt_detail}>Ngày đăng</Text>
        <Text>
          {post_item.updated_at === null
            ? formatDate(new Date(post_item.created_at))
            : formatDate(new Date(post_item.updated_at))}
        </Text>
      </View>

      {/* nguoi dang*/}
      <TouchableHighlight style={styles.touch_hostid}>
        <View style={{flex: 1, flexDirection: 'row'}}>
          <View style={{flex: 1, flexDirection: 'column'}}>
            <Text style={styles.txt_nguoidang}>Người đăng</Text>
            <Text>{post_item.host_id.name}</Text>
          </View>
        </View>
      </TouchableHighlight>

      {/* dat ngauy va goi dien */}
      <View style={styles.view_bookandcall}>
        {post_item.status_id.code === 2 && (
          <TouchableHighlight
            underlayColor="#ffceb588"
            style={{
              flex: 50,
              marginBottom: 20,
              marginRight: 10,
              padding: 10,
              borderRadius: 8,
              backgroundColor: '#ffceb5',
            }}
            onPress={() => {
              delPost();
            }}>
            <Text style={{textAlign: 'center'}}>Hủy đặt</Text>
          </TouchableHighlight>
        )}
        <TouchableHighlight
          disabled={post_item.status_id.code === 2 ? true : false}
          underlayColor="#ffceb588"
          style={styles.touch_datngay}
          onPress={() => {
            go_edit_screen1();
          }}>
          <Text style={{textAlign: 'center'}}>Sửa tin</Text>
        </TouchableHighlight>
        <TouchableHighlight
          underlayColor="#ffceb588"
          style={{
            flex: 50,
            marginBottom: 20,
            marginLeft: 10,
            padding: 10,
            borderRadius: 8,
            backgroundColor: '#ffceb5',
          }}
          onPress={() => {
            on_delete_post();
          }}>
          <Text style={{textAlign: 'center'}}>Xóa tin</Text>
        </TouchableHighlight>
      </View>
      {/* danh gia cua nguoi dung */}
      <View style={{paddingHorizontal: 10}}>
        <Text style={{fontSize: 18, fontWeight: 'bold'}}>
          {rate.length == 0 ? (
            <Text style={{fontSize: 18, fontWeight: 'bold'}}>
              Chưa có đánh giá nào
            </Text>
          ) : (
            `Đánh giá của người dùng: ${calStarAverage(rate)}/5`
          )}
        </Text>
        {rate.length == 0 ? (
          <Text />
        ) : (
          rate.map(item => {
            return (
              <View>
                <View style={{paddingTop: 10, flex: 1, flexDirection: 'row'}}>
                  <Text style={{marginRight: 10, fontSize: 16}}>
                    {`${item.account_id.name} đã đánh giá:`}
                  </Text>
                  <Text style={{fontSize: 16}}>{item.star}</Text>
                  <Image
                    source={require('../assets/images/star.png')}
                    style={{width: 10, height: 10}}
                  />
                </View>
                <Text style={{fontSize: 12, color: 'gray', marginBottom: 7}}>
                  {formatDate(new Date(item.created_at))}
                </Text>
                <Text
                  style={{
                    paddingBottom: 10,
                    borderBottomWidth: 1,
                    borderBottomColor: 'silver',
                  }}>
                  {item.description}
                </Text>
              </View>
            );
          })
        )}
      </View>
      {/* trang thai*/}
      <View
        style={{
          padding: 10,
          borderRadius: 20,
          backgroundColor: 'white',
        }}>
        <Text style={{fontSize: 18, marginBottom: 10, fontWeight: 'bold'}}>
          Trạng thái tin
        </Text>
        {post_item.status_id.code === 0 && (
          <Text>
            {post_item.status_id.code === 0 ? 'Chưa duyệt' : 'Đã duyệt'}
          </Text>
        )}

        {post_item.status_id.code !== 0 && (
          <Text>
            {post_item.status_id.code === 3 ? 'Đã thuê' : 'Chưa thuê'}
          </Text>
        )}

        {post_item.status_id.code !== 0 && post_item.status_id.code !== 3 && (
          <TouchableHighlight
            underlayColor="#ffceb588"
            style={styles.touch_rent}
            onPress={() => {
              confirmRent();
            }}>
            <Text style={{textAlign: 'center'}}>Đã cho thuê</Text>
          </TouchableHighlight>
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  touch_rent: {
    marginBottom: 20,
    marginTop: 20,
    padding: 10,
    borderRadius: 8,
    backgroundColor: '#ffceb5',
  },
  view_img: {
    flex: 1,
    flexDirection: 'column',
    textAlign: 'center',
    alignItems: 'center',
  },
  view_diachichitiet2: {
    marginBottom: 10,
    paddingHorizontal: 10,
    backgroundColor: 'white',
  },
  view_diachi: {
    flex: 1,
    flexDirection: 'column',
    textAlign: 'center',
  },
  txt_province: {
    textAlign: 'center',
    fontSize: 14,
    color: '#e88a59',
  },
  touch_datngay: {
    flex: 50,
    marginBottom: 20,
    padding: 10,
    borderRadius: 8,
    backgroundColor: '#ffceb5',
  },
  touch_nguoidang: {
    padding: 10,
    borderRadius: 20,
    backgroundColor: 'white',
  },
  view_ngaydang: {
    marginBottom: 10,
    paddingHorizontal: 10,
    borderRadius: 20,
    backgroundColor: 'white',
  },
  view_bookandcall: {
    flex: 100,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 10,
    marginTop: 20,
  },
  txt_square2: {
    textAlign: 'center',
    color: '#e88a59',
    marginTop: 6,
  },
  view_square: {
    flex: 1,
    flexDirection: 'column',
    textAlign: 'center',
    alignItems: 'center',
  },
  view_square_status: {
    paddingTop: 20,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  view_2rowdau: {
    marginTop: 10,
    flex: 1,
    flexDirection: 'column',
    padding: 10,
  },
  txt_nguoidang: {
    fontSize: 18,
    marginBottom: 10,
    fontWeight: 'bold',
  },
  view_datepost: {
    marginBottom: 10,
    paddingHorizontal: 10,
    borderRadius: 20,
    backgroundColor: 'white',
  },
  view_province: {
    flex: 1,
    flexDirection: 'column',
    textAlign: 'center',
  },
  view_addressdetail: {
    marginBottom: 10,
    paddingHorizontal: 10,
    backgroundColor: 'white',
  },
  view_contact: {
    marginTop: 10,
    marginBottom: 10,
    padding: 10,
    borderRadius: 20,
    backgroundColor: 'white',
  },
  touch_hostid: {
    padding: 10,
    borderRadius: 20,
    backgroundColor: 'white',
  },
  touch_contact: {
    flex: 50,
    marginBottom: 20,
    marginLeft: 10,
    padding: 10,
    borderRadius: 8,
    backgroundColor: '#ffceb5',
  },
  touch_rate: {
    flex: 50,
    marginBottom: 10,
    padding: 10,
    borderRadius: 8,
    backgroundColor: '#ffceb5',
  },
  input_rate: {
    marginTop: 10,
    marginBottom: 20,
    borderBottomColor: '#ccc',
    borderBottomWidth: 1,
    paddingLeft: 0,
  },
  txt_detail: {fontSize: 18, marginBottom: 10, fontWeight: 'bold'},
  txt_posttype: {
    color: 'gray',
    textTransform: 'uppercase',
    fontSize: 12,
    marginBottom: 10,
  },
  txt_title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  txt_price: {
    color: '#e88a59',
    paddingBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  txt_square: {
    textAlign: 'center',
    color: '#e88a59',
    marginTop: 6,
  },
  view_status: {
    flex: 1,
    flexDirection: 'column',
    textAlign: 'center',
    alignItems: 'center',
  },
  view_diachichitiet: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  txt_address_detail: {
    textAlign: 'center',
    fontSize: 14,
    color: '#e88a59',
  },
});
