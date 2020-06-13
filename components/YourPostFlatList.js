import React, {Component} from 'react';
import {FlatList, View, Text, StyleSheet, RefreshControl} from 'react-native';

import YourPostFlatListItem from './YourPostFlatListItem';

import {getPostsFromServer} from '../networking/Server';
// import Snackbar from 'react-native-snackbar';
// import Button from 'react-native-button';
// import AddModal from './AddModal';
// import EditModal from './EditModal';

const styles = StyleSheet.create({});

export default class YourPostFlatList extends Component {
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
          postsFromServer: posts,
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
    return (
      <>
        <View style={{}}>
          <View style={{}}>
            <Text
              style={{
                fontSize: 18,
                textAlign: 'center',
                paddingVertical: 10,
                letterSpacing: 1,
                backgroundColor: '#eee',
              }}>
              {this.props.title}
            </Text>
          </View>
          {/* <Text style={{textAlign: 'center', marginBottom: 10, marginTop: 10, fontSize: 18, letterSpacing: 2}}>{this.props.title}</Text> */}

          <FlatList
            style={{marginTop: 0, marginBottom: 20}}
            ref={'flatList'}
            // data={[1, 2, 3, 4, 5]}
            data={this.state.postsFromServer}
            renderItem={({item, index}) => {
              return (
                <YourPostFlatListItem
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
        </View>
      </>
    );
  }
}
