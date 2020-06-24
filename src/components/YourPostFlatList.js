import React, { Component, useState, useEffect } from 'react';
import { FlatList, View, Text, StyleSheet, RefreshControl, SafeAreaView } from 'react-native';
import YourPostFlatListItem from './YourPostFlatListItem';
import { get_post_of_account, delete_a_post } from '../api/post_api';
import { AuthContext } from '../navigation/MyTabs';

function wait(timeout) {
  return new Promise(resolve => {
    setTimeout(resolve, timeout)
  })
}

export default function YourPostFlatList(props) {
  const { token } = React.useContext(AuthContext)
  const [refreshing, setRefreshing] = useState(false);
  const [arr_post, set_arr_post] = useState([])

  useEffect(() => {
    getAllPosts()
  }, [])

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    getAllPosts()
    wait(2000).then(() => setRefreshing(false));
  }, [refreshing]);

  const getAllPosts = async () => {
    try {
      const res = await get_post_of_account(token)
      if (res.error) {
        return
      } else {
        const all_post = res.post
        set_arr_post(all_post)
      }
    } catch (ex) {
      console.log(ex)
    }
  }

  const delete_post = async (post_id) => {
    try {
      const rs = await delete_a_post(token, post_id)
      if (rs.error) {
        alert('Bạn không thể xóa post này')
        return
      } else {
        onRefresh()
        alert('Thành công!')
      }
    } catch (ex) { }
  }


  return (
    <SafeAreaView>
      <FlatList
        ListHeaderComponent={
          <View style={{}}>
            <Text
              style={styles.txt_title}>
              {props.title}
            </Text>
          </View>
        }
        refreshControl={
          <RefreshControl refreshing={refreshing}
            onRefresh={onRefresh}
          />
        }
        data={arr_post}
        renderItem={({ item }) => (
          <YourPostFlatListItem
            delete_post={() => { delete_post(item._id) }}
            navigation={props.navigation}
            post={item}
          />
        )}
        keyExtractor={item => item._id}
        extraData={arr_post}
      // ListFooterComponent={Flat_Header}

      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  txt_title: {
    fontSize: 18,
    textAlign: 'center',
    paddingVertical: 10,
    letterSpacing: 1,
    backgroundColor: '#eee',
  },
})
