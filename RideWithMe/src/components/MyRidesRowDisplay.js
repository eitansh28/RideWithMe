import { Alert,View, Text, Image,StyleSheet,Modal, TouchableOpacity, Button, ScrollView, FlatList,Pressable } from 'react-native'
import React, { useState } from 'react'
import firestore from "@react-native-firebase/firestore";
import { useNavigation } from '@react-navigation/native';
import { IP } from './constants'; 

const MyRidesRowDisplay = ({UseRides}) => {
  const navigation = useNavigation();
  
  function move_to_passengers() {
    const travel_doc_id = UseRides.doc_id;
    navigation.navigate('Passengers', {params: travel_doc_id});
  }
  

  const deleteRide = async() => {
    try {
      const res = await fetch("http://"+IP+":1000/deleteRide", {
      method: "POST",
      headers: { Accept: "application/json",
      "Content-Type": "application/json" 
      },
      body: JSON.stringify({ ride_id: UseRides.doc_id })});
      const answer = (await res.json()).send;
    } catch (e) {
      console.error("Error adding document: ", e);
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