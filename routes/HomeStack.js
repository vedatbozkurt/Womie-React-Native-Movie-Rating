/*
* @Author: @vedatbozkurt
* @Date:   2020-05-05 04:37:49
* @Last Modified by:   @vedatbozkurt
* @Last Modified time: 2020-05-11 02:10:28
*/
import React, { Component } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '../screens/Home';
import DetailsScreen from '../screens/Details';
import ProfileScreen from '../screens/Profile';
import ToplistScreen from '../screens/Toplist';
import LoginScreen from '../screens/Login';
import RegisterScreen from '../screens/Register';
import ContactScreen from '../screens/Contact';
import EmptyScreen from '../screens/Empty';
import {observer} from 'mobx-react';
import LoginStore from '../store/LoginStore';

const HomeStack = createStackNavigator();

@observer
export default class HomeStackScreen  extends Component  {

  render() {
    return (
    <HomeStack.Navigator screenOptions={{ headerShown: false }}>
    <HomeStack.Screen name="Home" component={HomeScreen} />
    <HomeStack.Screen name="Details" component={DetailsScreen} />
    <HomeStack.Screen name="Contact" component={ContactScreen} />
    <HomeStack.Screen name="Empty" component={EmptyScreen} />
    {LoginStore.token !== null ? (
    <>
    <HomeStack.Screen name="Profile" component={ProfileScreen} />
    <HomeStack.Screen name="Toplist" component={ToplistScreen} />
    </>
    ) : (
    <>
    <HomeStack.Screen name="Login" component={LoginScreen} />
    <HomeStack.Screen name="Register" component={RegisterScreen} />
    </>
    )}
    </HomeStack.Navigator>
    );
}
}
