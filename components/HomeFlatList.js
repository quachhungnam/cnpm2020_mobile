import React, { Component } from 'react';
import {
  FlatList,
  View,
  Text,
  TextInput,
  StyleSheet,
  Picker,
  TouchableHighlight,
  RefreshControl,
  ScrollView,
} from 'react-native';
import HomeFlatListItem from './HomeFlatListItem';
import {
  getPostsFromServer,
  get_all_province,
  get_district_with_province,
  get_all_posttypes
} from '../networking/Server';


export default class HomeFlatList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      deleted1: true,
      refreshing: false,
      postsFromServer: [],
      provinces: [],
      seleted_province: -1,
      districts: [],
      selected_district: -1,
      post_types: [],
      selected_posttype: 1,
    };
    //this.add = this.add.bind(this);
  }

  componentDidMount() {
    this.refreshDataFromServer();
    this.get_province()
    // this.get_district()
    this.get_posttypes()
  }
  //get Data
  refreshDataFromServer = () => {
    this.setState({ refreshing: true });
    getPostsFromServer()
      .then(posts => {
        this.setState({
          postsFromServer: posts.filter(
            item => item.status_id.code === 1 || item.status_id.code === 2,
          ),
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
  get_province = () => {
    // this.setState({ refreshing: true })
    get_all_province()
      .then((all_province) => {
        this.setState({ provinces: all_province })
        // this.setState({ seleted_province: all_province[0].code })
        // this.setState({ refreshing: false });
      }).catch(err => {
        console.log(err)
        this.setState({ provinces: [] })
      })
    // this.setState({ refreshing: false })
  }


  get_posttypes = () => {
    get_all_posttypes()
      .then((all_posttypes) => {
        this.setState({ post_types: all_posttypes })
        this.setState({ selected_posttype: all_posttypes[0]._id })
      }).catch(err => {
        this.setState({ post_types: [] })
      })
  }

  ///CHANGE SELECT DROP
  change_province = (new_province_code) => {
    if (new_province_code !== -1) {
      this.setState({ seleted_province: new_province_code })
      // alert(new_province_code)
      //get danh sach quan huyen
      get_district_with_province(new_province_code)
        .then((all_district) => {
          this.setState({ districts: all_district })
          this.setState({ selected_district: all_district[0].code })
        }).catch(err => {
          console.log(err)
          this.setState({ districts: [] })
        })
    } else {
      this.setState({ selected_district: -1 })
      this.setState({ districts: [] })
    }


  }
  change_district = (district_code) => {
    this.setState({ selected_district: district_code })
    // this.get_district()
  }
  change_posttypes = (posttype_id) => {
    this.setState({ selected_posttype: posttype_id })
    // this.get_district()
  }

  onRefresh = () => {
    this.refreshDataFromServer();
    // this.get_province()
    // this.get_district()
  };

  render() {
    return (
      <>
        <ScrollView>
          <View
            style={{
              marginHorizontal: 10,
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
                  label="Tỉnh/ thành phố"
                  value={this.seleted_province}
                  key={this.seleted_province}
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
                  value={this.selected_district}
                  key={this.selected_district}
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
                  fontSize: 10,
                  flex: 1,
                  paddingTop: 40,
                  alignItems: 'center',
                }}
                mode="dropdown"
                selectedValue={this.state.selected_posttype}
                onValueChange={(itemValue, itemIndex) => { this.change_posttypes(itemValue) }}
              >
                {Object.keys(this.state.post_types).map(key => {
                  return (
                    <Picker.Item
                      label={this.state.post_types[key].name}
                      value={this.state.post_types[key]._id}
                      key={key}
                    />
                  )
                })}
              </Picker>
            </View>
            <TextInput
              style={styles.InputSearch}
              returnKeyType="go"
              autoCorrect={false}
              placeholder="Nhập địa chỉ"
              placeholderTextColor="#000"
            />
            <TouchableHighlight
              style={styles.buttonSearch}
            >
              <Text style={{ textAlign: 'center', color: '#333', fontSize: 16 }}>
                Tìm kiếm
              </Text>
            </TouchableHighlight>
            <Text style={{ marginLeft: 10, marginTop: 5, marginBottom: 5 }}>
              Phòng trọ ở Thanh Khê, Đà Nẵng{' '}
            </Text>
          </View>
          {/* <Text style={{textAlign: 'center', marginBottom: 10, marginTop: 10, fontSize: 18, letterSpacing: 2}}>{this.props.title}</Text> */}

          {/* Hien thi danh sach cac bai post cong khai */}
          <FlatList
            style={{ marginTop: 0 }}
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
            refreshControl={
              <RefreshControl
                refreshing={this.state.refreshing}
                onRefresh={this.onRefresh}
              />
            }
          />
        </ScrollView>
      </>
    );
  }
}


const styles = StyleSheet.create({
  picker_pro_dis: {
    flex: 1,
    paddingTop: 40,
    alignItems: 'center',
  },
  InputSearch: {
    marginHorizontal: 10,
    fontSize: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    paddingLeft: 0,
  },
  buttonSearch: {
    marginTop: 5,
    backgroundColor: '#ffceb5',
    paddingVertical: 10,
    marginTop: 20,
    margin: 10,
    borderRadius: 8,
  }

})