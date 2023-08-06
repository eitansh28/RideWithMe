import { Alert,View, Text, StyleSheet, Button} from 'react-native'
import React, { useState } from 'react'
import { firebase } from "@react-native-firebase/auth";
import { useNavigation } from '@react-navigation/native';
import { IP } from "./constants";

const YouRidesRowDisplay = ({UseRides}) => {
  const { currentUser } = firebase.auth();
  const navigation = useNavigation();
  
  function move_to_driver_details() {
    navigation.navigate('UserDetails', {params: UseRides.driver_id});
    console.log("func has been called!");
  }

  const leave_ride = async() => {
    try {
            // get driver's id for notification
            const res4 = await fetch("http://"+IP+":1000/getDriverId", {
              method: "POST", 
              headers: { Accept: "application/json",
              "Content-Type": "application/json" 
              },
              body: JSON.stringify({
                doc_id: UseRides.doc_id 
              })});
              const this_id = (await res4.json()).driver_id;

            // add to notifications
            const res3 = await fetch("http://"+IP+":1000/addNotification", {
              method: "POST", 
              headers: { Accept: "application/json",
              "Content-Type": "application/json" 
              },
              body: JSON.stringify({
                this_id: this_id,
                other_id: currentUser.uid,
                message: "has decided to leave your ride ",
                ride_id: UseRides.doc_id
              })});


      const res = await fetch("http://"+IP+":1000/leaveRide", {
      method: "POST",
      headers: { Accept: "application/json",
      "Content-Type": "application/json" 
      },
      body: JSON.stringify({ ride_id: UseRides.doc_id, user_id: currentUser.uid })});
      const answer = (await res.json()).send;
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  }

  const handleLeaveRide = () => {
    Alert.alert(
      'Confirmation',
      'Are you sure you want to leave this ride?',
      [
        { text: 'No', style: 'cancel' },
        { text: 'Yes', onPress: leave_ride },
      ]
    );
  };

  function move_to_map() {
    // Navigate to the Map component and pass driverLocation and destinationLocation as props
    navigation.navigate('Map', {
      driverLocation: JSON.parse(UseRides.origin),
      destinationLocation: JSON.parse(UseRides.destination),
      travel_doc_id: UseRides.doc_id
    });
  }
   
    return (  
    <View style = {{flex : 1,paddingBottom:10}}>    
        <View style = {{flex:0.5,backgroundColor:'white',borderRadius:10}}>
        <Text style={[styles.User,{marginBottom:10}]}> date : {UseRides.date}   </Text>
        <Text style={[styles.User,{marginBottom:10}]}> origin : {UseRides.originName} </Text>
        <Text style={[styles.User,{marginBottom:10}]}> destination : {UseRides.destinationName}   </Text>
        <Text style = {[styles.User,{paddingBottom:4}]} > price : {UseRides.price}</Text>
        <Button 
          title="driver"
          color={'purple'}
          onPress={move_to_driver_details}
        />
        <Button 
          title="Map"
          color={'green'}
          onPress={move_to_map}
        />
        <Button 
          title="leave ride"
          color={'red'}
          onPress={handleLeaveRide}
        />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
    User:{
        fontSize:20,
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

export default YouRidesRowDisplay