/*
* @Author: @vedatbozkurt
* @Date:   2020-05-05 04:30:12
* @Last Modified by:   @vedatbozkurt
* @Last Modified time: 2020-05-06 19:18:53
*/
import React, {Component} from 'react';
import { Text, View, StyleSheet,ScrollView } from 'react-native';
import { Button, Appbar, TextInput, Snackbar, HelperText, ActivityIndicator} from 'react-native-paper';
import {observer} from 'mobx-react';
import LoginStore from '../store/LoginStore';

@observer
class ProfileScreen extends Component {
    componentDidMount(){
        LoginStore.getUser();
    }
    render() {
       return (
        <View style={{ flex: 1, alignItems: 'stretch', backgroundColor: '#F5FCFF'}}>
        <Appbar.Header>
        <Appbar.BackAction
        onPress={() => this.props.navigation.goBack()}
        />
        <Appbar.Content
        title="Profile"
        subtitle="Edit Profile"
        />
        </Appbar.Header>

        <ScrollView>
        <TextInput style = {styles.input}
        value = {LoginStore.name}
        label = "Name"
        mode = "outlined"
        onChangeText={text => LoginStore.handleName(text)}
        autoCapitalize = "none"/>

        {LoginStore.errors.name && <HelperText type="error" visible style={styles.helper}>
            {LoginStore.errors.name}
        </HelperText>}

        <TextInput style = {styles.input}
        label = "Email"
        value = {LoginStore.email}
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
        
        <View style={{ flex: 1,  alignItems: 'center',margin: 15 }}>
        <Button icon="account-plus" loading={LoginStore.loading} mode="contained" onPress={() => LoginStore.updateProfile()}>Update Profile</Button>
        </View>
        </ScrollView>

        <Snackbar visible={LoginStore.updateProfileSnackbar} onDismiss={() => LoginStore.onDismissUpdateProfileSnackbar()}
    duration = {2000} action={{label: 'Hide',onPress: () => {LoginStore.onDismissUpdateProfileSnackbar()}}}>
    You've successfully updated profile.</Snackbar>
        </View>
        );
   }
}

export default ProfileScreen;

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
helper: {
  marginLeft: 5,
},
});