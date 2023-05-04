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
import SearchResults from '../screens/SearchResults';
import PostRide from '../screens/PostRide';
import PostGroupRide from '../screens/PostGroupRide';
import Sa from '../screens/Sa';
import MyRides from '../screens/MyRides';
import RidesWithMe from '../screens/RidesWithMe';
import RidesWithYou from '../screens/RidesWithYou';
import RidesRequest from '../screens/RidesRequest';
import MainPagesNev from './MainPagesNev';
import AskedToJoin from '../screens/AskedToJoin';
import UserDetails from '../screens/UserDetails';

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
            name="Home1" 
            options={{ headerShown: false }} 
            component={MainPagesNev} />
          <Stack.Screen 
            name="Set User Data" 
            options={{ headerShown: false }} 
            component={SetUserData} />
          <Stack.Screen 
            name="Profile1" 
            options={{ headerShown: false }} 
            component={ProfileScreen} />
          <Stack.Screen 
            name="SearchRide" 
            options={{ headerShown: false }} 
            component={SearchRide} />
          <Stack.Screen 
            name="PostRide" 
            options={{ headerShown: false }} 
            component={PostRide} />
            <Stack.Screen 
            name="PostGroupRide" 
            options={{ headerShown: false }} 
            component={PostGroupRide} />
            <Stack.Screen 
            name="Sa" 
            options={{ headerShown: false }} 
            component={Sa} />
            <Stack.Screen
            name="MyRides"
            options={{ headerShown: false}}
            component={MyRides} />
            <Stack.Screen
            name="RidesWithMe"
            options={{ headerShown: false}}
            component={RidesWithMe} />
            <Stack.Screen
            name="RidesWithYou"
            options={{ headerShown: false}}
            component={RidesWithYou} />
            <Stack.Screen
            name="RidesRequest"
            options={{ headerShown: false}}
            component={RidesRequest} />
            <Stack.Screen
            name="SearchResults"
            options={{ headerShown: false}}
            component={SearchResults} />
            <Stack.Screen
            name="AskedToJoin"
            options={{ headerShown: false}}
            component={AskedToJoin} />
            <Stack.Screen
            name="UserDetails"
            options={{ headerShown: false}}
            component={UserDetails} />
        </Stack.Navigator>
    </NavigationContainer>
  )
}

export default MainContainer