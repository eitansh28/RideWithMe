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
import PostRide from '../screens/PostRide';
<<<<<<< HEAD
import CreateGroupRide from '../screens/PostGroupRide';
=======
<<<<<<< HEAD
import PostGroupRide from '../screens/PostGroupRide';
=======

>>>>>>> 1763935c7a87f0878380a309e45a0b19011f9532
>>>>>>> main

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
            name="SignIn"
            options={{ headerShown: false }} 
            component={SignIn}/>
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
            name="SearchRide" 
            options={{ headerShown: false }} 
            component={SearchRide} />
<<<<<<< HEAD
          <Stack.Screen 
            name="PostRide" 
            options={{ headerShown: false }} 
            component={PostRide} />
            <Stack.Screen 
            name="PostGroupRide" 
            options={{ headerShown: false }} 
            component={PostGroupRide} />
=======
            <Stack.Screen 
            name="PostRide" 
            options={{ headerShown: false }} 
            component={PostRide} />
<<<<<<< HEAD
            <Stack.Screen 
            name="PostGroupRide" 
            options={{ headerShown: false }} 
            component={CreateGroupRide} />
=======
>>>>>>> 1763935c7a87f0878380a309e45a0b19011f9532
>>>>>>> main
        </Stack.Navigator>
    </NavigationContainer>
  )
}

export default MainContainer