import React, {Component} from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import {Text} from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/FontAwesome';
import HomeScreen from './HomeScreen';
import ListScreen from './ListScreen';
import DetailsScreen from './Details';
import SignInScreen from './SignInScreen';
import SignUpScreen from './SignUpScreen';
import ListYourPostScreen from './ListYourPost';
import Details2Screen from './Details2';
import ListPostYouBookScreen from './ListPostYouBook';
import Details3Screen from './Details3';
import AddPostScreen from './AddPostScreen';
import EditPostScreen from './EditPostScreen';
import YourAccountScreen from './YourAccount';
import EditAccountScreen from './EditAccountScreen';
import EditPasswordAccountScreen from './EditPasswordAccountScreen';
import FeedbackScreen from './Feedback';
import AddPostScreen2 from './AddPostScreen2';
import EditPostScreen2 from './EditPostScreen2';

import { createStackNavigator } from '@react-navigation/stack';
const Tab = createBottomTabNavigator();



const HomeStack = createStackNavigator();
const ListYourPostStack = createStackNavigator();
const ListPostYouBookStack = createStackNavigator();
const YourAccountStack = createStackNavigator();

const HomeStackScreen = ({navigation}) => (
    <HomeStack.Navigator screenOptions={{
        headerStyle: {
            backgroundColor: '#009387',
        },
        initialRouteName: 'Home',
        headerTintColor: '#fff',
        headerTitleStyle: {
            fontWeight: 'bold'
        }
    }}>
        <HomeStack.Screen name="Home" component={HomeScreen} options={{
            title:'Overview',
            headerShown:false
        }} />
        <HomeStack.Screen name="Details" component={DetailsScreen} options={{
            title:'Chi tiết phòng'
        }} />
        <HomeStack.Screen name="SignIn" component={SignInScreen} options={{
            title:'Chi tiết phòng',
            headerShown:false
        }} />
        <HomeStack.Screen name="SignUp" component={SignUpScreen} options={{
            title:'Chi tiết phòng',
            headerShown:false
        }} />
    </HomeStack.Navigator>
);

class ListYourPostStackScreen extends Component {
    constructor(props) {
        super(props);
        this.state= {
            isLogged: false,
            user: null
        }
        
    }
    componentWillMount() {
        this.retrieveData();
    }
    retrieveData = async () => {
        try {
            const value = await AsyncStorage.getItem('user');
            console.log("try");
            console.log(value);
            if(value != null) {
                console.log("ngu");
                this.setState({isLogged: true, user: value});
            } else {
                console.log("ad");
                this.setState({isLogged: false, user: null});
            }
            
        } catch (error) {
            console.log("catch");
            return null;
        }
    };
    render() {
        const {isLogged} = this.state;
        if(isLogged === true) {
            return (
                <>
                <ListYourPostStack.Navigator screenOptions={{
                    headerStyle: {
                        backgroundColor: '#009387',
                    },
                    initialRouteName: 'ListYourPostScreen',
                    headerTintColor: '#fff',
                    headerTitleStyle: {
                        fontWeight: 'bold'
                    }
                }}>
                    <ListYourPostStack.Screen name="ListYourPostScreen" component={ListYourPostScreen} options={{
                        title:'Overview',
                        headerShown:false
                    }} />
                    <ListYourPostStack.Screen name="Details" component={Details2Screen} options={{
                    title:'Chi tiết phòng'
                    }} />
                    <ListYourPostStack.Screen name="AddPostScreen" component={AddPostScreen} options={{
                    title:'Thêm bài đăng'
                    }} />
                    <ListYourPostStack.Screen name="AddPostScreen2" component={AddPostScreen2} options={{
                    title:'Thêm hỉnh ảnh'
                    }} />
                    <ListYourPostStack.Screen name="EditPostScreen" component={EditPostScreen} options={{
                        title:'Sửa bài đăng',
                    }} />
                    <ListYourPostStack.Screen name="EditPostScreen2" component={EditPostScreen2} options={{
                        title:'Sửa ảnh',
                    }} />
                </ListYourPostStack.Navigator>
                </>

            )
        }else {
            return (
                <>
                <ListYourPostStack.Navigator screenOptions={{
                    headerStyle: {
                        backgroundColor: '#009387',
                    },
                    initialRouteName: 'SignIn',
                    headerTintColor: '#fff',
                    headerTitleStyle: {
                        fontWeight: 'bold'
                    }
                }}>
                    <ListYourPostStack.Screen name="SignIn" component={SignInScreen} options={{
                        title:'Chi tiết phòng',
                        headerShown:false
                    }} />
                    <ListYourPostStack.Screen name="SignUp" component={SignUpScreen} options={{
                        title:'Chi tiết phòng',
                        headerShown:false
                    }} />
                    
                </ListYourPostStack.Navigator>
                </>
            )
        }
        
    }

        
};




