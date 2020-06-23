import React, { useEffect, useState } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';

export default function PostItem(props) {
    const post = props.post
    return (
        <TouchableOpacity
            style={{ backgroundColor: 'white' }}
            onPress={() => {
                props.navigation.navigate('Details', { post_item: post })
            }}
        >
            <View
                style={styles.view_out}>
                <Image
                    source={require('../assets/images/room.jpg')}
                    style={styles.view_image}
                />
                <View
                    style={styles.view_in}>
                    <Text
                        style={styles.txt_name}>
                        {props.post.post_type_id.name}
                    </Text>
                    <Text
                        style={styles.txt_title}>
                        {props.post.title}
                    </Text>
                    <Text
                        style={styles.txt_price}>
                        {`Giá: ${props.post.price} VND / tháng`}

                    </Text>
                    <Text
                        style={styles.txt_address}>
                        {`${props.post.address_detail}, ${props.post.district_id.name_with_type}, ${
                            props.post.province_id.name_with_type
                            }`}
                    </Text>
                </View>
            </View>
        </TouchableOpacity>

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
    view_in: {
        flex: 1,
        flexDirection: 'column',
        borderBottomWidth: 1,
        borderBottomColor: 'silver',
        marginRight: 10,
    },
    view_out: {
        flex: 1,
        // backgroundColor: 'none',
        color: 'black',
        flexDirection: 'row',
        paddingBottom: 5,
        borderBottomColor: 'white',
        borderBottomWidth: 2,
    },
    view_image: {
        width: 100,
        height: 100,
        margin: 10,
        borderRadius: 5,
    }
})