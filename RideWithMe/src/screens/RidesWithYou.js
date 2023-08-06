import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, ImageBackground, FlatList } from "react-native";
import { firebase } from "@react-native-firebase/auth";
import BackButton from "../components/BackButton";
import { IP } from "../components/constants";
import YouRidesRowDisplay from "../components/YouRidesRowDisplay";

const RidesWithYou = ({navigation}) => {
  const { currentUser } = firebase.auth();
  const [rides_with_you, SetRides_with_you] = useState([]);

  useEffect(() => {
    const getRidesWithYou = async () => {
      try {
        const res = await fetch("http://"+IP+":1000/getRidesWithYou", {
          method: "POST", 
          headers: { Accept: "application/json",
           "Content-Type": "application/json" 
          },
          body: JSON.stringify({ id: currentUser.uid })});

        const user_rides = await res.json();
        SetRides_with_you(user_rides.rides);
      } catch (error) {
        console.log("im error ", error);
      }
    };
    getRidesWithYou();
  }, [currentUser.uid, rides_with_you]);

  return (
   <ImageBackground source={require('../components/pic4.jpg')} style={theStyle.background}>
  <View style ={theStyle.center}>
  <BackButton/>
      <Text style={theStyle.bold}>Joined Rides</Text>
          <View style={theStyle.separator}></View>
          <FlatList
            data={rides_with_you}
            keyExtractor = {item=> item.doc_id}
            renderItem = {({item}) => <YouRidesRowDisplay UseRides = {item}/>}
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
  export default RidesWithYou;