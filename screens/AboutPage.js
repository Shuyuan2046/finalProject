import * as React from 'react';
import { View, Text, StyleSheet, FlatList} from 'react-native';
import  { useState } from 'react'
import {useValue} from '../components/ValueContext';

const AboutScreen = () => {
  const {currentValue} = useValue();
  const [people, setPeople] = useState([
    { name: 'Tequila', id: '1' },
    { name: 'Shuyuan Wang', id: '2' },
    { name: 'mario', id: '3' },
    { name: 'luigi', id: '4' },
    { name: 'peach', id: '5' },
    { name: 'toad', id: '6' },
    { name: 'bowser', id: '7' },
  ]);

  return (
    <View style={styles.container}>
      <Text>This app is about to help {currentValue.breed} meet their friends and learn some social rules!</Text>
      <Text> Here are our current users!</Text>
    
    <View style={styles.flatListContainer}>
    <FlatList 
        numColumns={2}
        keyExtractor={(item) => item.id} 
        data={people} 
        renderItem={({ item }) => ( 
          <Text style={styles.item}>{item.name}</Text>
        )}
      />
      </View>
      </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 40,
    paddingHorizontal: 20,
    backgroundColor: '#fff',
  },


  item: {
    flex: 1,
    marginHorizontal: 15,
    marginTop: 24,
    padding: 30,
    backgroundColor: 'lightblue',
    fontSize: 24,
  },
  
})

export default AboutScreen
