import React, { Component } from 'react';
import { FlatList, View, Text, StyleSheet, RefreshControl } from 'react-native';
import YourPostFlatListItem from './YourPostFlatListItem';
import { getPostsFromServer } from '../api/post_api';

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
    this.setState({ refreshing: true });
    getPostsFromServer()
      .then(posts => {
        this.setState({
          postsFromServer: posts.filter(
            post => post.host_id._id === this.props.account._id,
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
  };

  onRefresh = () => {
    this.refreshDataFromServer();
  };

  render() {
    return (
      <>
        <View style={{}}>
          <View style={{}}>
            <Text style={styles.view_txt}>{this.props.title}</Text>
          </View>

          <FlatList
            style={{ marginTop: 0, marginBottom: 20 }}
            ref={'flatList'}
            // data={[1, 2, 3, 4, 5]}
            data={this.state.postsFromServer}
            renderItem={({ item, index }) => {
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
        </View>
      </>
    );
  }
}

const styles = StyleSheet.create({
  view_txt: {
    fontSize: 18,
    textAlign: 'center',
    paddingVertical: 10,
    letterSpacing: 1,
    backgroundColor: '#eee',
  },
});
