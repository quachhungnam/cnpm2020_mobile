import React, {Component} from 'react';
import {View, Text, Image, TouchableOpacity} from 'react-native';

import {your_ip} from '../api/your_ip';

export default class HomeFlatListItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeRowKey: null,
    };
  }

  render() {
    const {item} = this.props;
    console.log('img: ' + item);
    return (
      <>
        <TouchableOpacity
          style={{backgroundColor: 'white'}}
          onPress={() => {
            this.props.navigation.navigate('Details', {
              id: item._id,
              statusCode: item.status_id.code,
              post_item: item,
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
            {item.post_image[0] === undefined && (
              <Image
                source={require('../assets/images/room.jpg')}
                style={{
                  width: 100,
                  height: 100,
                  margin: 10,
                  borderRadius: 5,
                }}
              />
            )}
            {item.post_image[0] !== undefined && (
              <Image
                source={{
                  uri: your_ip + ':3000/' + item.post_image[0].path,
                }}
                style={{
                  width: 100,
                  height: 100,
                  margin: 10,
                  borderRadius: 5,
                }}
              />
            )}

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
                {item.post_type_id.name}
              </Text>
              <Text
                style={{
                  paddingTop: 5,
                  fontWeight: 'bold',
                  fontSize: 18,
                  color: 'black',
                  fontSize: 15,
                }}>
                {item.title}
              </Text>
              <Text
                style={{
                  paddingTop: 5,
                  color: '#e88a59',
                  fontSize: 13,
                }}>
                {`Giá: ${item.price} VND / tháng`}
              </Text>
              <Text
                style={{
                  paddingTop: 5,
                  paddingBottom: 12,
                  color: 'black',
                  fontSize: 13,
                }}>
                {`${item.address_detail}, ${item.district_id.name_with_type}, ${
                  item.province_id.name_with_type
                }`}
              </Text>
            </View>
          </View>
        </TouchableOpacity>
      </>
    );
  }
}
