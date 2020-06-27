import React, { useState, useEffect } from 'react';
import {

    TextInput,
    Text,
    View,
    StyleSheet,
    FlatList,
    SafeAreaView,
    TouchableHighlight,
    RefreshControl,
} from 'react-native';

import PostItem from './PostItem';
import { searchByAddress } from '../api/post_api';


function wait(timeout) {
    return new Promise(resolve => {
        setTimeout(resolve, timeout);
    });
}

function Header_List(props) {
    const [input_address, set_input_adress] = useState('')

    useEffect(() => {

    }, []);


    const action_search = () => {
        props.search_address(input_address)
    }

    return (
        <View style={{ flex: 1, flexDirection: 'column' }}>
            <Text style={{
                fontSize: 18,
                textAlign: 'center',
                paddingVertical: 10,
                letterSpacing: 1,
                backgroundColor: '#eee',
            }}>
                Tìm theo tên đường
        </Text>
            <View style={{ flex: 1, flexDirection: 'column', paddingHorizontal: 10 }}>
                <TextInput

                    style={styles.InputSearch}
                    autoFocus={true}
                    returnKeyType="go"
                    autoCorrect={false}
                    placeholder="Nhập tên đường, số nhà"
                    placeholderTextColor="gray"

                    onChangeText={text => { set_input_adress(text) }}
                />
                <TouchableHighlight
                    style={styles.buttonSearch}
                    onPress={() => { action_search() }}
                >
                    <Text style={{ textAlign: 'center', color: '#333', fontSize: 16 }}>
                        Tìm kiếm
            </Text>
                </TouchableHighlight>
            </View>
        </View>

    );
}

export default function Search(props) {
    const { condition } = props.route.params
    const [arr_post, set_arr_post] = useState([]);
    const [add, set_add] = useState('')


    useEffect(() => {
    }, []);

    const search_address = async (address) => {
        try {
            const res = await searchByAddress(address);
            if (res.error) {
                //alert('null');
                return;
            } else {
                const all_post = res.post
                const post_filter = all_post.filter(
                    item => (item.status_id.code === 1 || item.status_id.code === 2)
                        && (condition.province_code != -1
                            ? item.province_id.code == condition.province_code
                            : 1)
                        && (condition.district_code != -1
                            ? item.district_id.code == condition.district_code
                            : 1)
                        && (condition.post_type_id != -1
                            ? item.post_type_id._id == condition.post_type_id
                            : 1)
                )
                set_arr_post(post_filter);

            }
        } catch (ex) {
            console.log(ex);
        }
    };


    return (
        <SafeAreaView>
            <FlatList
                ListHeaderComponent={
                    <Header_List
                        navigation={props.navigation}
                        search_address={search_address}
                    />
                }
                data={arr_post}
                renderItem={({ item }) => (
                    <PostItem
                        navigation={props.navigation}
                        post={item}
                    />
                )}
                keyExtractor={item => item._id}
                extraData={arr_post}
            />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    picker_pro_dis: {
        fontSize: 8,
        flex: 1,
        alignItems: 'center',
    },
    buttonSearch: {
        backgroundColor: '#ffceb5',
        paddingVertical: 10,
        marginTop: 0,
        borderRadius: 8,
        flex: 1,
        textAlign: 'center',
    },
    InputSearch: {
        borderBottomColor: '#ccc',
        borderBottomWidth: 1,
        marginBottom: 10
    }
});
