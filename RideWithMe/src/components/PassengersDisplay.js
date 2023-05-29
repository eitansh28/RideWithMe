import { View, Text, Image,StyleSheet,Modal, TouchableOpacity, Button, ScrollView, FlatList,Pressable } from 'react-native'
import React, { useState } from 'react'
import firestore from "@react-native-firebase/firestore";
import { IP } from './constants';
import { useNavigation } from '@react-navigation/native';

const PassengersDisplay = ({user, travelDocId}) => {
  const navigation = useNavigation();
    console.log("im inside!")
    console.log(user);

    function move_to_user_details() {
      navigation.navigate('UserDetails', {params: user.user_id});
      console.log("func has been called!");
    }

    return (  
    <View style = {{flex : 1,paddingBottom:10}}>    
        <View style = {{flex:0.5,backgroundColor:'white',borderRadius:10}}>
        <Text style={[styles.User,{marginBottom:10}]}>from : {user.from_where}</Text>
            {/* <View style={{flexDirection:'row',justifyContent:'space-between'}}> */}
            <TouchableOpacity onPress={move_to_user_details} style={styles.roundButton}>
              <Text style={styles.buttonText} color={'green'}>{"Name: "+user.user_name}</Text>
            </TouchableOpacity>
        {/* </View> */}
        
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
    User:{
        fontSize:20,
    },
    buttonText: {
      color: 'white', 
      fontSize: 18,
      fontWeight: 'bold',
      // alignItems: 'center',
      // justifyContent: 'center',
    },
    roundButton: {
      borderRadius: 40,
      backgroundColor: 'blue',
      padding: 10,
      marginVertical: 5,
      alignItems: 'center',
      justifyContent: 'center',
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

export default PassengersDisplay