import React from 'react';
import {StyleSheet,Button, Text, View, ImageBackground, Pressable} from 'react-native';
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
  <View style ={{flex:1}}> 
    <View style={styles.centered}>
       <View style={styles.separator}>
       <Button title=" Profile  " onPress={moveToProfile}></Button>
       <Button title=" SearchRide  " onPress={()=> navigation.navigate('ride')}></Button>
       <Button title=" post ride  " onPress={move_to_post_ride}></Button>
       </View>
      </View>
      <View style={{flex:0.9,justifyContent:'flex-end'}}>
       <Pressable style={{backgroundColor:'red',borderRadius:10}} onPress={logout}>
        <Text style={{fontSize:24,fontWeight:'500',color:'white'}}>Log out</Text>
       </Pressable>
       </View>
       <View>
      
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
  
    // margin:10,
    flex:0.8,
    justifyContent:'space-evenly'
    
  },
});
export default HomeScreen