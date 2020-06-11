/*
* @Author: @vedatbozkurt
* @Date:   2020-05-08 18:37:36
* @Last Modified by:   @vedatbozkurt
* @Last Modified time: 2020-05-08 19:57:28
*/
import React, {Component} from 'react';
import { Text, View, StyleSheet,ScrollView } from 'react-native';
import { Button, Appbar, TextInput, } from 'react-native-paper';
import {observer} from 'mobx-react';
import LoginStore from '../store/LoginStore';

@observer
class LoginScreen extends Component {
    componentDidMount(){
        LoginStore.email = '';
        LoginStore.password = '';
    }
  render() {
     return (
        <View style={{ flex: 1, alignItems: 'stretch', backgroundColor: '#F5FCFF'}}>
        <Appbar.Header>
        <Appbar.BackAction onPress={() => this.props.navigation.goBack()} />
        <Appbar.Content
        title="Login"
        subtitle="See your favorite movies"
        />
        </Appbar.Header>
        <ScrollView>
        <TextInput style = {styles.input}
        label = "Email"
        mode = "outlined"
        onChangeText={text => LoginStore.handleEmail(text)}
        autoCapitalize = "none"/>

        <TextInput style = {styles.input}
        label = "Password"
        mode = "outlined"
        autoCapitalize = "none"
        onChangeText={text => LoginStore.handlePassword(text)}
        secureTextEntry={true} />
        <View style={{ flex: 1,  alignItems: 'center' }}>
        <View style={{ flexDirection:"row" }}>
        <View style = {styles.button}>
        <Button icon="account-check" loading={LoginStore.loading} mode="contained" onPress={() => LoginStore.login()}>Login</Button>
        </View>
        <View style = {styles.button}>
        <Button icon="account-plus" mode="contained" onPress={() => this.props.navigation.navigate('Register')}>Register</Button>
        </View>
        </View>
        <Button icon="login">Forgot Password</Button>
        </View>
        </ScrollView>
        </View>
        );
 }
}

export default LoginScreen;
const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center"
},
input: {
  marginLeft: 15,
  marginRight: 15,
  marginTop: 15,

},
button: {
  margin: 15,
},
});
