import React, { Component, useState, useEffect } from 'react';
import { FlatList, View, Text, StyleSheet, RefreshControl, SafeAreaView } from 'react-native';
import YourPostFlatListItem from './YourPostFlatListItem';
import { get_post_of_account } from '../api/post_api';
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

  return (
    <SafeAreaView>
      <View style={{}}>
        <Text
          style={{
            fontSize: 18,
            textAlign: 'center',
            paddingVertical: 10,
            letterSpacing: 1,
            backgroundColor: '#eee',
          }}>
          {props.title}
        </Text>
      </View>
      <FlatList
        refreshControl={
          <RefreshControl refreshing={refreshing}
            onRefresh={onRefresh}
          />
        }
        data={arr_post}
        renderItem={({ item }) => (
          <YourPostFlatListItem
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
  picker_pro_dis: {
    fontSize: 8,
    flex: 1,
    alignItems: 'center',
  },
  buttonSearch: {
    backgroundColor: '#ffceb5',
    paddingBottom: 0,
    paddingTop: 0,
    paddingVertical: 10,
    marginTop: 0,
    borderRadius: 8,
    flex: 1,
    textAlign: 'center'
  }
})
