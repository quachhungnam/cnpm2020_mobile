import React, {Component} from 'react';
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

import {getPostsFromServer} from '../networking/Server';
// import Snackbar from 'react-native-snackbar';
// import Button from 'react-native-button';
// import AddModal from './AddModal';
// import EditModal from './EditModal';

const styles = StyleSheet.create({});

export default class HomeFlatList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      deleted1: true,
      refreshing: false,
      postsFromServer: [],
    };
    //this.add = this.add.bind(this);
  }

  componentDidMount() {
    this.refreshDataFromServer();
  }

  refreshDataFromServer = () => {
    this.setState({refreshing: true});
    getPostsFromServer()
      .then(posts => {
        this.setState({
          postsFromServer: posts.filter(
            item => item.status_id.code === 1 || item.status_id.code === 2,
          ),
        });
        this.setState({refreshing: false});
      })
      .catch(error => {
        this.setState({
          postsFromServer: [],
        });
        this.setState({refreshing: false});
      });
  };

  onRefresh = () => {
    this.refreshDataFromServer();
  };
  // refreshFlatList = () => {
  //     this.setState((prev) => {
  //         return {
  //             deleted1: !prev.deleted1
  //         }
  //     })
  //     //this.refs.flatList.scrollToEnd();
  // }
  // add() {
  //     this.refs.addModal.showAddModal();
  // }
  render() {
    var options = ['Đà Nẵng', 'Savings', 'Car', 'GirlFriend'];
    var options1 = ['Thanh Khê', 'Savings', 'Car', 'GirlFriend'];
    var options2 = ['Phòng trọ', 'Savings', 'Car', 'GirlFriend'];
    return (
      <>
        <ScrollView>
          <View
            style={{
              marginHorizontal: 10,
            }}>
            <View style={{flex: 1, flexDirection: 'row'}}>
              <Picker
                style={{
                  flex: 1,
                  paddingTop: 40,
                  alignItems: 'center',
                }}
                mode="dropdown"
                //selectedValue={this.state.selected}
                //onValueChange={()=>{}}
              >
                {Object.keys(options).map(key => {
                  return (
                    <Picker.Item label={options[key]} value={key} key={key} />
                  ); //if you have a bunch of keys value pair
                })}
              </Picker>
              <Picker
                style={{
                  flex: 1,
                  paddingTop: 40,
                  alignItems: 'center',
                }}
                mode="dropdown"
                //selectedValue={this.state.selected}
                //onValueChange={()=>{}}
              >
                {Object.keys(options1).map(key => {
                  return (
                    <Picker.Item label={options1[key]} value={key} key={key} />
                  ); //if you have a bunch of keys value pair
                })}
              </Picker>
            </View>
            <View style={{flex: 1}}>
              <Picker
                style={{
                  fontSize: 10,
                  flex: 1,
                  paddingTop: 40,
                  alignItems: 'center',
                }}
                mode="dropdown"
                //selectedValue={this.state.selected}
                //onValueChange={()=>{}}
              >
                {Object.keys(options1).map(key => {
                  return (
                    <Picker.Item label={options2[key]} value={key} key={key} />
                  ); //if you have a bunch of keys value pair
                })}
              </Picker>
            </View>
            <TextInput
              style={{
                marginHorizontal: 10,
                fontSize: 16,
                borderBottomWidth: 1,
                borderBottomColor: '#ccc',
                paddingLeft: 0,
              }}
              returnKeyType="go"
              autoCorrect={false}
              placeholder="Nhập tên đường"
              placeholderTextColor="#000"
            />
            <TouchableHighlight
              style={{
                marginTop: 5,
                backgroundColor: '#ffceb5',
                paddingVertical: 10,
                marginTop: 20,
                margin: 10,
                borderRadius: 8,
              }}>
              <Text style={{textAlign: 'center', color: '#333', fontSize: 16}}>
                Tìm kiếm
              </Text>
            </TouchableHighlight>
            <Text style={{marginLeft: 10, marginTop: 5, marginBottom: 5}}>
              Phòng trọ ở Thanh Khê, Đà Nẵng{' '}
            </Text>
          </View>
          {/* <Text style={{textAlign: 'center', marginBottom: 10, marginTop: 10, fontSize: 18, letterSpacing: 2}}>{this.props.title}</Text> */}

          <FlatList
            style={{marginTop: 0}}
            ref={'flatList'}
            // data={[1, 2, 3, 4, 5, 6]}
            data={this.state.postsFromServer}
            renderItem={({item, index}) => {
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
          {/* <AddModal ref={'addModal'} parents={this}></AddModal>
            <EditModal ref={'editModal'} parents={this}></EditModal> */}
        </ScrollView>
      </>
    );
  }
}
