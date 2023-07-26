import { Alert,View, Text, Image,StyleSheet,Modal, TouchableOpacity, Button, ScrollView, FlatList,Pressable } from 'react-native'
import React, { useState } from 'react'
import firestore from "@react-native-firebase/firestore";
import { firebase } from "@react-native-firebase/auth";
import { useNavigation } from '@react-navigation/native';
import { IP } from './constants'; 
// import Sms from 'react-native-sms';

const MyRidesRowDisplay = ({UseRides}) => {

  console.log("ride: ", UseRides)

  const navigation = useNavigation();
  const { currentUser } = firebase.auth();

  function move_to_passengers() {
    const travel_doc_id = UseRides.doc_id;
    navigation.navigate('Passengers', {params: travel_doc_id});
  }

  function move_to_map() {
    try {
      // Parse the destination and origin data from the string to JSON objects
      const destinationLocation = JSON.parse(UseRides.destination);
      const driverLocation = JSON.parse(UseRides.origin);
      const travel_doc_id = UseRides.doc_id;
      console.log("loc1: ", driverLocation)
      console.log("loc2: ", destinationLocation)
      // Navigate to the Map component and pass driverLocation and destinationLocation as props
      navigation.navigate('Map', {
        driverLocation: driverLocation,
        destinationLocation: destinationLocation,
        travel_doc_id: travel_doc_id
      });
    } catch (error) {
      console.error('Error parsing locations: ', error);
      // Show an error message if there's an issue with parsing the locations
      // You can handle this error based on your app's requirements
    }
  }
  

  const deleteRide = async() => {
    try {
      const res = await fetch("http://"+IP+":1000/deleteRide", {
      method: "POST",
      headers: { Accept: "application/json",
      "Content-Type": "application/json" 
      },
      body: JSON.stringify({ ride_id: UseRides.doc_id, driver_id: currentUser.uid })});
      const answer = (await res.json()).send;
    } catch (e) {
      console.error("Error delete document: ", e);
    }
  }

  const handleCancelRide = () => {
    Alert.alert(
      'Confirmation',
      'Are you sure you want to cancel this ride?',
      [
        { text: 'No', style: 'cancel' },
        { text: 'Yes', onPress: deleteRide },
      ]
    );
  };


    return (  
    <View style = {{flex : 1,paddingBottom:10}}>    
        <View style = {{flex:0.5,backgroundColor:'white',borderRadius:10}}>
        <Text style ={[styles.User,{marginBottom:10}]}> date: {UseRides.date}</Text>
        <Text style={[styles.User,{marginBottom:10}]}> origin : {UseRides.originName} </Text>
        <Text style={[styles.User,{marginBottom:10}]}> destination : {UseRides.destinationName}   </Text>
        <Text style = {[styles.User,{paddingBottom:4}]} > price : {UseRides.price}</Text>
        <Text style = {[styles.User,{paddingBottom:4}]} > seats : {UseRides.seats}</Text>
        <Button 
          title="passengers"
          color={'darkorange'}
          onPress={move_to_passengers}
        />
        <Button 
          title="map"
          color={'green'}
          onPress={move_to_map}
        />
        <Button title="cancel ride" color="red" onPress={handleCancelRide} />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
    User:{
        fontSize:20,
        fontWeight: 'bold'
    },
        button: {
          alignItems: 'center',
          justifyContent: 'center',
          paddingVertical: 12,
          paddingHorizontal: 32,
          borderRadius: 100,
          elevation: 3,
          backgroundColor: 'black',
        },
        text: {
          fontSize: 16,
          lineHeight: 21,
          fontWeight: 'bold',
          letterSpacing: 0.25,
          color: 'white',
        },
})

export default MyRidesRowDisplay