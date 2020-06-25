import React, {useState, useEffect} from 'react';
import {
  Text,
  View,
  StyleSheet,
  FlatList,
  SafeAreaView,
  TouchableOpacity,
  RefreshControl,
} from 'react-native';
import {Picker} from '@react-native-community/picker';
import Carousel from '../components/Carousel';
import {dummyData} from '../data/DataCarousel';
import PostItem from './PostItem';

import {getPostsFromServer2} from '../api/post_api';
import {get_all_posttypes2} from '../api/posttype_api';
import {get_all_province2} from '../api/province_api';
import {get_district_with_province} from '../api/district_api';

function wait(timeout) {
  return new Promise(resolve => {
    setTimeout(resolve, timeout);
  });
}

function Header_List(props) {
  const [posttypes, set_posttypes] = useState([{name: 'LOẠI TIN', _id: -1}]);
  const [select_posttype, set_select_posttype] = useState(-1);

  const [provinces, set_provinces] = useState([
    {name: 'Tỉnh/ Thành phố', code: -1},
  ]);
  const [select_province, set_select_province] = useState(-1);

  const [districts, set_districts] = useState([
    {name: 'Huyện/ Quận', code: -1},
  ]);
  const [select_district, set_select_district] = useState(-1);

  useEffect(() => {
    get_posttypes();
    get_provinces();
  }, []);

  const get_posttypes = async () => {
    try {
      const res = await get_all_posttypes2();
      if (res.error) {
        return;
      } else {
        let new_arr = res.post_type;
        new_arr.unshift({name: 'LOẠI TIN', _id: -1});
        set_posttypes(new_arr);
        // set_post_infor((pre) => ({ ...pre, post_type_id: res.post_type[0]._id }))
      }
    } catch (ex) {}
  };

  const get_provinces = async () => {
    try {
      const res = await get_all_province2();
      if (res.error) {
        return;
      } else {
        let new_arr = res.data.provinces;
        new_arr.unshift({name: 'Tỉnh/ Thành phố', code: -1});
        set_provinces(new_arr);
      }
    } catch (ex) {}
  };

  const change_province = async item => {
    try {
      const condition = {
        province_code: item,
        district_code: -1,
        post_type_id: select_posttype,
      };
      set_select_province(item);
      if (item == -1) {
        set_districts([{name: 'Huyện/ Quận', code: -1}]);
        condition.district_code = -1;
        props.filter_post(condition);
        return;
      } else {
        const all_district = await get_district_with_province(item);
        let arr_district = all_district;
        all_district.unshift({name: 'Huyện/ Quận', code: -1});
        set_districts(arr_district);
        props.filter_post(condition);
      }
    } catch (ex) {}
  };

  const change_district = async item => {
    const condition = {
      province_code: select_province,
      district_code: item,
      post_type_id: select_posttype,
    };
    props.filter_post(condition);
    set_select_district(item);
  };

  const change_posttype = async item => {
    const condition = {
      province_code: select_province,
      district_code: select_district,
      post_type_id: item,
    };
    props.filter_post(condition);
    set_select_posttype(item);
  };

  return (
    <>
      <Carousel data={dummyData} />

      <View
        style={{
          marginHorizontal: 10,
          flex: 1,
          flexDirection: 'column',
        }}>
        <View style={{flex: 1, flexDirection: 'row'}}>
          {/* drop down province */}
          <Picker
            style={styles.picker_pro_dis}
            mode="dropdown"
            selectedValue={select_province}
            onValueChange={(itemValue, itemIndex) => {
              change_province(itemValue);
            }}>
            {/* Hien thi cac tinh thanh */}

            {Object.keys(provinces).map(key => {
              return (
                <Picker.Item
                  label={provinces[key].name}
                  value={provinces[key].code}
                  key={provinces[key].code}
                />
              );
            })}
          </Picker>
          {/* dropdown district of province X */}
          <Picker
            style={styles.picker_pro_dis}
            mode="dropdown"
            selectedValue={select_district}
            onValueChange={(itemValue, itemIndex) => {
              change_district(itemValue);
            }}>
            {/* Hien thi toan bo quan, huyen */}
            {Object.keys(districts).map(key => {
              return (
                <Picker.Item
                  label={districts[key].name}
                  value={districts[key].code}
                  key={districts[key].code}
                />
              );
            })}
          </Picker>
        </View>

        <View style={{flex: 1}}>
          {/* Hien thi post type */}
          <Picker
            style={{
              fontSize: 8,
              alignItems: 'center',
            }}
            mode="dropdown"
            selectedValue={select_posttype}
            onValueChange={(itemValue, itemIndex) => {
              change_posttype(itemValue);
            }}>
            {Object.keys(posttypes).map(key => {
              return (
                <Picker.Item
                  label={posttypes[key].name}
                  value={posttypes[key]._id}
                  key={key}
                />
              );
            })}
          </Picker>
        </View>
        <TouchableOpacity
          style={styles.buttonSearch}
          returnKeyType="go"
          autoCorrect={false}
          onPress={() => {
            if (select_posttype === -1 || select_province === -1) {
              return alert('Vui lòng chọn tỉnh/thành và loại tin');
            }
            props.navigation.navigate('SearchScreen', {});
          }}>
          <Text style={{textAlign: 'center', paddingVertical: 10}}>
            Tìm theo tên đường
          </Text>
        </TouchableOpacity>
        {/* {tieuchi} */}
      </View>
    </>
  );
}

export default function ListPost(props) {
  const init_fil = {province_code: -1, district_code: -1, post_type_id: -1};
  const [refreshing, setRefreshing] = useState(false);
  const [arr_post, set_arr_post] = useState([]);
  const [save_post, set_save_post] = useState([]);
  const [fil, set_fil] = useState(init_fil);

  useEffect(() => {
    getAllPosts();
  }, []);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    getAllPosts();
    wait(2000).then(() => setRefreshing(false));
  }, [refreshing]);

  const getAllPosts = async () => {
    try {
      const res = await getPostsFromServer2();
      if (res.error) {
        alert('null');
        return;
      } else {
        const post_filter = res.post.filter(
          item => item.status_id.code === 1 || item.status_id.code === 2,
        );
        set_arr_post(post_filter);
        set_save_post(post_filter);
        set_fil(init_fil);
      }
    } catch (ex) {
      console.log(ex);
    }
  };
  const filter_post = condition => {
    const all_post = save_post;
    const post_filter = all_post.filter(
      post =>
        (condition.province_code != -1
          ? post.province_id.code == condition.province_code
          : 1) &&
        (condition.district_code != -1
          ? post.district_id.code == condition.district_code
          : 1) &&
        (condition.post_type_id != -1
          ? post.post_type_id._id == condition.post_type_id
          : 1),
    );
    set_arr_post(post_filter);
  };

  return (
    <SafeAreaView>
      <FlatList
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        ListHeaderComponent={
          <Header_List
            navigation={props.navigation}
            filter_post={filter_post}
            search_address={2}
          />
        }
        data={arr_post}
        renderItem={({item}) => (
          <PostItem
            // navigation={prop}
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
    textAlign: 'center',
  },
});
