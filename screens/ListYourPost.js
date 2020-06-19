import React, { Component, useState, useEffect } from 'react';
import { Text, View, TouchableHighlight, ScrollView, StyleSheet } from 'react-native';
import PostYouBookFlatList from '../components/PostYouBookFlatList';
import AsyncStorage from '@react-native-community/async-storage'
export default function ListYourPost(props) {

  const [tokenz, set_tokenz] = useState(null)
  add_post = () => {
    AsyncStorage.getItem('user').then(value => {
      set_tokenz(value)
    });
  }

  useEffect(() => {

  }, [])
  return (
    <View
      style={{ flex: 1, flexDirection: 'column', backgroundColor: '#fff' }}>
      <ScrollView>
        <PostYouBookFlatList
          title="Danh sách tin đăng của bạn"
        />
      </ScrollView>

      <TouchableHighlight
        underlayColor="#ffceb588"
        style={styles.touch_view}
        onPress={() => {
          props.navigation.navigate('AddPostScreen');
        }}>
        <Text style={{ textAlign: 'center' }}>Thêm tin đăng</Text>
      </TouchableHighlight>
    </View>
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
    marginBottom: 30,
  }
})