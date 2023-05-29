import { View, Text, Image,StyleSheet,Modal, TouchableOpacity, Button, ScrollView, FlatList,Pressable } from 'react-native'
import React, { useState } from 'react'
import firestore from "@react-native-firebase/firestore";
import { firebase } from "@react-native-firebase/auth";
import { IP } from './constants';

const SearchRidesRowDisplay = ({UseRides}) => {
    const { currentUser } = firebase.auth();
    //console.log("user rides:")
    //console.log(UseRides);
    const [selectedOption, setSelectedOption] = useState('search');
    const handleOptionSelect = (option) => {
        setSelectedOption(option);
      };
    const ask_to_join = async () => {
        let from_where = UseRides.originName;
        if (selectedOption == "search") {
            from_where = JSON.stringify(UseRides.user_location);
        }
        console.log("from: "+ from_where);
        console.log("doc id: "+ UseRides.id);
        try {
            // get id
            const res1 = await fetch("http://192.168.1.125:1000/getUserDetails", {
            method: "POST", 
            headers: { Accept: "application/json",
            "Content-Type": "application/json" 
            },
            body: JSON.stringify({ id: currentUser.uid })});
            const user_details = await res1.json();
            const user_name = user_details.user_details.name;
            console.log(user_name);
            // ask to join
            const res = await fetch("http://192.168.1.125:1000/askToJoin",{
              method: 'POST',
              headers: {Accept: "application/json",
              "Content-Type": "application/json" 
            },
            body: JSON.stringify({
                doc_id: UseRides.id,
                user_id: currentUser.uid,
                user_name: user_name,
                from_where: from_where
            })});
            const to_alert = (await res.json()).send;
            console.log(to_alert);
            alert(to_alert);
            } catch (e) {
            console.error("Error adding document: ", e);
          }
    }
   
    return (  
    <View style = {{flex : 1,paddingBottom:10}}>    
      {/* <View style = {{flex:0.5,backgroundColor:'#d0c7b7',borderRadius:10}}> */}
      <View style = {{flex:0.5,backgroundColor:'white',borderRadius:10}}>
      <Text style ={[styles.User,{marginBottom:10}]}> date: {UseRides.date}</Text>
      <Text style={[styles.User,{marginBottom:10}]}> origin : {UseRides.originName} </Text>
      <Text style={[styles.User,{marginBottom:10}]}> destination : {UseRides.destinationName}   </Text>
      <Text style = {[styles.User,{paddingBottom:4}]} > price : {UseRides.price}</Text>
      <Text style = {[styles.User,{paddingBottom:4}]} > seats : {UseRides.seats}</Text>
      <Text style = {[styles.User,{paddingBottom:4}]} > driver name : {UseRides.driver_name}</Text>
      {/* <Text style={{fontSize: 20, fontWeight: 'bold', marginBottom: 10}}> From where you want to be taken?</Text>
      <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
        <Text style={{marginRight: 20, color: selectedOption === 'search' ? 'blue' : 'black'}} onPress={() => handleOptionSelect('search')}>Search origin location</Text>
        <Text style={{marginRight: 20, color: selectedOption === 'ride' ? 'blue' : 'black'}} onPress={() => handleOptionSelect('ride')}>Ride origin location</Text>
      </ScrollView> */}
      <Button 
            title="ask to join"
            color={'darkgreen'}
            onPress={ask_to_join}
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

export default SearchRidesRowDisplay