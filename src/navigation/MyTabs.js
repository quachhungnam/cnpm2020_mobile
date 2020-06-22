import React, { useEffect, useMemo, useReducer } from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/FontAwesome'
import { get_account_infor, login } from '../api/account_api'


import HomeStackScreen from './HomeNavigation'
import ListYourPostStackScreen from './YourPostNavigation'
import ListPostYouBookStackScreen from './YourBookNavigation'
import YourAccountStackScreen from './AccountNavigation'
import SignInSignupStack from './SignUpInNavigation'


export const AuthContext = React.createContext(null);
const Tab = createBottomTabNavigator();
export default function MyTabs() {
  const [state, dispatch] = useReducer(
    (prevState, action) => {
      switch (action.type) {
        case 'RESTORE_TOKEN':
          return {
            ...prevState,
            userToken: action.token,
            isLoading: false,
          };
        case 'SIGN_IN':
          return {
            ...prevState,
            isSignout: false,

            userToken: action.token,
          };
        case 'SIGN_OUT':
          return {
            ...prevState,
            isSignout: true,
            userToken: null,

          };
      }
    },
    {
      isLoading: true,
      isSignout: false,
      userToken: null,

    }
  );

  const check_token = async () => {
    let user_token
    try {
      user_token = await AsyncStorage.getItem('user')
      if (user_token) {
        const res = await get_account_infor(user_token)
        if (res.success == true) {
          dispatch({ type: 'RESTORE_TOKEN', token: user_token });
        } else {
          user_token = null
          await AsyncStorage.removeItem('user')
        }
      }
    } catch (e) {
      console.log(e)
    }
  }

  useEffect(() => {
    //khi khoi dong app len thi goi ham checktoken 1 lan
    check_token()
  }, []);

  //xu ly dang nhap
  const process_sigin = async (account) => {
    try {
      const res = await login(account)
      if (res.success == true) {
        // alert('dang nhap thanh cong')
        await AsyncStorage.setItem('user', res.token)
        dispatch({ type: 'SIGN_IN', token: res.token })
      } else {
        alert('Sai tai khoan hoac mat khau')
      }
    } catch (e) {
      console.log(e)
    }
  }

  //xu ly dang xuat
  const process_signout = async () => {
    try {
      await AsyncStorage.removeItem('user')
      dispatch({ type: 'SIGN_OUT' })
    } catch (err) {
      console.log(err);
    }
  }

  //khai khoi tao gia tri context
  const authContext = useMemo(
    () => ({
      signIn: process_sigin,
      signOut: process_signout,
      token: state.userToken,
    }), [state.userToken]);

  return (
    <AuthContext.Provider value={authContext}>
      {/* gui bien value xuong tat cac component con */}
      <Tab.Navigator
        style={{ marginBottom: 0 }}
        initialRouteName="Home"
        activeColor="#e91e63"
        style={{ backgroundColor: 'tomato' }}>
        <Tab.Screen
          name="Home"
          component={HomeStackScreen}
          options={{
            //tabBarLabel: 'Home',
            tabBarIcon: ({ color }) => (
              <Icon name="home" size={20} color="#e88a59" />
            ),
          }}
        />
        {state.userToken == null ? (
          <>
            <Tab.Screen
              name="Author"
              component={SignInSignupStack}
              options={{
                title: 'Tài khoản',
                headerShown: false,
                tabBarIcon: ({ color }) => (
                  <Icon name="user" size={20} color="#e88a59" />
                ),
              }}
            />
          </>
        ) : (
            <>
              <Tab.Screen
                name="Tin bạn đăng"
                component={ListYourPostStackScreen}
                options={{
                  //tabBarLabel: 'Updates',
                  tabBarIcon: ({ color }) => (
                    <Icon name="newspaper-o" size={20} color="#e88a59" />
                  ),
                }}
              />
              <Tab.Screen
                name="Tin bạn đặt"
                component={ListPostYouBookStackScreen}
                options={{
                  tabBarIcon: ({ color }) => (
                    <Icon name="inbox" size={20} color="#e88a59" />
                  ),
                }}
              />
              <Tab.Screen
                name="Tài khoản"
                component={YourAccountStackScreen}
                options={{
                  tabBarIcon: ({ color }) => (
                    <Icon name="user" size={20} color="#e88a59" />
                  ),
                }}
              />
            </>
          )}
      </Tab.Navigator>
    </AuthContext.Provider >
  );
}
