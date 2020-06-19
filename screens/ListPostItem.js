import React, { Component } from 'react';
import { View, Text, Image, TouchableOpacity, } from 'react-native';


function ListPostItem() {
    return (
        <>
            <TouchableOpacity
                style={{ backgroundColor: 'white' }}
                onPress={() => {
                    this.props.navigation.navigate('Details', {
                        id: item._id,
                        statusCode: item.status_id.code,
                    });
                }}>
                <View
                    style={styles.view_out}>
                    <Image
                        source={require('../images/room.jpg')}
                        style={styles.view_image}
                    />
                    <View
                        style={styles.view_out2}>
                        <Text
                            style={styles.txt_name}>
                            {item.post_type_id.name}
                        </Text>
                        <Text
                            style={styles.txt_title}>
                            {item.title}
                        </Text>
                        <Text
                            style={styles.txt_price}>
                            {`Giá: ${item.price} VND / tháng`}
                        </Text>
                        <Text
                            style={styles.txt_address}>
                            {`${item.district_id.name_with_type}, ${
                                item.province_id.name_with_type
                                }`}
                        </Text>
                    </View>
                </View>
            </TouchableOpacity>
        </>
    );
}

const styles = StyleSheet.create({
    txt_address: {
        paddingTop: 5,
        paddingBottom: 12,
        color: 'black',
        fontSize: 13,
    },
    txt_price: {
        paddingTop: 5,
        color: '#e88a59',
        fontSize: 13,
    },
    txt_title: {
        paddingTop: 5,
        fontWeight: 'bold',
        fontSize: 18,
        color: 'black',
        fontSize: 15,
    },
    txt_name: {
        paddingTop: 8,
        color: 'gray',
        textTransform: 'uppercase',
        fontSize: 12,
    },
    view_out2: {
        flex: 1,
        flexDirection: 'column',
        borderBottomWidth: 1,
        borderBottomColor: 'silver',
        marginRight: 10,
    },
    view_image: {
        width: 100,
        height: 100,
        margin: 10,
        borderRadius: 5,
    },
    view_out: {
        flex: 1,
        backgroundColor: 'none',
        color: 'black',
        flexDirection: 'row',
        paddingBottom: 5,
        borderBottomColor: 'white',
        borderBottomWidth: 2,
    }
})