import React, { useState, useEffect, useContext, useMemo, useReducer } from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import YourAccount from '../screens/YourAccount';
import EditAvatarAccount from '../screens/EditAvatarAccount';
import EditAccountScreen from '../screens/EditAccountScreen';
import EditPasswordAccountScreen from '../screens/EditPasswordAccountScreen';
import FeedbackScreen from '../screens/Feedback';

//TAB tài khoản
const YourAccountStack = createStackNavigator();
export default function YourAccountStackScreen() {
    return (
      <YourAccountStack.Navigator
        initialRouteName='YourAccountScreen'
        screenOptions={{
          headerStyle: {
            backgroundColor: '#009387',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}>
        <YourAccountStack.Screen
          name="YourAccountScreen"
          component={YourAccount}
          options={{
            title: 'Overview',
            headerShown: false,
          }}
        />
        <YourAccountStack.Screen
          name="EditAvatarAccount"
          component={EditAvatarAccount}
          options={{
            headerTintColor: '#333',
            title: 'Chỉnh sửa ảnh đại diện',
            headerStyle: {
              backgroundColor: '#fff',
            },
          }}
        />
        <YourAccountStack.Screen
          name="EditPasswordAccountScreen"
          component={EditPasswordAccountScreen}
          options={{
            headerTintColor: '#333',
            title: 'Chỉnh sửa mật khẩu',
            headerStyle: {
              backgroundColor: '#fff',
            },
          }}
        />
        <YourAccountStack.Screen
          name="EditAccountScreen"
          component={EditAccountScreen}
          options={{
            headerTintColor: '#333',
            title: 'Chỉnh sửa tài khoản',
            headerStyle: {
              backgroundColor: '#fff',
            },
          }}
        />
        <YourAccountStack.Screen
          name="FeedbackScreen"
          component={FeedbackScreen}
          options={{
            headerTintColor: '#333',
            title: 'Phản hồi cho quản trị viên',
            headerStyle: {
              backgroundColor: '#fff',
            },
          }}
        />
  
      </YourAccountStack.Navigator>
    );
  }