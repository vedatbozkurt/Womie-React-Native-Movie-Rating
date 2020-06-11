/*
* @Author: @vedatbozkurt
* @Date:   2020-05-05 04:29:34
* @Last Modified by:   @vedatbozkurt
* @Last Modified time: 2020-05-11 02:12:41
*/
import React, {Component} from 'react';
import { Text, View, StyleSheet,ImageBackground,Linking} from 'react-native';
import { Button, Appbar, Snackbar,Menu,Divider } from 'react-native-paper';
import {observer} from 'mobx-react';
import LoginStore from '../store/LoginStore';

@observer
class HomeScreen extends Component {

  render() {
const MORE_ICON = Platform.OS === 'ios' ? 'dots-horizontal' : 'dots-vertical';

   return (
    <View style={{ flex: 1, alignItems: 'stretch', backgroundColor: '#F5FCFF'}}>
    <Appbar.Header>
    <Appbar.Action icon="play-speed"/>
    <Appbar.Content
    title="Movie Rating"
    subtitle="Efficient Movie Rating App"
    />
    <Appbar.Action icon="view-list" onPress={() => LoginStore.token == null ? alert('You have to login to see toplist!') : this.props.navigation.navigate('Toplist')} />
        <Menu
            visible={LoginStore.menu}
            onDismiss={() => LoginStore._closeMenu()}
            anchor={
                <Appbar.Action
              icon={MORE_ICON}
              color="white"
              onPress={() => LoginStore._openMenu()}
            />
            }
          >
            <Menu.Item icon="pencil" onPress={() => {this.props.navigation.navigate('Contact'); LoginStore._closeMenu();}} title="Contact" />
            <Divider />
            <Menu.Item icon="link" onPress={() => Linking.openURL("https://wedat.org")} title="Developer" />
            <Menu.Item icon="git" onPress={() => Linking.openURL("https://github.com/vedatbozkurt")} title="Projects" />
          </Menu>
    </Appbar.Header>
    <ImageBackground source={require('./../assets/5.jpg')} style={styles.background}>
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
    <Button icon="star" mode="contained" onPress={() => this.props.navigation.navigate('Details')}>Rate Now</Button>
    {LoginStore.token === null && <Button style={{top:10}} icon="login" mode="contained" onPress={() => this.props.navigation.navigate('Login')}>
    Login
    </Button>}
    {LoginStore.token !== null && <View><Button style={{top:20}} icon="account-edit" mode="contained" onPress={() => this.props.navigation.navigate('Profile')}>
    Profile
    </Button>
    <Button style={{top: 30}} icon="login" mode="contained" color="black" onPress={() => LoginStore.logOut()}>Logout</Button>

    </View>}
    </View>
    </ImageBackground>

    <Snackbar visible={LoginStore.loginSnackbar} onDismiss={() => LoginStore.onDismissLoginSnackbar()}
    duration = {2000} action={{ label: 'Hide', onPress: () => {LoginStore.onDismissLoginSnackbar()}}}>
    You've successfully logged in.</Snackbar>

    <Snackbar visible={LoginStore.logutSnackbar} onDismiss={() => LoginStore.onDismissLogutSnackbar()}
    duration = {2000} action={{label: 'Hide',onPress: () => {LoginStore.onDismissLogutSnackbar()}}}>
    You've successfully logged out.</Snackbar>

    <Snackbar visible={LoginStore.registerSnackbar} onDismiss={() => LoginStore.onDismissRegisterSnackbar()}
    duration = {2000} action={{label: 'Hide',onPress: () => {LoginStore.onDismissRegisterSnackbar()}}}>
    You've successfully registered.</Snackbar>

    </View>
    );
 }
}

export default HomeScreen;
const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center"
  },
});
