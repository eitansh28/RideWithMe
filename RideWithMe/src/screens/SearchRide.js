import React, {useState, useEffect} from "react";
import {View, Text, StyleSheet, Button , TextInput, ImageBackground, TouchableOpacity} from 'react-native';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import BackButton from "../components/BackButton";
import { IP } from "../components/constants";

  const SearchRide = ({navigation}) => {

    const [from, setFrom] = useState("");
    const [to, setTo] = useState("");
    const [originName, setOriginName] = useState('defualt');
    const [destinationName, setDestinationName] = useState('defualt');
    const [departureTime, setDepartureTime] = useState(null);
    const [isDepartureTimePickerVisible, setDepartureTimePickerVisibility] = useState(false);
    const [howManyPassenger,setHowManyPassenger] = useState(-1);
    

    const handleFromLocation = (data, details = null) => {
        // Check if geometry is defined
        if (details.geometry && details.geometry.location) {
            // Extract latitude and longitude from the data parameter
            const { lat, lng } = details.geometry.location;
            
            setOriginName(data.description);
            // Set the location state
            setFrom({ latitude: lat, longitude: lng });
        }
    };
    
    const handleToLocation = (data, details = null) => {
        // Check if geometry is defined
        if (details.geometry && details.geometry.location) {
            // Extract latitude and longitude from the data parameter
            const { lat, lng } = details.geometry.location;
            setDestinationName(data.description);
            // Set the location state
            setTo({ latitude: lat, longitude: lng });
        }
    };

    const handleDepartureTimeConfirm = (date) => {
        console.log("Date selected: ", date);
        setDepartureTime(date);
        setDepartureTimePickerVisibility(false);
    }
    
    const handleDepartureTimeCancel = () => {
        console.log("Date selection cancelled.");
        setDepartureTimePickerVisibility(false);
    }


    const search = async () => {
        console.log("search ride pressed");
        if (departureTime && from ){
            try{
                const res =  await fetch(("http://"+IP+":1000/searchRide"),{
                    method : 'POST',
                    headers: {Accept: "application/json",
                    "Content-Type": "application/json" 
                  },
                  body: JSON.stringify({
                    origin:from,
                    originName:originName,              
                    destination: to,
                    destinationName:destinationName,
                    departureTime: departureTime,
                    passengersNum: howManyPassenger
                   })});
                   const ride_details = await res.json();
                    navigation.navigate('SearchResults', {
                    screen : 'SearchResults',       
                    params : {results: ride_details, user_location: originName, origin_name: originName},
                  });
                }catch(e){
                    console.error("Error searching ride",e);
                }
            }else{
                alert("you must fill in all the fields!");
            }
        };

    return(
     
    <ImageBackground source={require('../components/pic3.jpg')} style={styles.background}>
      <BackButton/>
        <Text style={styles.bold}>Find your ride!</Text>
        <View style={styles.separator}></View>
        <View style={styles.center}>
            <GooglePlacesAutocomplete
                styles={styles.location}
                fetchDetails = {true}
                placeholder='Origin'
                onPress={handleFromLocation}
                query={{
                    key: 'AIzaSyA8T086PYyNfch449m9sfG5HFKwbBWnuo0',
                    language: 'en',
                }}
            />
            <GooglePlacesAutocomplete
                styles={styles.location}
                fetchDetails = {true}
                placeholder='Destanation'
                onPress={handleToLocation}
                query={{
                    key: 'AIzaSyA8T086PYyNfch449m9sfG5HFKwbBWnuo0',
                    language: 'en',
                }}
            />
            <Text style={{fontSize:16}}>
            Insert number of passenger:
            </Text> 
           <TextInput
          
        style={{fontSize:13,padding:4,backgroundColor: '#fff'}}
        placeholder=""
        keyboardType="numeric"
        value={howManyPassenger}
        onChangeText={(text) => setHowManyPassenger(text)}
      />

      <View style={styles.separator}></View>
            <Text>Departure Time: {departureTime ? departureTime.toString() : 'Not set'}</Text>
            <Button color = 'steelblue' title={departureTime ? departureTime.toString() :"Select Departure Time"} onPress={() => setDepartureTimePickerVisibility(true)} />
            <DateTimePickerModal
                isVisible={isDepartureTimePickerVisible}
                mode="datetime"
                onConfirm={handleDepartureTimeConfirm}
                onCancel={handleDepartureTimeCancel}
            />
            <View style={styles.separator}></View>
            <TouchableOpacity onPress={search} style={styles.roundButton}>
          <Text style={styles.buttonText} color={'green'}>Search</Text>
        </TouchableOpacity>
        </View>
      </ImageBackground>
    )
}


const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: 'cover',
  },
  center: {
    flex: 1,
    alignItems: 'center',
  },
  separator: {
    marginBottom: 20,
  },
  buttonText: {
    color: 'white', 
    fontSize: 20,
    fontWeight: 'bold',
  },
  roundButton: {
    borderRadius: 30,
    backgroundColor: 'forestgreen',
    padding: 10,
    marginVertical: 10,
    alignItems: 'center',
  },
  bold: {
      textAlign: 'center',
      justifyContent: 'center',
      alignItems: 'center',
      fontSize: 30,
      fontWeight: 'bold',
    },
  input: {
    backgroundColor: 'pink',
    width: "90%",
    fontSize: 15,
    padding: 8,
    borderColor: "blue",
    borderWidth: 0.2,
    borderRadius: 10,
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

  export default SearchRide