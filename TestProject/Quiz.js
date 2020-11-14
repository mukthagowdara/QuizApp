import React, {useState} from 'react';
import {Text, Alert, View, FlatList, StyleSheet, Button, } from 'react-native'; 
import questions from './data/questions'
import * as RNFS from 'react-native-fs';
import { StackActions, useNavigation } from '@react-navigation/native';

function Quiz () {

    const [index, setIndex] = useState(0)
    const [score, setScore] = useState(0)
    const [displayNext, setDisplayNext] = useState(false)
    const [displayEnd, setDisplayEnd] = useState(false)
    const [selectedId, setSelectedId] = useState(0)
    const questionCount = questions.length
    const [data, setData] = useState(0)
    const navigation = useNavigation();
    var path = RNFS.DocumentDirectoryPath + '/score1.txt';
    var dirPath = RNFS.DocumentDirectoryPath

    RNFS.readDir(dirPath).then((res) => {
      console.log("DIR FILES")
      console.log(res)
    })

    const update = (item) => {
        setSelectedId(item.id)
        if(item.correct == true) {
            setScore(score + 1);
        }
        if(index == questionCount-1){
            setDisplayNext(false)
            setDisplayEnd(true)
        } else {
            setDisplayNext(true)
        }

          RNFS.writeFile(path, score, 'ascii')
          .then((success) => {
            console.log('FILE WRITTEN!');
          })
          .catch((err) => {
            console.log(err.message);
        });
    };

    const nextClicked = (index) => {
        setIndex(index+1)
        setDisplayNext(false)
        setSelectedId(0)
    }

    const showAlert = () =>{
        console.log("alert")
        Alert.alert(
           'User info stored..take quiz'
        )
     }

    const renderItem = ({item}) => {
        return (
            <Text style={selectedId === item.id ? 
                {marginTop: 10, padding: 10, backgroundColor: 'palevioletred', fontSize: 20
                } : {marginTop: 10, padding: 10, backgroundColor: 'pink', fontSize: 20}}
            onPress = {() => update(item)}>{item.text}</Text>
        );
    };

    return (
        <View style={styles.container}>
          <Text style={styles.questionStyle}>{questions[index].question}</Text>
          <FlatList
            data={questions[index].answers}
            renderItem={renderItem}
            keyExtractor={item => item.id}
          />
          {displayNext == true?
            <Button 
                title="Next"
                onPress = { () => nextClicked(index)}
            /> : null
          }
          {displayEnd == true?
            <Button 
                title="End"
                onPress = { () => navigation.dispatch(StackActions.popToTop())}
            /> : null
          }
        </View>
        
    );
    
}
  
export default Quiz

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 20,
    paddingHorizontal: 20
  },
  item: {
    marginTop: 10,
    padding: 10,
    backgroundColor: 'pink',
    fontSize: 20
  },
  questionStyle: {
    fontSize: 25,
    fontWeight: "bold"
  }
});