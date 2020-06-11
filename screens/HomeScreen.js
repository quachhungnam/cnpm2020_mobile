import React, {Component} from 'react';
import {Text, View, Picker, Button, ScrollView} from 'react-native';
import Carousel from '../components/Carousel';
import {dummyData} from '../data/DataCarousel';
import HomeFlatList from '../components/HomeFlatList';
//import { Dropdown } from 'react-native-material-dropdown';
export default class HomeScreen extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={{flex: 1, flexDirection: 'column', backgroundColor: '#fff'}}>
        <Carousel data={dummyData} />
        <HomeFlatList
          navigation={this.props.navigation}
          title="Phòng trọ HOT"
        />
      </View>
    );
  }
}
