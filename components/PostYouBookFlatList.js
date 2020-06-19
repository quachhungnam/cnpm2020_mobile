import React, {Component} from 'react';
import {FlatList, View, Text, StyleSheet, RefreshControl} from 'react-native';
import PostYouBookFlatListItem from './PostYouBookFlatListItem';
import {getTransactions} from '../networking/Server';
// import Snackbar from 'react-native-snackbar';
// import Button from 'react-native-button';
// import AddModal from './AddModal';
// import EditModal from './EditModal';

const styles = StyleSheet.create({});

export default class PostYouBookFlatList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      deleted1: true,
      refreshing: false,
      transactions: [],
    };
    //this.add = this.add.bind(this);
  }

  componentDidMount() {
    this.refreshDataFromServer();
  }

  refreshDataFromServer = () => {
    this.setState({refreshing: true});
    getTransactions()
      .then(trans => {
        this.setState({
          transactions: trans.filter(
            item => item.client_id._id === this.props.account._id,
          ),
        });
        this.setState({refreshing: false});
      })
      .catch(error => {
        this.setState({
          transactions: [],
        });
        this.setState({refreshing: false});
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
            data={this.state.transactions}
            renderItem={({item, index}) => {
              return (
                <PostYouBookFlatListItem
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
