import React, { useState } from "react";
import { View, Button, Text, TextInput, StyleSheet, ImageBackground } from "react-native";
import { Picker } from "@react-native-picker/picker";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { firebase } from "@react-native-firebase/auth";
import firestore from "@react-native-firebase/firestore";
import { useRoute } from '@react-navigation/native';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';

  const CreateGroupRide = ({navigation}) => {
  const { currentUser } = firebase.auth();
  const [origin, setOrigin] = useState('');
  const [destination, setDestination] = useState('');
  const [info, setInfo] = useState('');
<<<<<<< HEAD
  const [price, setPrice] = useState('');
=======
>>>>>>> main
  const [departureTime, setDepartureTime] = useState(null);
  const [isDepartureTimePickerVisible, setDepartureTimePickerVisibility] = useState(false);
  const [desiredArrivalTime, setDesiredArrivalTime] = useState(null);
  const [isDesiredArrivalTimePickerVisible, setDesiredArrivalTimePickerVisibility] = useState(false);
  const {params} = useRoute();
  // the_date = params.selectedDate1;
  

  const save = async () => {
<<<<<<< HEAD
    alert("to be done");
=======
>>>>>>> main
    // if (destination && price && seats){
    //   try {
    //     await firestore()
    //       .collection("travels")
    //       .doc()
    //       .set({
    //         name_of_the_driver: `${currentUser.name}`,
    //         origin: `${origin}`,
    //         destination: `${destination}`,
    //         price: `${price}`,
    //         seats: `${seats}`,
    //         date: `${departureTime}`
    //       });
    //   } catch (e) {
    //     console.error("Error adding document: ", e);
    //   }
    //   alert("The travel has been successfully added");
    //   navigation.navigate("Home");
    // }
    // else {
    //   alert("you must fill in all the fields!");
    // }
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

  const handleFromLocation = (data, details = null) => {
    // Check if geometry is defined
    if (data.geometry && data.geometry.location) {
        // Extract latitude and longitude from the data parameter
        const { lat, lng } = data.geometry.location;

        // Set the location state
        setOrigin({ latitude: lat, longitude: lng });
    }
};

const handleToLocation = (data, details = null) => {
  // Check if geometry is defined
  if (data.geometry && data.geometry.location) {
      // Extract latitude and longitude from the data parameter
      const { lat, lng } = data.geometry.location;

      // Set the location state
      setDestination({ latitude: lat, longitude: lng });
  }
};
  const googlemapkey = 'AIzaSyA8T086PYyNfch449m9sfG5HFKwbBWnuo0';
  
  return (
<<<<<<< HEAD
    <ImageBackground source={require('../components/pic4.jpg')} style={theStyle.background}>
        <View>
            <Text style={theStyle.bold}>Travel group details</Text>
=======
    <ImageBackground source={require('../components/pic3.jpg')} style={theStyle.background}>
        <View>
            <Text style={theStyle.bold}>Travel details</Text>
>>>>>>> main
            <GooglePlacesAutocomplete
                styles={theStyle.location}
                placeholder='Origin'
                onPress={handleFromLocation}
                query={{
                    key: 'AIzaSyA8T086PYyNfch449m9sfG5HFKwbBWnuo0',
                    language: 'en',
                }}
            />
<<<<<<< HEAD
            <View style={theStyle.separator}></View>
=======
>>>>>>> main
            <GooglePlacesAutocomplete
                styles={theStyle.location}
                placeholder='Destination'
                onPress={handleToLocation}
                query={{
                    key: 'AIzaSyA8T086PYyNfch449m9sfG5HFKwbBWnuo0',
                    language: 'en',
                }}
            />
<<<<<<< HEAD
            <View style={theStyle.separator}></View>
            <TextInput
                style={theStyle.input}
                placeholder="price"
                value={price}
                onChangeText={setPrice}
            />
            {/* <View style={theStyle.separator}></View> */}
=======
>>>>>>> main
            <TextInput
                style={theStyle.input}
                placeholder="please enter info about the ride"
                value={info}
                onChangeText={setInfo}
            />
<<<<<<< HEAD
            {/* <Text>Departure Time: {departureTime ? departureTime.toString() : 'Not set'}</Text> */}
            <Button title={departureTime ? departureTime.toString() : 'select a departure Time'} onPress={() => setDepartureTimePickerVisibility(true)} />
=======
            <Text>Departure Time: {departureTime ? departureTime.toString() : 'Not set'}</Text>
            <Button title="Select Departure Time" onPress={() => setDepartureTimePickerVisibility(true)} />
>>>>>>> main
            <DateTimePickerModal
                isVisible={isDepartureTimePickerVisible}
                mode="datetime"
                onConfirm={handleDepartureTimeConfirm}
                onCancel={handleDepartureTimeCancel}
            />
<<<<<<< HEAD
            <View style={theStyle.separator_more}></View>
=======
>>>>>>> main
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
<<<<<<< HEAD
separator: {
    // width: 1,
    // height: '8%',
    marginTop: 20,
    marginBottom: 25,
    },
=======
>>>>>>> main
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
<<<<<<< HEAD
    marginTop: 25,
    marginBottom: 20,
  },

  separator_more: {
    marginTop: 20,
    marginBottom: 150,
=======
    width: 1,
    height: '8%',
>>>>>>> main
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
  export default CreateGroupRide;