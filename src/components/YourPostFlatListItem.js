import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native';

import { your_ip } from '../api/your_ip';

export default function YourPostFlatListItem(props) {
  const post = props.post;

  const on_delete_post = () => {
    Alert.alert('Alert', 'Bạn muốn xóa tin này?', [
      { text: 'Hủy', onPress: () => { }, style: 'cancel' },
      {
        text: 'Xóa',
        onPress: () => {
          props.delete_post();
        },
        style: 'cancel',
      },
    ]);
  };

  return (
    <TouchableOpacity
      style={{ backgroundColor: 'white' }}
      onLongPress={() => {
        on_delete_post();
      }}
      onPress={() => {
        props.navigation.navigate('YourPostDetails', { post_item: post });
      }}>
      <View style={styles.view_out}>
        {props.post.post_image[0] === undefined && (
          <Image
            source={{
              uri: your_ip + '/uploads/home.jpg',
            }}
            style={styles.view_image}
          />
        )}
        {props.post.post_image[0] !== undefined && (
          <Image
            source={{ uri: your_ip + '/' + props.post.post_image[0].path }}
            style={styles.view_image}
          />
        )}
        <View style={styles.view_in}>
          <Text style={styles.txt_name}>{props.post.post_type_id.name}</Text>
          <Text style={styles.txt_title}>{props.post.title}</Text>
          <Text style={styles.txt_price}>
            {`Giá: ${props.post.price} VND / tháng`}
          </Text>
          <Text style={styles.txt_address}>
            {`${props.post.address_detail}, ${
              props.post.district_id.name_with_type
              }, ${props.post.province_id.name_with_type}`}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  txt_address: {
    paddingTop: 5,
    paddingBottom: 12,
    color: 'black',
    fontSize: 13,
  },
  txt_price: {
    paddingTop: 5,
    color: '#e88a59',
    fontSize: 13,
  },
  txt_title: {
    paddingTop: 5,
    fontWeight: 'bold',
    fontSize: 18,
    color: 'black',
    fontSize: 15,
  },
  txt_name: {
    paddingTop: 8,
    color: 'gray',
    textTransform: 'uppercase',
    fontSize: 12,
  },
  view_in: {
    flex: 1,
    flexDirection: 'column',
    borderBottomWidth: 1,
    borderBottomColor: 'silver',
    marginRight: 10,
  },
  view_out: {
    flex: 1,
    // backgroundColor: 'none',
    color: 'black',
    flexDirection: 'row',
    paddingBottom: 5,
    borderBottomColor: 'white',
    borderBottomWidth: 2,
  },
  view_image: {
    width: 100,
    height: 100,
    margin: 10,
    borderRadius: 5,
  },
});
