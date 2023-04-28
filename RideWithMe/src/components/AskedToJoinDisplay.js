import { View, Text, Image,StyleSheet,Modal, TouchableOpacity, Button, ScrollView, FlatList,Pressable } from 'react-native'
import React, { useState } from 'react'
import firestore from "@react-native-firebase/firestore";
import { IP } from './constants';
import { useNavigation } from '@react-navigation/native';

const AskedToJoinDisplay = ({user, travelDocId}) => {
  const navigation = useNavigation();
    console.log("im inside!")
    console.log(user);

    function move_to_user_details() {
      navigation.navigate('UserDetails', {params: user.user_id});
      console.log("func has been called!");
    }

    const approve_user = async () => {
      console.log("approve has been clicked!");
      try {
        const res = await fetch("http://"+IP+":1000/approveRequest", {
          method: "POST", 
          headers: { Accept: "application/json",
           "Content-Type": "application/json" 
          },
          body: JSON.stringify({ 
            travel_doc_id: travelDocId,
            asked_doc_id: user.doc_id,
            user_id: user.user_id,
            user_name: user.user_name
           })});
      } catch (error) {
        console.log("im error ", error);
      }
    }

    const reject_user = async () => {
      console.log("reject clicked");
      try {
        const res = await fetch("http://"+IP+":1000/rejectRequest", {
          method: "POST", 
          headers: { Accept: "application/json",
           "Content-Type": "application/json" 
          },
          body: JSON.stringify({
            user_id: user.user_id,
            travel_doc_id: travelDocId,
            asked_doc_id: user.doc_id
           })});
      } catch (error) {
        console.log("im error ", error);
      }
    }
   
    return (  
    <View style = {{flex : 1,paddingBottom:10}}>    
        <View style = {{flex:0.5,backgroundColor:'#d0c7b7',borderRadius:10}}>
            <View style={{flexDirection:'row',justifyContent:'space-between'}}>
            <Button title= {"Name: "+user.user_name} color={'blue'} onPress={move_to_user_details}/>
            <Button title="Approve" color={'green'} onPress={approve_user}/>
            <Button title="Reject" color={'red'} onPress={reject_user}/>
        </View>
        <Text style={[styles.User,{marginBottom:10}]}>from : {user.from_where}</Text>
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

export default AskedToJoinDisplay