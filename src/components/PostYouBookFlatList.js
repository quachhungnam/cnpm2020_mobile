
import React, { Component, useState, useEffect } from 'react';
import { FlatList, View, Text, StyleSheet, RefreshControl, SafeAreaView } from 'react-native';
import PostYouBookFlatListItem from '../components/PostYouBookFlatListItem';
import { get_all_tran_of_account } from '../api/transaction_api';
import { AuthContext } from '../navigation/MyTabs';


function wait(timeout) {
  return new Promise(resolve => {
    setTimeout(resolve, timeout)
  })
}


export default function PostYouBookFlatList(props) {
  const { token } = React.useContext(AuthContext)
  const [refreshing, setRefreshing] = useState(false);
  const [arr_trans, set_arr_trans] = useState([])

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
      const res = await get_all_tran_of_account(token)
      if (res.error) {
        return
      } else {
        const all_trans = res.transaction
        set_arr_trans(all_trans)
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
        data={arr_trans}
        renderItem={({ item }) => (
          <PostYouBookFlatListItem
            navigation={props.navigation}
            trans={item}
          />
        )}
        keyExtractor={item => item._id}
        extraData={arr_trans}
      // ListFooterComponent={Flat_Header}

      />
    </SafeAreaView>
  );
}
