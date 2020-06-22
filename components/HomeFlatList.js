import React, { Component } from 'react';
import {
  FlatList,
  View,
  Text,
  TextInput,
  StyleSheet,
  // Picker,
  TouchableHighlight,
  RefreshControl,
  ScrollView,
  TouchableOpacity
} from 'react-native';
import {Picker} from '@react-native-community/picker';
import HomeFlatListItem from './HomeFlatListItem';
import {
  getPostsFromServer,
  get_all_province,
  get_district_with_province,
  get_all_posttypes,
  getPostsFromServerByType,
  searchByAddress, get_one_district, get_one_province, get_one_posttype,
  getPostsFromServerWithPage
} from '../networking/Server';


export default class HomeFlatList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      textSearch: -1,
      deleted1: true,
      refreshing: false,
      postsFromServer: [],
      provinces: [],
      seleted_province: -1,
      districts: [],
      selected_district: -1,
      post_types: [],
      selected_posttype: -1,
      nameSelectedDistrict: -1,
      nameSelectedProvince: -1,
      nameSelectedPosttype: -1,
      pageNumber: 1
    };
    //this.add = this.add.bind(this);
    this.handleLoadMore = this.handleLoadMore.bind(this);
  }

  componentDidMount() {
    this.refreshDataFromServer(this.state.seleted_province, this.state.selected_district, this.state.selected_posttype);
    //this.getPostsFromServerWithPage();
    this.get_province()
    // this.get_district()
    this.get_posttypes()
  }
  getPostsFromServerWithPage() {
    getPostsFromServerWithPage(this.state.pageNumber).then(res => {
      this.setState({
        postsFromServer: this.state.postsFromServer.concat(res.post.filter(
          item => item.status_id.code === 1 || item.status_id.code === 2
        )),
      })
    }).catch(err => {
      this.setState({ postsFromServer: [] });
    })
  }
  handleLoadMore() {
    console.log('aaa');
    this.setState({
      pageNumber: this.state.pageNumber + 1
    })
    this.getPostsFromServerWithPage();
  }
  getAllPosts() {
    this.setState({ refreshing: true });
    getPostsFromServer()
      .then(posts => {
        this.setState({
          postsFromServer: posts.filter(
            item => item.status_id.code === 1 || item.status_id.code === 2,
          )
        });
        this.setState({ refreshing: false });
      })
      .catch(error => {
        this.setState({
          postsFromServer: [],
        });
        this.setState({ refreshing: false });
      });
  }
  getPostsByProvince(provinceCode) {
    this.setState({ refreshing: true });
    getPostsFromServer()
      .then(posts => {
        this.setState({
          postsFromServer: posts.filter(
            item => item.status_id.code === 1 || item.status_id.code === 2
          ).filter(item => item.province_id.code === provinceCode)
        });
        this.setState({ refreshing: false });
      })
      .catch(error => {
        this.setState({
          postsFromServer: [],
        });
        this.setState({ refreshing: false });
      });
  }
  getPostsByDistrict(districtCode) {
    this.setState({ refreshing: true });
    getPostsFromServer()
      .then(posts => {
        this.setState({
          postsFromServer: posts.filter(
            item => item.status_id.code === 1 || item.status_id.code === 2
          ).filter(item => item.district_id.code === districtCode)
        });
        console.log(this.state.postsFromServer);
        this.setState({ refreshing: false });
      })
      .catch(error => {
        this.setState({
          postsFromServer: [],
        });
        this.setState({ refreshing: false });
      });
  }
  //get Data
  refreshDataFromServer = (provinceCode, districtCode, postTypeId = -1) => {
    this.setState({ refreshing: true });
    if (provinceCode === -1) {
      this.getAllPosts();
    }
    if (districtCode !== -1) {
      this.getPostsByDistrict(districtCode);
    }
    if (districtCode === -1 && provinceCode !== -1) {
      console.log('aaa');
      this.getPostsByProvince(provinceCode);
    }
    this.setState({ refreshing: false });
  }
  get_province = () => {
    this.setState({ refreshing: true })
    get_all_province()
      .then((all_province) => {
        this.setState({ provinces: all_province })
        // this.setState({ seleted_province: all_province[0].code })
        // this.setState({ refreshing: false });
      }).catch(err => {
        console.log(err)
        this.setState({ provinces: [] })
      })
    this.setState({ refreshing: false })
  }


  get_posttypes = () => {
    get_all_posttypes()
      .then((all_posttypes) => {
        this.setState({ post_types: all_posttypes })
        this.setState({ selected_posttype: -1 })
      }).catch(err => {
        this.setState({ post_types: [] })
      })
  }

  ///CHANGE SELECT DROP
  change_province = (value) => {
    if (value !== -1) {
      this.setState({ seleted_province: value });
      // alert(new_province_code)
      //get danh sach quan huyen
      //this.getPostsByProvince(value);
      this.getOneProvince(value);
      this.refreshDataFromServer(value, this.state.selected_district, this.state.selected_posttype);
      console.log('aabb');
      get_district_with_province(value)
        .then((all_district) => {
          this.setState({ districts: all_district })
          this.setState({ selected_district: -1 })
        }).catch(err => {
          console.log(err)
          this.setState({ districts: [] })
        })

    } else {
      this.setState({ nameSelectedProvince: -1 });
      this.setState({ nameSelectedPosttype: -1 });
      this.setState({ nameSelectedDistrict: -1 });
      this.refreshDataFromServer(-1, -1, -1);
      this.setState({ seleted_province: -1 });
      this.setState({ selected_district: -1 });
      this.setState({ selected_posttype: -1 })
      this.setState({ districts: [] })
    }


  }
  getOneDistrict(districtCode) {
    get_one_district(districtCode).then(res => {
      this.setState({ nameSelectedDistrict: res.name_with_type });
    }).catch(err => {
      console.log(err);
    })
  }
  getOneProvince(provinceCode) {
    get_one_province(provinceCode).then(res => {
      this.setState({ nameSelectedProvince: res.name_with_type });
    }).catch(err => {

    })
  }
  getOnePosttype(posttypeId) {
    get_one_posttype(posttypeId).then(res => {
      this.setState({ nameSelectedPosttype: res.name });
    }).catch(err => {

    })
  }
  change_district = (value) => {

    this.setState({ selected_district: value });
    if (value !== -1) {
      this.getOneDistrict(value);
      return this.refreshDataFromServer(this.state.seleted_province, value, this.state.selected_posttype);
    }
    this.setState({ nameSelectedDistrict: -1 });
    this.getPostsByProvince(this.state.seleted_province);
    // this.get_district()
  }
  change_posttypes = (posttype_id) => {
    this.setState({ selected_posttype: posttype_id });
    console.log(this.state.selected_posttype);
    if (posttype_id === -1) {
      this.setState({ nameSelectedPosttype: -1 })
      if (this.state.seleted_province === -1) {
        this.getAllPosts();
        return this.setState({ refreshing: false });
      }
      if (this.state.selected_district === -1 && this.state.seleted_province !== -1) {
        return this.getPostsByProvince(this.state.seleted_province);
      }
      return this.getPostsByDistrict(this.state.selected_district);
    } else {
      this.getOnePosttype(posttype_id);
      this.setState({ refreshing: true });
      getPostsFromServerByType(posttype_id).then(res => {
        if (this.state.seleted_province === -1) {
          this.setState({
            postsFromServer: res.filter(
              item => item.status_id.code === 1 || item.status_id.code === 2
            )
          });
          return this.setState({ refreshing: false });
        }
        if (this.state.selected_district === -1 && this.state.seleted_province !== -1) {
          this.setState({
            postsFromServer: res.filter(
              item => item.status_id.code === 1 || item.status_id.code === 2
            ).filter(
              item => item.status_id.code === 1 || item.status_id.code === 2
            ).filter(item => item.province_id.code === this.state.seleted_province)
          });
          return this.setState({ refreshing: false });
        }
        this.setState({
          postsFromServer: res.filter(
            item => item.status_id.code === 1 || item.status_id.code === 2
          ).filter(
            item => item.status_id.code === 1 || item.status_id.code === 2
          ).filter(item => item.district_id.code === this.state.selected_district)
        });
        this.setState({ refreshing: false });
        // this.get_district()
      }).catch(err => {
        this.setState({ postsFromServer: [] });
      })
    }

  }

  onRefresh = () => {
    this.refreshDataFromServer(this.state.seleted_province, this.state.selected_district, this.state.selected_posttype);
    // this.get_province()
    // this.get_district()
  };

  render() {
    let tieuchi;
    if (this.state.nameSelectedPosttype === -1 && this.state.nameSelectedDistrict === -1 && this.nameSelectedProvince === -1) {

      tieuchi = (<Text style={{ flex: 1, marginLeft: 10, marginTop: 5, marginBottom: 5 }}>
        Tất cả bài đăng
      </Text>)
    }
    if (this.state.nameSelectedPosttype !== -1 && this.state.nameSelectedDistrict !== -1 && this.state.nameSelectedProvince !== -1) {
      tieuchi = (<Text style={{ flex: 1, marginLeft: 10, marginTop: 5, marginBottom: 5 }}>
        {this.state.nameSelectedPosttype} ở {this.state.nameSelectedDistrict}, {this.state.nameSelectedProvince}
      </Text>)
    }
    if (this.state.nameSelectedPosttype !== -1 && this.state.nameSelectedDistrict === -1 && this.state.nameSelectedProvince === -1) {
      tieuchi = (<Text style={{ flex: 1, marginLeft: 10, marginTop: 5, marginBottom: 5 }}>
        Tất cả bài đăng về {this.state.nameSelectedPosttype}
      </Text>)
    }
    if (this.state.nameSelectedPosttype === -1 && this.state.nameSelectedDistrict !== -1 && this.state.nameSelectedProvince !== -1) {
      tieuchi = (<Text style={{ flex: 1, marginLeft: 10, marginTop: 5, marginBottom: 5 }}>
        Tất cả bài đăng {this.state.nameSelectedDistrict}, {this.state.nameSelectedProvince}
      </Text>)
    }
    if (this.state.nameSelectedPosttype !== -1 && this.state.nameSelectedDistrict === -1 && this.state.nameSelectedProvince !== -1) {
      tieuchi = (<Text style={{ flex: 1, marginLeft: 10, marginTop: 5, marginBottom: 5 }}>
        {this.state.nameSelectedPosttype} ở {this.state.nameSelectedProvince}
      </Text>)
    }
    if (this.state.nameSelectedPosttype === -1 && this.state.nameSelectedDistrict === -1 && this.state.nameSelectedProvince !== -1) {

      tieuchi = (<Text style={{ flex: 1, marginLeft: 10, marginTop: 5, marginBottom: 5 }}>
        Tất cả bài đăng ở {this.state.nameSelectedProvince}
      </Text>)
    }
    let flatListz;
    if (this.state.postsFromServer.length === 0) {
      flatListz = (<Text style={{
        flex: 1,
        marginLeft: 20, marginRight: 20,
        marginTop: 10, fontSize: 18
      }}>Chưa có bài đăng nào</Text>)
    } else {
      flatListz = (
        <FlatList
          style={{ flex: 1, marginTop: 10 }}
          ref={'flatList'}
          data={this.state.postsFromServer}
          renderItem={({ item, index }) => {
            return (
              <HomeFlatListItem
                navigation={this.props.navigation}
                item={item}
                index={index}
                parents={this}
              />
            );
          }}
          keyExtractor={(item, index) => item._id}
          onEndReached={this.handleLoadMore}
          onEndReachedThreshold={0}
          refreshControl={
            <RefreshControl
              refreshing={this.state.refreshing}
              onRefresh={this.onRefresh}
            />
          }
        />
      )
    }
    return (
      <>
        <View
          style={{
            marginHorizontal: 10,
            flex: 1, flexDirection: 'column'
          }}>
          <View style={{ flex: 1, flexDirection: 'row' }}>
            {/* drop down province */}
            <Picker
              style={styles.picker_pro_dis}
              mode="dropdown"
              selectedValue={this.state.seleted_province}
              onValueChange={(itemValue, itemIndex) => { this.change_province(itemValue) }}
            >
              {/* Hien thi cac tinh thanh */}
              <Picker.Item
                label="Tỉnh/thành phố"
                value={-1}
                key={-1}
              />
              {Object.keys(this.state.provinces).map(key => {
                return (
                  <Picker.Item
                    label={this.state.provinces[key].name}
                    value={this.state.provinces[key].code}
                    key={this.state.provinces[key].code}
                  />
                )
              })}
            </Picker>
            {/* dropdown district of province X */}
            <Picker
              style={styles.picker_pro_dis}
              mode="dropdown"
              selectedValue={this.state.selected_district}
              onValueChange={(itemValue, itemIndex) => { this.change_district(itemValue) }}
            >
              {/* Hien thi toan bo quan, huyen */}
              <Picker.Item
                label="Quận/Huyện"
                value={-1}
                key={-1}
              />
              {Object.keys(this.state.districts).map(key => {
                return (
                  <Picker.Item
                    label={this.state.districts[key].name}
                    value={this.state.districts[key].code}
                    key={this.state.districts[key].code}
                  />
                )
              })}
            </Picker>
          </View>

          <View style={{ flex: 1 }}>
            {/* Hien thi post type */}
            <Picker
              style={{
                fontSize: 8,
                alignItems: 'center',
              }}
              mode="dropdown"
              selectedValue={this.state.selected_posttype}
              onValueChange={(itemValue, itemIndex) => { this.change_posttypes(itemValue) }}
            >
              <Picker.Item
                label="Loại tin"
                value={-1}
                key={-1}
              />
              {Object.keys(this.state.post_types).map(key => {
                return (
                  <Picker.Item
                    label={this.state.post_types[key].name}
                    value={this.state.post_types[key]._id}
                    key={this.state.post_types[key]._id}
                  />
                )
              })}
            </Picker>
          </View>
          <TouchableOpacity
            style={styles.buttonSearch}
            returnKeyType="go"
            autoCorrect={false}
            onPress={() => {
              if (this.state.selected_posttype === - 1 || this.seleted_province === -1) {
                return alert("Vui lòng chọn tỉnh/thành và loại tin");
              }
              this.props.navigation.navigate('SearchScreen', {
                province: this.state.seleted_province,
                district: this.state.selected_district,
                posttypes: this.state.selected_posttype
              });
            }}
          >
            <Text style={{ textAlign: 'center', paddingVertical: 10 }}>Tìm theo tên đường</Text>
          </TouchableOpacity>
          {tieuchi}
        </View>
        {/* <Text style={{textAlign: 'center', marginBottom: 10, marginTop: 10, fontSize: 18, letterSpacing: 2}}>{this.props.title}</Text> */}
        {/* Hien thi danh sach cac bai post cong khai */}
        {flatListz}

      </>
    );
  }
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