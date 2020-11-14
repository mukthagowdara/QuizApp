import React, {Component, useState} from 'react';
import { View, Text, Image, ScrollView, TextInput} from 'react-native';
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Login from './Login'
import Quiz from './Quiz'

const Stack = createStackNavigator();

class App extends Component {
  render() {
    return (
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Login">
          <Stack.Screen 
            name="Login" 
            component={Login} 
            options={{
              headerStyle: {
              backgroundColor: '#d85111', },
              headerTintColor: '#fff', headerTitleStyle: {
              fontWeight: 'bold', },
              }} />
          <Stack.Screen name="Quiz" component={Quiz} />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}

export default App;
