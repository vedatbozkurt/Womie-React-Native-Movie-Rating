/*
* @Author: @vedatbozkurt
* @Date:   2020-05-11 02:08:14
* @Last Modified by:   @vedatbozkurt
* @Last Modified time: 2020-05-11 02:28:13
*/

import React, {Component} from 'react';
import { Text, View,StyleSheet,ScrollView } from 'react-native';
import { Appbar,TextInput, Button } from 'react-native-paper';

class ContactScreen extends Component {
    state = {
    visible : true,
  };

    render() {
       return (
        <View style={{ flex: 1, alignItems: 'stretch', backgroundColor: '#F5FCFF'}}>
        <Appbar.Header>
        <Appbar.BackAction
        onPress={() => this.props.navigation.goBack()}
        />
        <Appbar.Content
        title="Contact"
        subtitle="Send recommendation or review"
        />
        </Appbar.Header>
        <ScrollView>
        <TextInput style = {styles.input}
        label = "Name"
        mode = "outlined"
        autoCapitalize = "none"/>

        <TextInput style = {styles.input}
        label = "Email"
        mode = "outlined"
        keyboardType = "email-address"
        autoCapitalize = "none"/>

        <TextInput style = {styles.input}
        label = "Message"
        mode = "outlined"
        multiline = {true}
        autoCapitalize = "none"/>

        <View style = {styles.button}>
        <Button icon="send" mode="contained">Submit</Button>
        </View>
        </ScrollView>
        </View>
        );
   }
}

export default ContactScreen;
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
  marginLeft: 15,
  marginRight: 15,
  marginTop: 30,
},
helper: {
  marginLeft: 5,
},
});
