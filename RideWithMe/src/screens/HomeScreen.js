import React from 'react';
import {StyleSheet,Button, Pressable, Text, View, ImageBackground} from 'react-native';
import auth from "@react-native-firebase/auth";
import { useRoute } from '@react-navigation/native';

const HomeScreen = ({navigation}) => {
  const {params} = useRoute();
  const name = params.username;
<<<<<<< HEAD
=======

>>>>>>> main

  function moveToProfile(){
    navigation.navigate("Profile");
  }
<<<<<<< HEAD
=======
  function move_to_search_ride(){
    navigation.navigate("SearchRide");
  }
  function move_to_post_ride(){
    navigation.navigate("PostRide");
  }
  function move_to_post_group_ride(){
    navigation.navigate("PostGroupRide");
  }

>>>>>>> main
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
<<<<<<< HEAD
        <Text style={styles.text}> welcome {name}</Text>
      </View>
      <View style={styles.separator}></View>
    <View style={styles.centered}>
       <Button title=" Profile  " style={styles.separator} onPress={moveToProfile}></Button>
=======
<<<<<<< HEAD
        <Text style={styles.text}> welcome {name}</Text>
=======
        <Text style={styles.text}> Awsome!</Text>
>>>>>>> 1763935c7a87f0878380a309e45a0b19011f9532
      </View>
      <View style ={{flex:1}}> 
    <View style={styles.centered}>
<<<<<<< HEAD
       <View style={styles.separator}>
       <Button title=" Profile  " onPress={moveToProfile}></Button>
       <Button title=" Search Ride  " onPress={move_to_search_ride}></Button>
       <Button title=" post ride  " onPress={move_to_post_ride}></Button>
       <Button title=" post group ride  " onPress={move_to_post_group_ride}></Button>
       </View>
      </View>
      <View style={{flex:0.9,justifyContent:'flex-end'}}>
       <Pressable style={{backgroundColor:'red',borderRadius:10, alignItems: 'center'}} onPress={logout}>
        <Text style={{fontSize:24,fontWeight:'500',color:'white'}}>Log out</Text>
       </Pressable>
       </View>
       <View>
      
=======
       <Button title=" Log out  " onPress={logout}></Button>
>>>>>>> main
       <View style={styles.separator}></View>
       <Button title=" Search Ride  " style={styles.separator} onPress={()=> navigation.navigate('ride')}></Button>
       <View style={styles.separator}></View>
       <Button title=" post ride  " style={styles.separator} onPress={move_to_post_ride}></Button>
       <View style={styles.separator}></View>
<<<<<<< HEAD
       <Button title=" post group ride  " style={styles.separator} onPress={move_to_post_group_ride}></Button>
       <View style={styles.separator_more}></View>
       <Button title=" Log out  "  color = 'red' onPress={logout}></Button>
=======
       <Button title=" post ride  " onPress={move_to_post_ride}></Button>
>>>>>>> 1763935c7a87f0878380a309e45a0b19011f9532
>>>>>>> main
      </View>
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
<<<<<<< HEAD
    // width: 1,
    // height: '8%',
    marginTop: 20,
    marginBottom: 25,
  },
  separator_more: {
    width: 1,
    height: '25%',
=======
    flex: 0.8,
    justifyContent: 'space-evenly',
    // width: 1,
    // height: '8%',
    //marginTop: 25,
    //marginBottom: 25,
  },
  separator_more: {
    width: 1,
<<<<<<< HEAD
    height: '25%',
=======
    height: '8%',
>>>>>>> 1763935c7a87f0878380a309e45a0b19011f9532
>>>>>>> main
  },
});
export default HomeScreen