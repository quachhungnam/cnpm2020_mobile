import React, { useState, useEffect, useContext, useMemo, useReducer } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import AsyncStorage from '@react-native-community/async-storage';

import ListPost from '../screens/ListPost'
import PostDetail from '../screens/PostDetail';
import ListYourPostScreen from '../screens/ListYourPost';
import YourPostDetail from '../screens/YourPostDetail';
import AddPostScreen from '../screens/AddPostScreen';
import AddPostScreen2 from '../screens/AddPostScreen2';
import EditPostScreen from '../screens/EditPostScreen';
import EditPostScreen2 from '../screens/EditPostScreen2';

//TAB tin bạn đăng
const ListYourPostStack = createStackNavigator();
export default function ListYourPostStackScreen(navigation) {
    // const [is_login, set_is_login] = useState(false)
    // const [current_screen, set_current_screen] = useState('SignIn')
    useEffect(() => {
        check_login()
    }, [])

    const check_login = async () => {
        try {
            const value_token = await AsyncStorage.getItem('user')
            const infor = await get_account_infor(value_token)
            if (infor.success == true) {
                set_user_infor(infor.data.account)
                set_user_token(value_token)
            }
        } catch (err) {

        }
    }

    return (
        <>
            <ListYourPostStack.Navigator
                screenOptions={{
                    headerStyle: {
                        backgroundColor: '#009387',
                    },
                    initialRouteName: 'ListYourPostScreen',
                    headerTintColor: '#fff',
                    headerTitleStyle: {
                        fontWeight: 'bold',
                    },
                }}>
                <ListYourPostStack.Screen
                    name="ListYourPostScreen"
                    // component={ListPost}
                    component={ListYourPostScreen}
                    options={{
                        title: 'Overview',
                        headerShown: false,
                    }}
                />
                <ListYourPostStack.Screen
                    name="YourPostDetails"
                    component={YourPostDetail}
                    // component={PostDetail}
                    options={{
                        title: 'Chi tiết phòng',
                        headerTintColor: '#333',
                        headerStyle: {
                            backgroundColor: '#fff',
                        },
                    }}
                />
                <ListYourPostStack.Screen
                    name="AddPostScreen"
                    component={AddPostScreen}
                    options={{
                        title: 'Thông tin mô tả',
                        headerTintColor: '#333',
                        headerStyle: {
                            backgroundColor: '#fff',
                        },
                    }}
                />
                <ListYourPostStack.Screen
                    name="AddPostScreen2"
                    component={AddPostScreen2}
                    options={{
                        title: 'Hình ảnh',
                        headerTintColor: '#333',
                        headerStyle: {
                            backgroundColor: '#fff',
                        },
                    }}
                />
                <ListYourPostStack.Screen
                    name="EditPostScreen"
                    component={EditPostScreen}
                    options={{
                        title: 'Thông tin mô tả',
                        headerTintColor: '#333',
                        headerStyle: {
                            backgroundColor: '#fff',
                        },
                    }}
                />
                <ListYourPostStack.Screen
                    name="EditPostScreen2"
                    component={EditPostScreen2}
                    options={{
                        title: 'Hình ảnh',
                        headerTintColor: '#333',
                        headerStyle: {
                            backgroundColor: '#fff',
                        },
                    }}
                />
            </ListYourPostStack.Navigator>
        </>
    );
}