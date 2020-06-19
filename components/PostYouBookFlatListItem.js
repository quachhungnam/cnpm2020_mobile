import React, {Component} from 'react';
import {View, Text, Image, TouchableOpacity} from 'react-native';

export default class PostYouBookFlatListItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeRowKey: null,
    };
  }

  render() {
    const {item} = this.props;
    return (
      <>
        <TouchableOpacity
          style={{backgroundColor: 'white'}}
          onPress={() => {
            this.props.navigation.navigate('PostYouBookDetails', {
              id: item.post_id._id,
            });
          }}>
          <View
            style={{
              flex: 1,
              backgroundColor: 'none',
              color: 'black',
              flexDirection: 'row',
              paddingBottom: 5,
              borderBottomColor: 'white',
              borderBottomWidth: 2,
            }}>
            <Image
              //   source={{
              //     uri: this.props.item.imageUrl,
              //   }}
              source={require('../images/room.jpg')}
              style={{
                width: 100,
                height: 100,
                margin: 10,
                borderRadius: 5,
              }}
            />
            <View
              style={{
                flex: 1,
                flexDirection: 'column',
                borderBottomWidth: 1,
                borderBottomColor: 'silver',
                marginRight: 10,
              }}>
              <Text
                style={{
                  paddingTop: 8,
                  color: 'gray',
                  textTransform: 'uppercase',
                  fontSize: 12,
                }}>
                {item.post_id.post_type_id.name}
              </Text>
              <Text
                style={{
                  paddingTop: 5,
                  fontWeight: 'bold',
                  fontSize: 18,
                  color: 'black',
                  fontSize: 15,
                }}>
                {item.post_id.title}
              </Text>
              <Text
                style={{
                  paddingTop: 5,
                  color: '#e88a59',
                  fontSize: 13,
                }}>
                {`Giá: ${item.post_id.price} VND / tháng`}
              </Text>
              <Text
                style={{
                  paddingTop: 5,
                  paddingBottom: 12,
                  color: 'black',
                  fontSize: 13,
                }}>
                {`${item.post_id.district_id.name_with_type}, ${
                  item.post_id.province_id.name_with_type
                }`}
              </Text>
            </View>
          </View>
        </TouchableOpacity>
      </>
    );
  }
}
