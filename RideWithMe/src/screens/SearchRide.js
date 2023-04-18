import React, {useState, useEffect} from "react";
import {ScrollView, View, Text, StyleSheet, Button ,Alert, TextInput, ImageBackground} from 'react-native';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import DateTimePickerModal from "react-native-modal-datetime-picker";

  const SearchRide = () => {

    const [from, setFrom] = useState("");
    const [to, setTo] = useState("");
    const [departureTime, setDepartureTime] = useState(null);
    const [isDepartureTimePickerVisible, setDepartureTimePickerVisibility] = useState(false);
    const [desiredArrivalTime, setDesiredArrivalTime] = useState(null);
    const [isDesiredArrivalTimePickerVisible, setDesiredArrivalTimePickerVisibility] = useState(false);


    const handleFromLocation = (data, details = null) => {
        // Check if geometry is defined
        if (details.geometry && details.geometry.location) {
            // Extract latitude and longitude from the data parameter
            const { lat, lng } = details.geometry.location;
    
            // Set the location state
            setFrom({ latitude: lat, longitude: lng });
        }
    };
    
    const handleToLocation = (data, details = null) => {
        // Check if geometry is defined
        if (details.geometry && details.geometry.location) {
            // Extract latitude and longitude from the data parameter
            const { lat, lng } = details.geometry.location;
    
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

    const handleDesiredArrivalTimeConfirm = (date) => {
        console.log("Date selected: ", date);
        setDesiredArrivalTime(date);
        setDesiredArrivalTimePickerVisibility(false);
    }
    
    const handleDesiredArrivalTimeCancel = () => {
        console.log("Date selection cancelled.");
        setDesiredArrivalTimePickerVisibility(false);
    }

    const  search = async () => {
        console.log("serach ride pressed");
        if (departureTime &&desiredArrivalTime && from && to ){
            try{
                const res =  await fetch(("http://192.168.144.1:1000/searchRide"),{
                    method : 'POST',
                    headers: {Accept: "application/json",
                    "Content-Type": "application/json" 
                  },
                  body: JSON.stringify({
                    origin:from,
                    destination: to,
                    departureTime: departureTime
                   })});

                   const ride_details = await res.json();
                   console.log(ride_details.match_rides[0].origin);
                }catch(e){
                    console.error("Error searching ride",e);
                }
            }else{
                alert("you must fill in all the fields!");
            }
        };

    

    return(
    <ImageBackground source={require('../components/pic2.jpg')} style={styles.background}>
        <View style={styles.center}>
            <GooglePlacesAutocomplete
                styles={styles.location}
                fetchDetails = {true}
                placeholder='Search'
                onPress={handleFromLocation}
                query={{
                    key: 'AIzaSyA8T086PYyNfch449m9sfG5HFKwbBWnuo0',
                    language: 'en',
                }}
            />
            <GooglePlacesAutocomplete
                styles={styles.location}
                fetchDetails = {true}
                placeholder='To'
                onPress={handleToLocation}
                query={{
                    key: 'AIzaSyA8T086PYyNfch449m9sfG5HFKwbBWnuo0',
                    language: 'en',
                }}
            />
            <Text>Departure Time: {departureTime ? departureTime.toString() : 'Not set'}</Text>
            <Button title="Select Departure Time" onPress={() => setDepartureTimePickerVisibility(true)} />
            <DateTimePickerModal
                
                isVisible={isDepartureTimePickerVisible}
                mode="datetime"
                onConfirm={handleDepartureTimeConfirm}
                onCancel={handleDepartureTimeCancel}
            />
            <Text>Desired Arrival Time: {desiredArrivalTime ? desiredArrivalTime.toString() : 'Not set'}</Text>
            <Button title="Select Desired Arrival Time" onPress={() => setDesiredArrivalTimePickerVisibility(true)} />
            <DateTimePickerModal
                isVisible={isDesiredArrivalTimePickerVisible}
                mode="datetime"
                onConfirm={handleDesiredArrivalTimeConfirm}
                onCancel={handleDesiredArrivalTimeCancel}
            />
            <Button
                title="Search"
                onPress={search}
            />
        </View>
      </ImageBackground>
    )
}

const styles = StyleSheet.create({
    background: {
      flex: 1,
      resizeMode: 'cover',
      justifyContent: 'center',
      alignItems: 'center',
    },
    center: {
      alignItems: 'center',
      justifyContent: 'center',
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