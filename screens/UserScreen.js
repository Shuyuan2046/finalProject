// screens/UserScreen.js

import React, { Component } from 'react';
import { StyleSheet, ScrollView, ActivityIndicator, View} from 'react-native';
import { ListItem } from 'react-native-elements'
import firebase from '../database/firebaseDb';

class UserScreen extends Component {

  constructor() {
    super();
    this.firestoreRef = firebase.firestore().collection('users');
    this.state = {
      isLoading: true,
      userArr: []
    };
  }

  componentDidMount() {
    this.unsubscribe = this.firestoreRef.onSnapshot(this.getCollection);
  }

  componentWillUnmount(){
    this.unsubscribe();
  }

  getCollection = (querySnapshot) => {
    const userArr = [];
    querySnapshot.forEach((res) => {
      const { petName, petAge, petBreed } = res.data();
      userArr.push({
        key: res.id,
        res,
        petName,
        petAge,
        petBreed,
      });
    });
    this.setState({
      userArr,
      isLoading: false,
   });
  }

//   useEffect = (() => {
//     getCollection();
//     return () => {
//       setState({}); 
//     };
// }, []);

  render() {
    if(this.state.isLoading){
      return(
        <View style={styles.preloader}>
          <ActivityIndicator size="large" color="#9E9E9E"/>
        </View>
      )
    }

    return (
      <ScrollView style={styles.container}>
          {
            this.state.userArr.map((item, i) => {
              return (
                <ListItem key={i} bottomDivider>
                <ListItem.Content>
                <ListItem.Title>Name: {item.petName}</ListItem.Title>
                <ListItem.Subtitle>Age: {item.petAge}</ListItem.Subtitle>
                <ListItem button onPress={() => {this.props.navigation.navigate('UserDetailScreen', {userkey: item.key})}}></ListItem>
                </ListItem.Content>
                <ListItem.Chevron />
                </ListItem>
              );
            })
          }
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
   flex: 1,
   paddingBottom: 22,
   width: "100%"
  },
  
  preloader: {
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center'
  }
})

export default UserScreen;