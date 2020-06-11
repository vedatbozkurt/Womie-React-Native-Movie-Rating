/*
* @Author: @vedatbozkurt
* @Date:   2020-05-08 18:37:36
* @Last Modified by:   @vedatbozkurt
* @Last Modified time: 2020-05-08 19:57:28
*/
import React, {Component} from 'react';
import { Text, View, StyleSheet,ScrollView } from 'react-native';
import { Button, Appbar, TextInput, Snackbar, HelperText} from 'react-native-paper';
import {observer} from 'mobx-react';
import LoginStore from '../store/LoginStore';

@observer
class RegisterScreen extends Component {
    componentDidMount(){
        LoginStore.errors = '';
        LoginStore.email = '';
        LoginStore.password = '';
        LoginStore.name = '';
        LoginStore.password_confirmation = '';
    }
  render() {
     return (
        <View style={{ flex: 1, alignItems: 'stretch', backgroundColor: '#F5FCFF'}}>
        <Appbar.Header>
        <Appbar.BackAction onPress={() => this.props.navigation.goBack()} />
        <Appbar.Content
        title="Register"
        subtitle="See your favorite movies"
        />
        </Appbar.Header>
        <ScrollView>
        <TextInput style = {styles.input}
        label = "Name"
        mode = "outlined"
        onChangeText={text => LoginStore.handleName(text)}
        autoCapitalize = "none"/>

        {LoginStore.errors.name && <HelperText type="error" visible style={styles.helper}>
            {LoginStore.errors.name}
        </HelperText>}

        <TextInput style = {styles.input}
        label = "Email"
        mode = "outlined"
        keyboardType = "email-address"
        onChangeText={text => LoginStore.handleEmail(text)}
        autoCapitalize = "none"/>
        {LoginStore.errors.email && <HelperText type="error" visible style={styles.helper}>
            {LoginStore.errors.email}
        </HelperText>}

        <TextInput style = {styles.input}
        label = "Password"
        mode = "outlined"
        autoCapitalize = "none"
        onChangeText={text => LoginStore.handlePassword(text)}
        secureTextEntry={true} />
        {LoginStore.errors.password && <HelperText type="error" style={styles.helper}>
            {LoginStore.errors.password}
        </HelperText>}

        <TextInput style = {styles.input}
        label = "Password Confirmation"
        mode = "outlined"
        autoCapitalize = "none"
        onChangeText={text => LoginStore.handlePasswordC(text)}
        secureTextEntry={true} />
        
        <View style={{ flex: 1,  alignItems: 'center' }}>
        <View style={{ flexDirection:"row" }}>
        <View style = {styles.button}>
        <Button icon="account-plus" loading={LoginStore.loading} mode="contained" onPress={() => LoginStore.register()}>Register</Button>
        </View>
        <View style = {styles.button}>
        <Button icon="account-check" mode="contained" onPress={() => this.props.navigation.navigate('Login')}>Login</Button>
        </View>
        </View>
        <Button icon="login">Forgot Password</Button>
        </View>
        </ScrollView>
        </View>
        );
 }
}

export default RegisterScreen;
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
helper: {
  marginLeft: 5,
},
});
