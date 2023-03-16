import React, { useState } from "react";
import { View, Button, Text, TextInput, StyleSheet, ImageBackground } from "react-native";
import { Picker } from "@react-native-picker/picker";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { firebase } from "@react-native-firebase/auth";
import firestore from "@react-native-firebase/firestore";
import { useRoute } from '@react-navigation/native';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';

  const PostRide = ({navigation}) => {
  const { currentUser } = firebase.auth();
  const [origin, setOrigin] = useState('');
  const [destination, setDestination] = useState('');
  const [date, setDate] = useState(new Date());
  const [price, setPrice] = useState('');
  const [seats, setSeats] = useState('');
  const [departureTime, setDepartureTime] = useState(null);
  const [isDepartureTimePickerVisible, setDepartureTimePickerVisibility] = useState(false);
  const [desiredArrivalTime, setDesiredArrivalTime] = useState(null);
  const [isDesiredArrivalTimePickerVisible, setDesiredArrivalTimePickerVisibility] = useState(false);

  const {params} = useRoute();
  // the_date = params.selectedDate1;
  

  const save = async () => {
    if (destination && price && seats){
      try {
        await firestore()
          .collection("travels")
          .doc()
          .set({
            name_of_the_driver: `${currentUser.name}`,
            origin: `${origin}`,
            destination: `${destination}`,
            price: `${price}`,
            seats: `${seats}`,
            date: `${departureTime}`
          });
      } catch (e) {
        console.error("Error adding document: ", e);
      }
      alert("The travel has been successfully added");
      navigation.navigate("Home");
    }
    else {
      alert("you must fill in all the fields!");
    }
  };
  
  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setDate(currentDate);
  };

  function chooseDate(){
    navigation.navigate({name: "DatePicker", params: {date:date}});
  }

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


  const googlemapkey = 'AIzaSyA8T086PYyNfch449m9sfG5HFKwbBWnuo0';
  
  return (
    <ImageBackground source={require('../components/pic3.jpg')} style={theStyle.background}>
    <View>
      <Text style={theStyle.bold}>Travel details</Text>
        {/* <GooglePlacesAutocomplete
        placeholder='Origin'
        debounce={400}
        onPress={(data, details = null) => {
          console.log(data, details);
        }}
        query={{
        key: googlemapkey,
        language: 'en',
        }}
        /> */}
          <View style={theStyle.separator}></View>
          <TextInput
            style={theStyle.input}
            placeholder="Origin"
            value={origin}
            onChangeText={setOrigin}
          />
          <TextInput
            style={theStyle.input}
            placeholder="destination"
            value={destination}
            onChangeText={setDestination}
          />
          <TextInput
            style={theStyle.input}
            placeholder="Price"
            value={price}
            onChangeText={setPrice}
          />
          <TextInput
            style={theStyle.input}
            placeholder="Number of places available"
            value={seats}
            onChangeText={setSeats}
          />
          <View style={theStyle.separator}></View>
          <Text>Departure Time: {departureTime ? departureTime.toString() : 'Not set'}</Text>
            <Button title="Select Departure Time" onPress={() => setDepartureTimePickerVisibility(true)} />
            <DateTimePickerModal
                isVisible={isDepartureTimePickerVisible}
                mode="datetime"
                onConfirm={handleDepartureTimeConfirm}
                onCancel={handleDepartureTimeCancel}
            />
            {/* <Text>Desired Arrival Time: {desiredArrivalTime ? desiredArrivalTime.toString() : 'Not set'}</Text>
            <Button title="Select Desired Arrival Time" onPress={() => setDesiredArrivalTimePickerVisibility(true)} />
            <DateTimePickerModal
                isVisible={isDesiredArrivalTimePickerVisible}
                mode="datetime"
                onConfirm={handleDesiredArrivalTimeConfirm}
                onCancel={handleDesiredArrivalTimeCancel}
            /> */}
          <View style={theStyle.separator}></View>
          <Button 
            title="post"
            color={'green'}
            onPress={save}
          />
      </View>
      </ImageBackground>
  );
};


const theStyle = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: 'cover',
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  bold: {
    textAlign: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: 30,
    fontWeight: 'bold',
  },
  separator: {
    width: 1,
    height: '8%',
  },
  root: {
    width: "100%",
    // flex: 1,
    padding: 10,
  },
  container: {
    padding: 10,
  },
  input: {
    margin: 10,
    borderBottomColor: "lightgray",
    borderBottomWidth: 1,
  },
  button: {
    backgroundColor: "green",
    height: 25,
    // justifyContent: "center",
    alignItems: "center",
    borderRadius: 20,
    // margin: 10,
  },
});
  export default PostRide;