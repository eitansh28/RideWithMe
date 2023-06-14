import { View, Text,TextInput, Image,StyleSheet,Modal, TouchableOpacity, Button, ScrollView, FlatList,Pressable } from 'react-native'
import React, { useState } from 'react'
import firestore from "@react-native-firebase/firestore";
import { firebase } from "@react-native-firebase/auth";
import { IP } from './constants';

const SearchRidesRowDisplay = ({UseRides, user_location}) => {
    const { currentUser } = firebase.auth();
    let from_where = UseRides.vertex.locationName;
    
    const [selectedOption, setSelectedOption] = useState('search');
    const [howManyPassenger,setHowManyPassenger] = useState(1);
    const handleOptionSelect = (option) => {
        setSelectedOption(option);
      };
    const ask_to_join = async () => {
        if (selectedOption == "search") {
            from_where = JSON.stringify(UseRides.vertex.locationName);
        }
        console.log("from: "+ from_where);
        
        try {
            // get id
            const res1 = await fetch("http://"+IP+":1000/getUserDetails", {
            method: "POST", 
            headers: { Accept: "application/json",
            "Content-Type": "application/json" 
            },
            body: JSON.stringify({ id: currentUser.uid })});
            const user_details = await res1.json();
            const user_name = user_details.user_details.name;
            // ask to join
            const res = await fetch("http://"+IP+":1000/askToJoin",{
              method: 'POST',
              headers: {Accept: "application/json",
              "Content-Type": "application/json" 
            },
            body: JSON.stringify({
                doc_id : UseRides.vertex.idd,
                user_id: currentUser.uid,
                user_name: user_name,
                from_where: from_where,
                pass_num: howManyPassenger
            })});
            const to_alert = (await res.json()).send;
            } catch (e) {
            console.error("Error adding document: ", e);
          }
    }
   
    return (  
    <View style = {{flex : 1,paddingBottom:10}}>    
      {UseRides.edge && UseRides.vertex.locationName !== UseRides.edge?.dest && (
      <View style = {{flex:0.5,backgroundColor:'white',borderRadius:10}}>
      <Text style ={[styles.User,{marginBottom:10}]}> date: {UseRides.vertex.time}</Text>
      <Text style={[styles.User,{marginBottom:10}]}> origin : {UseRides.vertex.locationName} </Text>
      {UseRides.edge && (<Text style={[styles.User, { paddingBottom: 4 }]}> destination: {UseRides.edge?.dest}</Text>)}
      {UseRides.edge && UseRides.edge.type === 'onfoot' &&(<Text style={[styles.User, { paddingBottom: 4 }]}> 'ONFOOT'</Text>)}
      {UseRides.edge && UseRides.edge.price != "" && (<Text style={[styles.User, { paddingBottom: 4 }]}> price: {UseRides.edge?.price}</Text>)}
      {UseRides.vertex.freeSeats && (<Text style={[styles.User, { paddingBottom: 4 }]}> seats: {UseRides.vertex.freeSeats}</Text>)}
      {UseRides.edge && UseRides.edge.driver_name != "" && (<Text style={[styles.User, { paddingBottom: 4 }]}> driver name: {UseRides.edge?.driver_name}</Text>)}
      {UseRides.edge && UseRides.edge.type !== 'onfoot' && (<>
      {user_location == UseRides.vertex.locationName && (<>
      {UseRides.vertex.freeSeats && (<Text style={{fontSize: 20, fontWeight: 'bold', marginBottom: 10}}> From where you want to be taken?</Text>)}
      
      <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
       <Text
        style={{
          marginRight: 20,
          color: selectedOption === 'search' ? 'blue' : 'black',
        }}
        onPress={() => handleOptionSelect('search')}
      >
        Search origin location
      </Text>
      <Text
        style={{
          marginRight: 20,
          color: selectedOption === 'ride' ? 'blue' : 'black',
        }}
        onPress={() => handleOptionSelect('ride')}
      >
        Ride origin location
      </Text>
      <View style={styles.separator}></View>
    </ScrollView>
      </>)}
    <TextInput 
        style={{width: '50%',fontSize:14,padding:2,backgroundColor: 'lightblue', textAlign: 'center',alignSelf: 'center',}}
        placeholder="how many passengers"
        keyboardType="numeric"
        value={howManyPassenger}
        onChangeText={(text) => setHowManyPassenger(text)}
      />
      <View style={styles.separator1}></View>
    <Button
      title="ask to join"
      color="darkgreen"
      onPress={() => ask_to_join()}
    />
  </>
)}
      </View>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
    User:{
        fontSize:20,
    },
    separator: {
      marginBottom: 30,
    },
    separator1: {
      marginBottom: 20,
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