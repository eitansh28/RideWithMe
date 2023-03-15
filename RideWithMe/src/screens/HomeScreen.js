import React from 'react';
import {StyleSheet,Button, Text, View, ImageBackground} from 'react-native';
import auth from "@react-native-firebase/auth";

const HomeScreen = ({navigation}) => {

  function movetologin() {
    navigation.navigate("Login");
  }
  function movetosignup(){
    navigation.navigate("SignUp");
  }

  function moveToProfile(){
    navigation.navigate("Profile");
  }
  function move_to_post_ride(){
    navigation.navigate("PostRide");
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
        <Text style={styles.text}> Awsome!</Text>
      </View>
    <View style={styles.centered}>
       <Button title=" Log out  " onPress={logout}></Button>
       <View style={styles.separator}></View>
       <Button title=" Profile  " onPress={moveToProfile}></Button>
       <View style={styles.separator}></View>
       <Button title=" SearchRide  " onPress={()=> navigation.navigate('ride')}></Button>
       <View style={styles.separator}></View>
       <Button title=" post ride  " onPress={move_to_post_ride}></Button>
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
    backgroundColor: 'red',
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
    width: 1,
    height: '8%',
  },
});
export default HomeScreen