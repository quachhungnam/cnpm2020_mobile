import React, { useState, useEffect } from 'react';
import {
  Text,
  View,
  TouchableHighlight,
  StyleSheet,
} from 'react-native';
import YourPostFlatList from '../components/YourPostFlatList';
export default function ListYourPost(props) {

  useEffect(() => {

  }, []);

  return (
    <>
      <View
        style={{ flex: 1, flexDirection: 'column', backgroundColor: '#fff' }}>
        <YourPostFlatList
          navigation={props.navigation}
          title="Danh sách tin đăng của bạn"
        // account={account}
        />
      </View>
      <TouchableHighlight
        underlayColor="#ffceb588"
        style={styles.touch_view}
        onPress={() => {
          props.navigation.navigate('AddPostScreen');
        }}>
        <Text style={{ textAlign: 'center' }}>Thêm tin đăng</Text>
      </TouchableHighlight>
    </>
  );

}

const styles = StyleSheet.create({
  touch_view: {
    marginTop: 10,
    marginLeft: 10,
    marginRight: 10,
    paddingTop: 10,
    paddingBottom: 10,
    backgroundColor: '#ffceb5',
    borderRadius: 8,
    marginBottom: 10,
  },
});
