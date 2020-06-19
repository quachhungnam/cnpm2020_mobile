import React, { Component, useState, useEffect, useContext, useMemo, useReducer } from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/FontAwesome';
import HomeScreen from '../screens/HomeScreen';
import HomeDetail from '../screens/HomeDetail';
import Login from '../screens/Login';
import Signup from '../screens/Signup';
import ListYourPostScreen from '../screens/ListYourPost';
import YourPostDetail from '../screens/YourPostDetail';
import ListPostYouBookScreen from '../screens/ListPostYouBook';
import PostYouBookDetail from '../screens/PostYouBookDetail';
import AddPostScreen from '../screens/AddPostScreen';
import EditPostScreen from '../screens/EditPostScreen';
import YourAccount from '../screens/YourAccount';
import EditAvatarAccount from '../screens/EditAvatarAccount';
import EditAccountScreen from '../screens/EditAccountScreen';
import EditPasswordAccountScreen from '../screens/EditPasswordAccountScreen';
import FeedbackScreen from '../screens/Feedback';
import AddPostScreen2 from '../screens/AddPostScreen2';
import EditPostScreen2 from '../screens/EditPostScreen2';

import { createStackNavigator } from '@react-navigation/stack';
import { get_account_infor, login } from '../networking/Server'

export const AuthContext = React.createContext(null);

const Tab = createBottomTabNavigator();
const HomeStack = createStackNavigator();
const ListYourPostStack = createStackNavigator();
const ListPostYouBookStack = createStackNavigator();
const YourAccountStack = createStackNavigator();
const SignStack = createStackNavigator()
//TAB trang chủ
function HomeStackScreen({ navigation }) {
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
        component={HomeScreen}
        options={{
          title: 'Overview',
          headerShown: false,
        }}
      />
      <HomeStack.Screen
        name="Details"
        component={HomeDetail}
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
//TAB tin bạn đăng
function ListYourPostStackScreen(props) {
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
          component={ListYourPostScreen}
          options={{
            title: 'Overview',
            headerShown: false,
          }}
        />
        <ListYourPostStack.Screen
          name="YourPostDetails"
          component={YourPostDetail}
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

//TAB tin bạn đặt
function ListPostYouBookStackScreen({ navigation }) {
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

//TAB tài khoản
function YourAccountStackScreen() {
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
//dang nhap va dang ky
function SignInSignupStack(props) {
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

  React.useEffect(() => {
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
  const authContext = React.useMemo(
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
