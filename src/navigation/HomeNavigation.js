import React, { useState, useEffect, useContext, useMemo, useReducer } from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import HomeScreen from '../screens/HomeScreen';
import HomeDetail from '../screens/HomeDetail';
import SearchScreen from '../screens/SearchScreen'
import ListPost from '../screens/ListPost'
import PostDetail from '../screens/PostDetail'
//TAB trang chủ
const HomeStack = createStackNavigator();
export default function HomeStackScreen({ navigation }) {
    return (
        <HomeStack.Navigator
            screenOptions={{
                headerStyle: {
                    backgroundColor: '#009387',
                },
                initialRouteName: 'Home',
                headerTintColor: '#fff',
                headerTitleStyle: {
                    fontWeight: 'bold',
                },
            }}>
            <HomeStack.Screen
                name="Home"
                // component={HomeScreen}
                component={ListPost}
                options={{
                    title: 'Overview',
                    headerShown: false,
                }}
            />
            <HomeStack.Screen
                name="SearchScreen"
                component={SearchScreen}
                options={{
                    title: 'Chi tiết phòng',
                    headerShown: false,
                }}
            />
            <HomeStack.Screen
                name="Details"
                // component={HomeDetail}
                component={PostDetail}
                options={{
                    headerTintColor: '#333',
                    title: 'Chi tiết phòng',
                    headerStyle: {
                        backgroundColor: '#fff',
                    },
                }}
            />
        </HomeStack.Navigator>
    )
}