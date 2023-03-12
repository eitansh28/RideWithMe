import React from 'react'
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import SignUp from './SignUp';
import Login from './Login';
import Main_page from "./Main_page";

const Stack = createNativeStackNavigator();

function Main_container() {
  return (
    <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen 
            name="Home" 
            options={{ headerShown: false }} 
            component={Main_page} />
          <Stack.Screen 
            name="Login"
            options={{ headerShown: false }} 
            component={Login}/>
          <Stack.Screen 
            name="SignUp"
            options={{ headerShown: false }} 
            component={SignUp}/>
        </Stack.Navigator>
    </NavigationContainer>
  )
}

export default Main_container
