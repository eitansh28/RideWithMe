import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, ImageBackground,FlatList} from "react-native";
import { firebase } from "@react-native-firebase/auth";
import { IP } from '../components/constants';
import BackButton from "../components/BackButton";
import MyRidesRowDisplay from "../components/MyRidesRowDisplay";

const RidesWithMe = ({navigation}) => {
  const { currentUser } = firebase.auth();
  const [rides_with_me, SetRides_with_me] = useState([]);


  useEffect(() => {
    const getRidesWithMe = async () => {
      try {
        const res = await fetch("http://"+IP+":1000/getRidesWithMe", {
          method: "POST", 
          headers: { Accept: "application/json",
           "Content-Type": "application/json" 
          },
          body: JSON.stringify({ id: currentUser.uid })});

        const user_rides = await res.json();
        SetRides_with_me(user_rides.rides_with_me);
      } catch (error) {
        console.log("im error ", error);
      }
    };
      getRidesWithMe();
  }, [currentUser.uid, rides_with_me]);

  return (
  <ImageBackground source={require('../components/pic4.jpg')} style={theStyle.background}>
    <View style ={theStyle.center}>
      <BackButton/>
      <Text style={theStyle.bold}>My Rides As Driver</Text>
      <View style={theStyle.separator}></View>
      <FlatList
        data={rides_with_me}
        keyExtractor = {item=> item.doc_id}
        renderItem = {({item}) => <MyRidesRowDisplay UseRides = {item}/>}
      />
    </View>
  </ImageBackground>
  )
};


const theStyle = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: 'cover',
  },
  center: {
    flex: 1,
    
  },
  bold: {
    textAlign: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: 30,
    fontWeight: 'bold',
  },
  location: {
    container: {
        flex: 1,
        postion:'relative'
      },
      textInputContainer: {
        width: '100%',
        backgroundColor: 'rgba(0,0,0,0)',
        borderTopWidth: 0,
        borderBottomWidth:0,
      },
      textInput: {
        marginLeft: 0,
        marginRight: 0,
        height: 38,
        color: '#5d5d5d',
        fontSize: 16,
      },
      predefinedPlacesDescription: {
        color: '#1faadb',
      },
},
  separator: {
    width: 1,
    height: '8%',
  },
  root: {
    width: "100%",
    padding: 10,
  },
  container: {
    padding: 10,
  },
  input: {
    margin: 10,
    borderBottomColor: "lightgray",
    borderBottomWidth: 1,
  },
  button: {
    backgroundColor: "green",
    height: 25,
    alignItems: "center",
    borderRadius: 20,
  },
  location: {
    container: {
        flex: 1,
      },
      textInputContainer: {
        width: '100%',
        backgroundColor: 'rgba(0,0,0,0)',
        borderTopWidth: 0,
        borderBottomWidth:0,
      },
      textInput: {
        marginLeft: 0,
        marginRight: 0,
        height: 38,
        color: '#5d5d5d',
        fontSize: 16,
      },
      predefinedPlacesDescription: {
        color: '#1faadb',
      },
}

});
  export default RidesWithMe;