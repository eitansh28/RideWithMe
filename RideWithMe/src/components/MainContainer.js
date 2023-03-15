import React from 'react'
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import StartScreen from "../screens/StartScreen";
import SignUp from '../screens/SignUp';
import SignIn from '../screens/SignIn';
import HomeScreen from '../screens/HomeScreen';
import SetUserData from '../screens/SetUserData';
import ProfileScreen from '../screens/ProfileScreen';
import SearchRide from '../screens/SearchRide';

const Stack = createNativeStackNavigator();

function MainContainer() {
  return (
    <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen 
            name="Start" 
            options={{ headerShown: false }} 
            component={StartScreen} />
          <Stack.Screen 
            name="Login"
            options={{ headerShown: false }} 
            component={SignIn}/>
          <Stack.Screen 
            name="SignUp"
            options={{ headerShown: false }} 
            component={SignUp}/>
          <Stack.Screen 
            name="Home" 
            options={{ headerShown: false }} 
            component={HomeScreen} />
          <Stack.Screen 
            name="Set User Data" 
            options={{ headerShown: false }} 
            component={SetUserData} />
          <Stack.Screen 
            name="Profile" 
            options={{ headerShown: false }} 
            component={ProfileScreen} />

          <Stack.Screen 
            name="ride" 
            options={{ headerShown: false }} 
            component={SearchRide} />
            
        </Stack.Navigator>
    </NavigationContainer>
  )
}

export default MainContainer