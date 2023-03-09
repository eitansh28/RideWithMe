import { View, Text } from 'react-native'
import React from 'react'

import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import SignUp from './SignUp';
import Login from './Login';

const Stack = createNativeStackNavigator();

const Main_container = () => {
  return (
    <NavigationContainer>
        <Stack.Navigator>
            <Stack.Screen 
            name="try1"
            component={Login}/>
            <Stack.Screen 
            name="try2"
            component={SignUp}/>
        </Stack.Navigator>
        </NavigationContainer>
  )
}

export default Main_container
