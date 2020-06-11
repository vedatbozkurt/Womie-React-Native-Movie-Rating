/*
* @Author: @vedatbozkurt
* @Date:   2020-05-05 04:30:12
* @Last Modified by:   @vedatbozkurt
* @Last Modified time: 2020-05-13 15:13:09
*/
import React, {Component} from 'react';
import { Text, View } from 'react-native';
import { Appbar } from 'react-native-paper';
import {observer} from 'mobx-react';
import LoginStore from '../store/LoginStore';

@observer
class EmptyScreen extends Component {
    state = {
    visible : true,
  };

    render() {
       return (
        <View>
        <Appbar.Header>
        <Appbar.BackAction
        onPress={() => this.props.navigation.goBack()}
        />
        <Appbar.Content
        title="Title"
        subtitle="Subtitle"
        />
        <Appbar.Action icon="magnify" onPress={this._handleSearch} />
        <Appbar.Action icon="dots-vertical" onPress={this._handleMore} />
        <Appbar.Action icon="view-list" onPress={() => LoginStore.token == null ? alert('You have to login to see toplist!') : this.props.navigation.navigate('Toplist')} />

        </Appbar.Header>
        <Text>Deneme</Text>
        </View>
        );
   }
}

export default EmptyScreen;
