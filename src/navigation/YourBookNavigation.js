import React, { useState, useEffect, useContext, useMemo, useReducer } from 'react';
import { createStackNavigator } from '@react-navigation/stack';


import ListPostYouBookScreen from '../screens/ListPostYouBook';
import PostYouBookDetail from '../screens/PostYouBookDetail';
//TAB tin bạn đặt
const ListPostYouBookStack = createStackNavigator();
export default function ListPostYouBookStackScreen({ navigation }) {
    const [is_login, set_islogin] = useState(false)
    useEffect(() => {
        get_infor()
    }, [])

    const get_infor = async () => {
        try {
            const value_token = await AsyncStorage.getItem('user')
            if (value_token) {
                get_account_infor(value_token).then(res => {
                    if (res.success == false) {
                        set_islogin(false)
                    }
                    if (res.success == true) {
                        set_islogin(true)
                    }
                })
            }
        } catch (err) {
            console.log(err)
        }
    }
    return (
        <ListPostYouBookStack.Navigator
            initialRouteName='ListPostYouBookScreen'
            screenOptions={{
                headerStyle: {
                    backgroundColor: '#009387',
                },
                headerTintColor: '#fff',
                headerTitleStyle: {
                    fontWeight: 'bold',
                },
            }}>
            <ListPostYouBookStack.Screen
                name="ListPostYouBookScreen"
                component={ListPostYouBookScreen}
                options={{
                    title: 'Overview',
                    headerShown: false,
                }}
            />
            <ListPostYouBookStack.Screen
                name="PostYouBookDetails"
                component={PostYouBookDetail}
                options={{
                    headerTintColor: '#333',
                    title: 'Chi tiết phòng',
                    headerStyle: {
                        backgroundColor: '#fff',
                    },
                }}
            />
        </ListPostYouBookStack.Navigator>
    )
}