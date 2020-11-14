import React, { useEffect, useState } from 'react';
import { Text, Alert, Button, View, StyleSheet, TextInput} from 'react-native';
import * as RNFS from 'react-native-fs';
import AsyncStorage from '@react-native-async-storage/async-storage'

function Login ({navigation}){

    const [firstname, setFirstName] = useState('')
    const [lastname, setLastName] = useState('')
    const [nickname, setNickName] = useState('')
    const [age, setAge] = useState('')
    const [score, setScore] = useState(-1)
    var path = RNFS.DocumentDirectoryPath + '/score1.txt';
    

    useEffect(() => {
        const updateVal = navigation.addListener('focus', () => {
            RNFS.readFile(path, 'ascii')
            .then((res) => {
            console.log(res)
            setScore(res)
            })
            .catch((err) => {
            console.log(err.message);
            });
        });

        return () => {
            updateVal;
        };
    }, [navigation]);

    const showAlert = () => {
        Alert.alert(
           'User info stored..take quiz'
        );
    }

    RNFS.readFile(path, 'ascii')
    .then((res) => {
    console.log(res)
    setScore(res)
    })
    .catch((err) => {
    console.log(err.message);
    });

    console.log('score')
    console.log(score)
    AsyncStorage.getItem("FNAME").then((value) => {
        console.log(value)
        setFirstName(value)
    }).catch(function() {
        console.log("Promise Rejected");
    });
    AsyncStorage.getItem("LNAME").then((value) => {
        console.log(value)
        setLastName(value)
    }).catch(function() {
        console.log("Promise Rejected");
    });
    AsyncStorage.getItem("NNAME").then((value) => {
        console.log(value)
        setNickName(value)
    }).catch(function() {
        console.log("Promise Rejected");
    });
    AsyncStorage.getItem("AGE").then((value) => {
        console.log(value)
        setAge(value)
    }).catch(function() {
        console.log("Promise Rejected");
    });

    return (

      <View style={styles.container}>
      <Text style={styles.starter}>Login Form</Text>
        <TextInput
          style={styles.input}
          defaultValue={firstname}
          placeholder='FirstName'
          onChangeText={(value) => {
              AsyncStorage.setItem("FNAME", value)
              setFirstName(value)
            }}
        />
        <TextInput
          style={styles.input}
          defaultValue={lastname}
          placeholder='LastName'
          onChangeText={(value) => {
              AsyncStorage.setItem("LNAME", value)
              setLastName(value)
            }}
        />
        <TextInput
          style={styles.input}
          defaultValue={nickname}
          placeholder='NickName'
          onChangeText={(value) => {
              AsyncStorage.setItem("NNAME", value)              
              setNickName(value)
            }}
        />
        <TextInput
          style={styles.input}
          defaultValue={age}
          placeholder='Age'
          keyboardType='numeric'
          onChangeText={(value) => {
              AsyncStorage.setItem("AGE", value)
              setAge(value)
            }}
        />
        { score == -1 ? null : <Text style={styles.scoretext}>Score: {score}</Text> }
        
        <Button
          title={'Done'}
          style={styles.inputext}
          onPress={() => showAlert()}
        />

        <Text></Text>
        <Button
          title={'Take Quiz'}
          style={styles.inputext}
          onPress={() => navigation.navigate('Quiz')}
        />
      </View>
    );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  starter: {
    padding: 10,
  },
  input: {
    width: 300,
    height: 44,
    padding: 10,
    borderWidth: 1,
    borderColor: 'black',
    marginBottom: 10,
  },
  inputext: {
    width: 200,
    height: 44,
    padding: 50,
    textAlign:'center',
    fontWeight:'bold',
    borderWidth: 1,
    borderColor: 'black',
    marginBottom: 10,
  },
  scoretext: {
    fontWeight:'bold',
    fontSize: 20,
  }
});

export default Login;
