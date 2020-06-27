import React, { Component } from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { your_ip } from '../api/your_ip';

export default class PostYouBookFlatListItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeRowKey: null,
    };
  }

  render() {
    const { trans } = this.props;
    console.log('hihi: ' + JSON.stringify(trans));
    return (
      <>
        <TouchableOpacity
          style={{ backgroundColor: 'white' }}
          onPress={() => {
            this.props.navigation.navigate('PostYouBookDetails', {
              id: trans.post_id._id,
              tranId: trans._id,
              post_item: trans.post_id,
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
            {trans.post_id.post_image.length === 0 && (
              <Image
                source={{
                  uri:
                    your_ip + '/uploads/home.jpg',
                }}
                style={{
                  width: 100,
                  height: 100,
                  margin: 10,
                  borderRadius: 5,
                }}
              />
            )}
            {trans.post_id.post_image[0] !== undefined && (
              <Image
                source={{
                  uri: your_ip + '/' + trans.post_id.post_image[0].path,
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
                {trans.post_id.post_type_id.name}
              </Text>
              <Text
                style={{
                  paddingTop: 5,
                  fontWeight: 'bold',
                  fontSize: 18,
                  color: 'black',
                  fontSize: 15,
                }}>
                {trans.post_id.title}
              </Text>
              <Text
                style={{
                  paddingTop: 5,
                  color: '#e88a59',
                  fontSize: 13,
                }}>
                {`Giá: ${trans.post_id.price} VND / tháng`}
              </Text>
              <Text
                style={{
                  paddingTop: 5,
                  paddingBottom: 12,
                  color: 'black',
                  fontSize: 13,
                }}>
                {`${trans.post_id.district_id.name_with_type}, ${
                  trans.post_id.province_id.name_with_type
                  }`}
              </Text>
            </View>
          </View>
        </TouchableOpacity>
      </>
    );
  }
}
