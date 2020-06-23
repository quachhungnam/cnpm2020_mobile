
import React, { useState, useEffect, useContext, useMemo, useReducer } from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import Login from '../screens/Login';
import Signup from '../screens/Signup';


const SignStack = createStackNavigator()
export default function SignInSignupStack(props) {
  return (
    < SignStack.Navigator >
      <SignStack.Screen
        name="SignIn"
        component={Login}
        options={{
          title: 'Đăng nhập',
          headerShown: false,
        }}
      />
      <SignStack.Screen
        name="SignUp"
        component={Signup}
        options={{
          title: 'Đăng ký',
          headerShown: false,
        }}
      />
    </SignStack.Navigator >
  )
}