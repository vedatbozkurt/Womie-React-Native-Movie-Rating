/*
* @Author: @vedatbozkurt
* @Date:   2020-05-05 04:30:12
* @Last Modified by:   @vedatbozkurt
* @Last Modified time: 2020-05-13 16:49:30
*/
import React, {Component} from 'react';
import { Text, View, ImageBackground,StyleSheet,Image } from 'react-native';
import { Appbar,Button,Banner,Badge,Dialog,Paragraph, Portal, ActivityIndicator, Colors,Snackbar  } from 'react-native-paper';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {observer} from 'mobx-react';
import MovieStore from '../store/MovieStore';
import FadeInView from '../components/Animation';


@observer
class DetailsScreen extends Component {
  componentDidMount() {
    MovieStore.getMovies();
  }
  render() {
   return (
    <View style={{ flex: 1, alignItems: 'stretch', backgroundColor: '#F5FCFF'}}>
    <Appbar.Header>
    <Appbar.BackAction onPress={() => this.props.navigation.goBack()} />
    <Appbar.Content title="Movie Rating" subtitle="Select Your Favorite Movie" />
    <Appbar.Action icon="information" onPress={() => MovieStore.showDialog()} />
    </Appbar.Header>
    {MovieStore.loading &&
      <View style={{flex:1, backgroundColor: '#00000000',justifyContent: 'center', alignItems: 'center'}}>
      <ActivityIndicator size={60} animating={true} visible={MovieStore.loading} />
      </View>
    }
    {!MovieStore.loading &&
      <View style={MovieStore.opacity1Style} onStartShouldSetResponder={() => MovieStore.rateMovie(MovieStore.movie1.id,MovieStore.movie2.id,1)}>
      <ImageBackground source={{ uri: 'https://wedat.org/lavu/test/public/images/cover/' + MovieStore.movie1.cover }} style={styles.background}>
      <FadeInView>
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', top: -20 }}>
      <Badge size={20} style={styles.badge}>
      <Ionicons size={20} name='md-pulse' color='yellow' /> {MovieStore.movie1rating}%
      </Badge>
      <Image source={{ uri: 'https://wedat.org/lavu/test/public/images/banner/' +MovieStore.movie1.banner }} style={styles.banner} />
      <Text style={styles.title}>{MovieStore.movie1.name} ({MovieStore.movie1.year})</Text>
      <Text style={styles.desc}></Text>
      </View>
      </FadeInView>
      </ImageBackground>
      </View>
    }
    {!MovieStore.loading &&
      <View style={MovieStore.opacity2Style} onStartShouldSetResponder={() => MovieStore.rateMovie(MovieStore.movie2.id,MovieStore.movie1.id,2)}>
      <ImageBackground source={{ uri: 'https://wedat.org/lavu/test/public/images/cover/' + MovieStore.movie2.cover }} style={styles.background}>
      <FadeInView>
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', top: -20  }}>
      <Badge size={20} style={styles.badge}>
      <Ionicons size={20} name='md-pulse' color='yellow' /> {MovieStore.movie2rating}%
      </Badge>
      <Image source={{ uri: 'https://wedat.org/lavu/test/public/images/banner/' +MovieStore.movie2.banner }} style={styles.banner}/>
      <Text style={styles.title}>{MovieStore.movie2.name} ({MovieStore.movie2.year})</Text>
      <Text style={styles.desc}></Text>
      </View>
      </FadeInView>
      </ImageBackground>
      </View>
    }
    <Portal>
    <Dialog
    visible={MovieStore.info}
    onDismiss={MovieStore.hideDialog}>
    <Dialog.Title>Instructions</Dialog.Title>
    <Dialog.Content>
    <Paragraph>Click only your favorite movie.</Paragraph>
    </Dialog.Content>
    <Dialog.Actions>
    <Button onPress={() => MovieStore.hideDialog()}>Done</Button>
    </Dialog.Actions>
    </Dialog>
    </Portal>
    <Snackbar visible={MovieStore.snackbar}
    onDismiss={() => MovieStore.onDismissSnackBar()}
    duration = {2000}
    action={{
            label: 'Hide',
            onPress: () => {
              MovieStore.onDismissSnackBar()
            },
          }}>
    You've successfully voted. New movies loading...
    </Snackbar>
    </View>
    );
 }
}

export default DetailsScreen;
const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center"
  },
  banner:  {
    width: 108,
    height: 156
  },
  title: {
    color: 'rgba(255, 255, 255, 0.9)',
    fontSize: 16,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    borderRadius:6
  },
  desc: {
    fontSize: 13,
    color: 'rgba(255, 255, 255, 0.9)',
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    borderRadius:6
  },
  badge: {
    top: 22,
    right: 0,
    backgroundColor: '#000',
    fontSize: 15,
  }
});
