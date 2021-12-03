import React from 'react';
import { Button, View, Text, StyleSheet, TextInput} from 'react-native';
import {useState, useEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';


const Test = (props) => {
    const [times, setTimes] = useState(0);
    const [minute, setMinute] = useState(0);
    const [week, setWeek] = useState(0);
    const [evaluate, setEvaluate] = useState('___');
    const [level, setLevel] = useState('');


    useEffect(() => {
        if (week == 0){
            setEvaluate("____");
        } else if (week < 0.3){
            setEvaluate("mild");
        } else if (week <= 1){
            setEvaluate("moderate");
        } else if (week > 1){
            setEvaluate("heavy");
        }
    },[week])

    useEffect(() => {getData()}
           ,[])

    useEffect(() => {
        storeData({evaluate})
    },[evaluate])

    const storeData = async (value) => {
        try {
          const jsonValue = JSON.stringify(value)
          await AsyncStorage.setItem('@exerciseLevel', jsonValue)
          console.log('just stored' + jsonValue)
        } catch (e) {
          console.dir(e)
        }
    }

    const getData = async () => {
        try {
          const jsonValue = await AsyncStorage.getItem('@exerciseLevel')
          let data = null
          if (jsonValue!=null) {
            data = JSON.parse(jsonValue)
            setLevel(data.evaluate)
            console.log('just set exerciseLevel')
          } else {
              console.log('just read a null value from Storate')
            setLevel("")
          }
        } catch(e) {
          console.dir(e)
        }
  }


    return (
        <View style = {styles.container}>
            <View>
                <Text style = {styles.header}> Exercise level evaluation </Text>
                <View style = {styles.space}/>
            </View>
            <View style = {styles.space}/>
            <Text>How many times do you walk your dog every week?</Text>
            <TextInput
                placeholder = "Times / Week "
                onChangeText = {text => {setTimes(text)}}>
            </TextInput>

            <View style = {styles.space}/>

            <Text>How many minutes do you walk your dog each time? </Text>
            <TextInput
                placeholder = "Minutes / Time"
                onChangeText = {text => {setMinute(text)}}>
            </TextInput>

            <View style = {styles.space}/>

            <Button
                color = 'red'
                title = 'Calculate amount of excercise'
                onPress = {() => setWeek(times * minute / 60) }
            />
            <View style = {styles.space}/>
            <Text style = {{fontSize: 24, fontWeight: "bold"}}> The amount of excercise of your dog each week is {evaluate}. </Text>
            <View style = {styles.space}/>
            <Button
                color='black'
                title='Submit'
                onPress = { () => {
                    setLevel(evaluate)
                    console.log('data=' + JSON.stringify(evaluate))
                    storeData(evaluate)
                }}
            />

            <Button
                color='mediumblue'
                title='Load Profile from Memory'
                onPress = {() => {
                    console.log('loading profile');
                    getData()
                }}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20
    },
    header: {
        fontSize: 40,
        fontWeight: 'bold',
    },
    space: {
        width: 20,
        height: 20,
    },
    button: {
        backgroundColor: '#0782F9',
        width: '60%',
        padding: 15,
        borderRadius: 10,
        alignItems: 'center',
        marginTop: 40,
      },
      buttonText: {
        color: 'white',
        fontWeight: '700',
        fontSize: 16,
      },

})

export default Test