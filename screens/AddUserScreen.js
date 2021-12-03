// screens/AddUserScreen.js

import React, { Component } from 'react';
import { Button, StyleSheet, TextInput, ScrollView, ActivityIndicator, View } from 'react-native';
import firebase from '../database/firebaseDb';
import ValueProvider from '../components/ValueContext';

class AddUserScreen extends Component {
  constructor() {
    super();
    this.dbRef = firebase.firestore().collection('users');
    this.state = {
      petName: '',
      petAge: '',
      petBreed: '',
      isLoading: false
    };
  }

  inputValueUpdate = (val, prop) => {
    const state = this.state;
    state[prop] = val;
    this.setState(state);
  }

  storeUser() {
    if(this.state.petName === ''){
     alert('Fill at least your pet name!')
    } else {
      this.setState({
        isLoading: true,
      });      
      this.dbRef.add({
        petName: this.state.petName,
        petAge: this.state.petAge,
        petBreed: this.state.petBreed,
      }).then((res) => {
        this.setState({
          petName: '',
          petAge: '',
          petBreed: '',
          isLoading: false,
        });
        this.props.navigation.navigate('UserScreen')
      })
      .catch((err) => {
        console.error("Error found: ", err);
        this.setState({
          isLoading: false,
        });
      });
    }
  }

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
        <View style={styles.inputGroup}>
          <TextInput
              placeholder={'Pet Name'}
              value={this.state.petName}
              onChangeText={(val) => this.inputValueUpdate(val, 'petName')}
          />
        </View>
        <View style={styles.inputGroup}>
          <TextInput
              multiline={true}
              numberOfLines={4}
              placeholder={'Pet Age'}
              value={this.state.petAge}
              onChangeText={(val) => this.inputValueUpdate(val, 'petAge')}
          />
        </View>
        <View style={styles.inputGroup}>
          <TextInput
              placeholder={'Pet Breed'}
              value={this.state.petBreed}
              onChangeText={(val) => this.inputValueUpdate(val, 'petBreed')}
          />
        </View>

        <View style={styles.button}>
          <Button
            title='Add User'
            onPress={() => this.storeUser()} 
            color="#19AC52"
          />
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 35
  },
  inputGroup: {
    flex: 1,
    padding: 0,
    marginBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#cccccc',
  },
  preloader: {
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center'
  },
})

export default AddUserScreen;