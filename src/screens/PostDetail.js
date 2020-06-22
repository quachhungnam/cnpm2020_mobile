import React, { Component } from 'react';
import {
  Text,
  View,
  Image,
  ScrollView,
  Linking,
  TextInput,
  StyleSheet,
  Alert,
} from 'react-native';
import { TouchableHighlight } from 'react-native-gesture-handler';
import { SliderBox } from 'react-native-image-slider-box';
import StarRating from 'react-native-star-rating';
import { getRateOfPost } from '../api/rate_api';
import { addTransaction } from '../api/transaction_api';

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

export default function PostDetail(props) {
  const { post_item } = props.route.params

  return (
    <ScrollView
      style={{ backgroundColor: '#fff' }}
      showsVerticalScrollIndicator={true}>
      {/* hoat anh */}
      {/* <SliderBox images={this.state.images} /> */}
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
              style={{ width: 30, height: 30 }}
            />
            <Text style={styles.txt_square}>{`${post_item.square} m2`}</Text>
          </View>
          <View style={styles.view_status}>
            <Image
              source={require('../assets/images/question.png')}
              style={{ width: 30, height: 30 }}
            />
            <Text style={styles.txt_square}>
              {`${post_item.status_id.code === 1 ? 'Chưa đặt' : 'Đã đặt'}`}
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
            <Text style={{ textAlign: 'center', fontSize: 14 }}>
              Số nhà, Đường
                </Text>
            <Text style={styles.txt_address_detail}>
              {post_item.address_detail.split(',')[0]}
            </Text>
          </View>
          <View style={styles.view_province}>
            <Text style={{ textAlign: 'center', fontSize: 14 }}>
              Quận / Huyện
                </Text>
            <Text style={styles.txt_province}>{post_item.district_id.name}</Text>
          </View>
          <View style={styles.view_province}>
            <Text style={{ textAlign: 'center', fontSize: 14 }}>
              Tỉnh / Thành phố
                </Text>
            <Text style={styles.txt_province}>{post_item.province_id.name}</Text>
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
        <View style={{ flex: 1, flexDirection: 'row' }}>
          <View style={{ flex: 1, flexDirection: 'column' }}>
            <Text style={styles.txt_nguoidang}>Người đăng</Text>
            <Text>{post_item.host_id.name}</Text>
          </View>
        </View>
      </TouchableHighlight>

      {/* dat ngauy va goi dien */}
      <View style={styles.view_bookandcall}>
        <TouchableHighlight
          // disabled={this.props.route.params.statusCode === 2 ? true : false}
          underlayColor="#ffceb588"
          style={styles.touch_datngay}
        // onPress={() => {
        //   this.bookPost();
        // }}
        >
          <Text style={{ textAlign: 'center' }}>Đặt ngay</Text>
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
            Linking.openURL(`tel:${post_item.host_id.mobile}`);
          }}>
          <Text style={{ textAlign: 'center' }}>Gọi điện thoại</Text>
        </TouchableHighlight>
      </View>
      {/* danh gia cua nguoi dung */}
      <View style={{ paddingHorizontal: 10 }}>
        <Text style={{ fontSize: 18, fontWeight: 'bold' }}>
          {/* {`Đánh giá của người dùng: ${calStarAverage(rate)}/5`} */}
        </Text>
        {/* {rate.map(item => {
          return (
            <View>
              <View style={{ paddingTop: 10, flex: 1, flexDirection: 'row' }}>
                <Text style={{ marginRight: 10, fontSize: 16 }}>
                  {`${item.account_id.name} đã đánh giá:`}
                </Text>
                <Text style={{ fontSize: 16 }}>{item.star}</Text>
                <Image
                  source={require('../assets/images/star.png')}
                  style={{ width: 10, height: 10 }}
                />
              </View>
              <Text style={{ fontSize: 12, color: 'gray', marginBottom: 7 }}>
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
        })} */}
      </View>
      {/* danh gia cua ban */}
      <View style={styles.view_contact}>
        <Text style={styles.txt_detail}>Đánh giá của bạn</Text>
        <StarRating
          disabled={false}
          maxStars={5}
          // rating={this.state.starCount}
          emptyStar={'md-star-outline'}
          fullStar={'md-star'}
          halfStar={'md-star-half'}
          iconSet={'Ionicons'}
        // selectedStar={rating => {
        //   this.onStarRatingPress(rating);
        //   alert(this.state.starCount);
        // }}
        />
        <TextInput
          style={styles.input_rate}
          placeholder="Nhập đánh giá của bạn"
          placeholderTextColor="#333"
        />
        <TouchableHighlight style={styles.touch_rate}>
          <Text style={{ textAlign: 'center' }}>Đánh giá</Text>
        </TouchableHighlight>
      </View>
    </ScrollView>
  );
}




const styles = StyleSheet.create({
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
  txt_detail: { fontSize: 18, marginBottom: 10, fontWeight: 'bold' },
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
