import React,{useState, useEffect} from 'react';
import {StyleSheet,Button, Pressable, Text, View, ImageBackground, TouchableOpacity} from 'react-native';
import auth from "@react-native-firebase/auth";
import { useRoute } from '@react-navigation/native';
import { IP } from '../components/constants';

const HomeScreen = ({navigation}) => {
  const {params} = useRoute();
  const name = params.username;
  const id = params.id;
  console.log("id", id);
  const [notification_size, SetNotification_size] = useState([]);

  // useEffect(() => {
  //   const getNotificationSize = async () => {
  //     try {
  //       const res = await fetch("http://"+IP+":1000/getNotificationSize", {
  //         method: "POST", 
  //         headers: { Accept: "application/json",
  //          "Content-Type": "application/json" 
  //         },
  //         body: JSON.stringify({user_id: id})});

  //       const notification_size_data = await res.json();
  //       SetNotification_size(notification_size_data.notificationSize)
  //     } catch (error) {
  //       console.log("im error ", error);
  //     }
  //   };
  //   getNotificationSize();
  // }, [id, notification_size]);

  const getNotificationSize = async () => {
    try {
      const res = await fetch("http://"+IP+":1000/getNotificationSize", {
        method: "POST",
        headers: { Accept: "application/json", "Content-Type": "application/json" },
        body: JSON.stringify({ user_id: id })
      });

      const notification_size_data = await res.json();
      SetNotification_size(notification_size_data.notificationSize);
    } catch (error) {
      console.log("im error ", error);
    }
  };

  useEffect(() => {
    const intervalId = setInterval(getNotificationSize, 5000); // Fetch every 5 seconds

    return () => {
      clearInterval(intervalId); // Clear interval on component unmount
    };
  }, [id]);

  function movetologin() {
    navigation.navigate("Login");
  }
  function movetosignup(){
    navigation.navigate("SignUp");
  }
  function moveToProfile(){
    navigation.navigate('Profile', {
      screen : 'Profile',       
      params : {id: id},
    });
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
  function move_to_my_rides(){
    navigation.navigate("MyRides");
  }
  function move_to_notifications(){
    navigation.navigate("Notifications");
  }
  function move_to_map(){
    navigation.navigate("Map")
  }


  const logout = () => {
    auth()
      .signOut()
      .then(() => console.log("User signed out!"));

    navigation.navigate("Start");
  };

  
  return(
    <ImageBackground source={require('../components/pic7.jpg')} style={styles.background}>
    <View style={styles.container}>
    <View style={styles.separator1}></View>
      <View style={styles.circle}>
        <Text style={styles.text}> Welcome {name}!</Text>
      </View>
      <View style={styles.separator}>
       <TouchableOpacity onPress={moveToProfile} style={styles.roundButton}>
        <Text style={styles.buttonText}>Profile</Text>
        </TouchableOpacity>
       <View style={styles.separator1}></View>
       <TouchableOpacity onPress={move_to_search_ride} style={styles.roundButton}>
  <Text style={styles.buttonText}>Search Ride</Text>
        </TouchableOpacity>
        <View style={styles.separator1}></View>
        <TouchableOpacity onPress={move_to_post_ride} style={styles.roundButton}>
          <Text style={styles.buttonText}>Post Ride</Text>
        </TouchableOpacity>
        <View style={styles.separator1}></View>
        <TouchableOpacity onPress={move_to_map} style={styles.roundButton}>
          <Text style={styles.buttonText}>Map</Text>
        </TouchableOpacity>
        <View style={styles.separator1}></View>
        <TouchableOpacity onPress={move_to_notifications} style={styles.roundButton}>
          <Text style={styles.buttonText}>Notifications : {notification_size}</Text>
        </TouchableOpacity>
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
  buttonText: {
    color: 'black', 
    fontSize: 13,
    fontWeight: 'bold',
  },
  roundButton: {
    borderRadius: 30,
    backgroundColor: 'lightgreen', 
    padding: 10,
    marginVertical: 10,
    alignItems: 'center',
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
    backgroundColor: 'lightblue',
    opacity:0.5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: 30,
    textAlign: 'center',
  },
  centered: {
    alignItems: 'center',
  },
  separator: {
    marginTop: 20,
    marginBottom: 25,
  },
  separator1: {
    marginTop: 10,
    marginBottom: 10,
  },
  separator_more: {
    width: 1,
    height: '25%',
  },
});
export default HomeScreen;