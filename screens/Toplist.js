/*
* @Author: @vedatbozkurt
* @Date:   2020-05-05 04:30:12
* @Last Modified by:   @vedatbozkurt
* @Last Modified time: 2020-05-13 16:50:48
*/
import React, {Component} from 'react';
import { Text, View, StyleSheet,ImageBackground,FlatList } from 'react-native';
import { Button, Appbar, ActivityIndicator,List,Avatar, Card, IconButton } from 'react-native-paper';
import {observer} from 'mobx-react';
import ToplistStore from '../store/ToplistStore';
import FadeInView from '../components/Animation';


@observer
class ToplistScreen extends Component {
componentDidMount(){
    ToplistStore.getMovies();
  }
    render() {
     return (
        <View style={{ flex: 1, alignItems: 'stretch', backgroundColor: '#F5FCFF'}}>
        <Appbar.Header>
        <Appbar.BackAction
        onPress={() => this.props.navigation.goBack()}
        />
        <Appbar.Content
        title="Movies Toplist"
        subtitle="Best Movies"
        />
        </Appbar.Header>
        <View>
        <FlatList
      data={ToplistStore.movies}
      ListEmptyComponent=<View style={{flex: 1}}><Text>oops! Theres no data here!</Text></View>
      keyExtractor={(item, index) => index.toString()}
      onEndReached={() => ToplistStore.getMovies()}
      onEndReachedThreshold={0.5}
      renderItem={({item, index, separators}) => (
        <Card.Title
    title={item.name}
    subtitle={item.year}
    left={(props) => <Avatar.Image{...props} size={50} source={{ uri: 'https://wedat.org/lavu/test/public/images/banner/' +item.banner }} />}
    right={(props) => <View style={{justifyContent: 'center',alignItems: 'center',flexDirection: 'row',flex: 1}} {...props}>{<Text></Text>}<Button icon="pulse" > % {Math.round(((item.vote)/(item.view))*100)} </Button></View>}
  />
        )}
      ListFooterComponent={ToplistStore.fetching_from_server ? (<ActivityIndicator color="black" style={{ margin: 15 }} />) : null}
      />
        </View>
        </View>
        );
 }
}

export default ToplistScreen;
const styles = StyleSheet.create({
    background: {
      flex: 1,
      resizeMode: "cover",
      justifyContent: "center"
    },
  });
