import React from 'react';
import {StyleSheet,Button, Text, View, ImageBackground} from 'react-native';
import auth from "@react-native-firebase/auth";
import { useRoute } from '@react-navigation/native';

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
  function moveToProfile(){
    navigation.navigate("Profile");
  }
  function move_to_post_ride(){
    navigation.navigate("PostRide");
  }
  function move_to_post_group_ride(){
    navigation.navigate("PostGroupRide");
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
       <Button title=" Profile  " style={styles.separator} onPress={moveToProfile}></Button>
       <View style={styles.separator}></View>
       <Button title=" Search Ride  " style={styles.separator} onPress={()=> navigation.navigate("SearchRide")}></Button>
       <View style={styles.separator}></View>
       <Button title=" post ride  " style={styles.separator} onPress={move_to_post_ride}></Button>
       <View style={styles.separator}></View>
       <Button title=" post group ride  " style={styles.separator} onPress={move_to_post_group_ride}></Button>
       <View style={styles.separator_more}></View>
       <Button title=" Log out  "  color = 'red' onPress={logout}></Button>
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