const ListPostYouBookStackScreen = ({navigation}) => (
    <ListPostYouBookStack.Navigator screenOptions={{
        headerStyle: {
            backgroundColor: '#009387',
        },
        initialRouteName: 'Home',
        headerTintColor: '#fff',
        headerTitleStyle: {
            fontWeight: 'bold'
        }
    }}>
        <ListPostYouBookStack.Screen name="ListPostYouBookScreen" component={ListPostYouBookScreen} options={{
            title:'Overview',
            headerShown:false
        }} />
        <ListPostYouBookStack.Screen name="Details" component={Details3Screen} options={{
            title:'Chi tiết phòng',
        }} />
        <ListPostYouBookStack.Screen name="SignIn" component={SignInScreen} options={{
            title:'Chi tiết phòng',
            headerShown:false
        }} />
        <ListPostYouBookStack.Screen name="SignUp" component={SignUpScreen} options={{
            title:'Chi tiết phòng',
            headerShown:false
        }} />
    </ListPostYouBookStack.Navigator>
);

const YourAccountStackScreen = ({navigation}) => (
    <YourAccountStack.Navigator screenOptions={{
        headerStyle: {
            backgroundColor: '#009387',
        },
        initialRouteName: 'SignIn',
        headerTintColor: '#fff',
        headerTitleStyle: {
            fontWeight: 'bold'
        }
    }}>     
        <YourAccountStack.Screen name="YourAccountScreen" component={YourAccountScreen} options={{
            title:'Overview',
            headerShown:false
        }} />
        <YourAccountStack.Screen name="EditPasswordAccountScreen" component={EditPasswordAccountScreen} options={{
            title:'Đổi mật khẩu',
        }} />
        <YourAccountStack.Screen name="EditAccountScreen" component={EditAccountScreen} options={{
            title:'Sửa thông tin cá nhân',
        }} />
        <YourAccountStack.Screen name="FeedbackScreen" component={FeedbackScreen} options={{
            title:'Phản hồi cho quản trị viên',
        }} />
        <ListPostYouBookStack.Screen name="SignIn" component={SignInScreen} options={{
            title:'Chi tiết phòng',
            headerShown:false
        }} />
        <ListPostYouBookStack.Screen name="SignUp" component={SignUpScreen} options={{
            title:'Chi tiết phòng',
            headerShown:false
        }} />
    </YourAccountStack.Navigator>
);

export default class MyTabs extends Component {
    render() {
        return (
            <Tab.Navigator
            style={{marginBottom: 0}}
            initialRouteName="Home"
            activeColor="#e91e63"
            style={{ backgroundColor: 'tomato' }}
            >
                <Tab.Screen name="Home" component={HomeStackScreen} 
                    options={{
                        //tabBarLabel: 'Home',
                        tabBarIcon: ({ color }) => (
                            <Icon name="home" size={20} color="red" />
                        ),
                    }}
                />
                <Tab.Screen name="Post của bạn" component={ListYourPostStackScreen}
                    options={{
                        //tabBarLabel: 'Updates',
                        tabBarIcon: ({ color }) => (
                            <Icon name="newspaper-o" size={20} color="red" />
                        ),
                    }}
                />
                <Tab.Screen name="Phòng bạn đặt" component={ListPostYouBookStackScreen}
                    options={{
                        //tabBarLabel: 'Updates',
                        tabBarIcon: ({ color }) => (
                            <Icon name="inbox" size={20} color="red" />
                        ),
                    }}
                />
                <Tab.Screen name="Tài khoản" component={YourAccountStackScreen}
                    options={{
                        //tabBarLabel: 'Updates',
                        tabBarIcon: ({ color }) => (
                            <Icon name="user" size={20} color="red" />
                        ),
                    }}
                />
            </Tab.Navigator>
        )
    
    }
}