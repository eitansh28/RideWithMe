import { View, Text, Image,StyleSheet,Modal, TouchableOpacity, Button, ScrollView, FlatList,Pressable } from 'react-native'
import React, { useState } from 'react'
import firestore from "@react-native-firebase/firestore";
import { useNavigation } from '@react-navigation/native';

const YouRidesRowDisplay = ({UseRides}) => {
  const navigation = useNavigation();
  
  function move_to_driver_details() {
    navigation.navigate('UserDetails', {params: UseRides.driver_id});
    console.log("func has been called!");
  }
   
    return (  
    <View style = {{flex : 1,paddingBottom:10}}>    
        <View style = {{flex:0.5,backgroundColor:'#d0c7b7',borderRadius:10}}>
            <View style={{flexDirection:'row',justifyContent:'space-between'}}>
            <Text style ={{fontSize:20}}>date: {UseRides.date}</Text>
        </View>
        <Text style={[styles.User,{marginBottom:10}]}>destination : {UseRides.destination}   </Text>
        <Text style={[styles.User,{marginBottom:10}]}>origin : {UseRides.origin} </Text>
        <Text style = {[styles.User,{paddingBottom:4}]} >price : {UseRides.price}</Text>
        <Text style = {[styles.User,{paddingBottom:4}]} >seats : {UseRides.seats}</Text>
        <Button 
          title="driver"
          color={'blue'}
          onPress={move_to_driver_details}
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