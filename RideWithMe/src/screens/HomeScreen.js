import React,{useState} from 'react';
import {StyleSheet,Button, Pressable, Text, View, ImageBackground} from 'react-native';
import auth from "@react-native-firebase/auth";
import { useRoute } from '@react-navigation/native';
import { firebase } from "@react-native-firebase/auth";
import { getUserDetails } from '../components/getUserDetials';
import { Linking } from 'react-native';

const HomeScreen = ({navigation}) => {
  const {params} = useRoute();
  const name = params.username;
  




  function movetologin() {
    navigation.navigate("Login");
  }
  function movetosignup(){
    navigation.navigate("SignUp");
  }
  function moveToProfile(){
    navigation.navigate("Profile");
  }
  function move_to_search_ride(){
    navigation.navigate("SearchRide");
  }
  function move_to_post_ride(){
    navigation.navigate("PostRide");
  }
  function move_to_post_group_ride(){
    navigation.navigate("PostGroupRide");
  }


  const phone = '0544510170'; // replace with the phone number of the recipient
  const phoneNumber = '054-446-8216';

  const openWhatsApp = () => {
    Linking.openURL(`whatsapp://send?phone=${phoneNumber}`);
  }

  const makeCall = () => {
    Linking.openURL(`tel:${phoneNumber}`);
  }

  const sms = () => {
    Linking.openURL(`sms:${phoneNumber}`);
  }

  const logout = () => {
    auth()
      .signOut()
      .then(() => console.log("User signed out!"));

    navigation.navigate("Start");
  };

  
  return(
    <ImageBackground source={require('../components/pic1.jpg')} style={styles.background}>
    <View style={styles.container}>
      <View style={styles.circle}>
        <Text style={styles.text}> welcome {name}</Text>
      </View>
      <View style={styles.separator}></View>
    <View style={styles.centered}>
       <View style={styles.separator}>
       <Button title=" Profile  " onPress={moveToProfile}></Button>
       <Button title=" Search Ride  " onPress={move_to_search_ride}></Button>
       <Button title=" post ride  " onPress={move_to_post_ride}></Button>
       <Button title=" post group ride  " onPress={move_to_post_group_ride}></Button>
       <Button title=" what's-up  " onPress={openWhatsApp}></Button>
       <Button title=" phonecall  " onPress={makeCall}></Button>
       <Button title=" sms  " onPress={sms}></Button>
       </View>
      </View>
      <View style={{flex:0.9,justifyContent:'flex-end'}}>
       <Pressable style={{backgroundColor:'red',borderRadius:10, alignItems: 'center'}} onPress={logout}>
        <Text style={{fontSize:24,fontWeight:'500',color:'white'}}>Log out</Text>
       </Pressable>
       </View>
    </View>
    </ImageBackground>
  )
}


const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: 'cover',
  },
  container: {
    flex: 1,
    alignItems: 'center',
  },
  input: {
    width: "90%",
    fontSize: 15,
    padding: 8,
    borderColor: "gray",
    borderWidth: 0.2,
    borderRadius: 10,
  },
  circle: {
    width: 200,
    height: 200,
    borderRadius: 150,

    backgroundColor: 'green',
    opacity:0.5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 30,
    textAlign: 'center',
  },
  centered: {
    alignItems: 'center',
  },
  separator: {
    // width: 1,
    // height: '8%',
    marginTop: 20,
    marginBottom: 25,
  },
  separator_more: {
    width: 1,
    height: '25%',
  },
});
export default HomeScreen