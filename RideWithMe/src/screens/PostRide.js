import React, { useEffect, useState } from "react";
import { View, Button, Text, TextInput, StyleSheet, ImageBackground,KeyboardAvoidingView,TouchableWithoutFeedback }from "react-native";
import { Picker } from "@react-native-picker/picker";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { firebase } from "@react-native-firebase/auth";
import firestore from "@react-native-firebase/firestore";
import { useRoute } from '@react-navigation/native';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { Keyboard } from 'react-native'
import { SafeAreaView } from "react-native-safe-area-context";
import { ScrollView } from "react-native-gesture-handler";
import { IP } from '../components/constants.js';
import BackButton from "../components/BackButton";

  const PostRide = ({navigation}) => {
  const { currentUser } = firebase.auth();
  const [user_name, SetUser_name] = useState();
  const [origin, setOrigin] = useState('defualt');
  const [originName, setOriginName] = useState('defualt');
  const [destination, setDestination] = useState('defualt');
  const [destinationName, setDestinationName] = useState('defualt');
  const [date, setDate] = useState(new Date());
  const [price, setPrice] = useState('');
  const [seats, setSeats] = useState('');
  const [departureTime, setDepartureTime] = useState(null);
  const [isDepartureTimePickerVisible, setDepartureTimePickerVisibility] = useState(false);

  const {params} = useRoute();
  // the_date = params.selectedDate1;

  useEffect(() => {
    const getUserDetails = async () => {
      try {
        const res = await fetch("http://"+IP+":1000/getUserDetails", {
          method: "POST", 
          headers: { Accept: "application/json",
           "Content-Type": "application/json" 
          },
          body: JSON.stringify({ id: currentUser.uid })});

        const user_details = await res.json();
        console.log(user_details.user_details);
        SetUser_name(user_details.user_details.name);
      } catch (error) {
        console.log("im error ", error);
      }
    };
     getUserDetails();
  }, [currentUser.uid]);
  
  
  const save = async () => {
    console.log(destination," ",price," ", seats);
    if (destination && price && seats){
      try {
        const res = await fetch("http://"+IP+":1000/postRide",{
          method: 'POST',
          headers: {Accept: "application/json",
          "Content-Type": "application/json" 
        },
        body: JSON.stringify({driver_id: currentUser.uid,
                              driver_name: user_name,
                              origin: origin,
                              dest: destination,
                              originName:originName,
                              destinationName:destinationName,
                              price: price,
                              seats: seats,
                              date: departureTime
                             })});
        } catch (e) {
        console.error("Error adding document: ", e);
      }
      alert("The travel has been successfully added");
      // navigation.navigate("Home");
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

  const handleFromLocation = (data, details = null) => {
  // Check if geometry is defined
  if (details.geometry && details.geometry.location) {
    // Extract latitude and longitude from the data parameter
    const { lat, lng } = details.geometry.location;

    setOriginName(data.description);
    // Set the location state
    setOrigin({ latitude: lat, longitude: lng });
}
};

const handleToLocation = (data, details = null) => {
    
  // Check if geometry is defined
  if (details.geometry && details.geometry.location) {
      // Extract latitude and longitude from the data parameter
      const { lat, lng } = details.geometry.location;
      setDestinationName(data.description);
      // Set the location state
      setDestination({ latitude: lat, longitude: lng });
  }
};

  const googlemapkey = 'AIzaSyA8T086PYyNfch449m9sfG5HFKwbBWnuo0';

  
  return (
   <ImageBackground source={require('../components/pic3.jpg')} style={theStyle.background}>
    <BackButton/>    
    <View style ={theStyle.center}>
      <Text style={theStyle.bold}>Travel details</Text>
      <GooglePlacesAutocomplete
          styles={theStyle.location}
          fetchDetails = {true}
          placeholder='Origin'
          onPress={handleFromLocation}
          query={{
              key: 'AIzaSyA8T086PYyNfch449m9sfG5HFKwbBWnuo0',
              language: 'en',
          }}
      />
      <GooglePlacesAutocomplete
          styles={theStyle.location}
          fetchDetails = {true}
          placeholder='Destanation'
          onPress={handleToLocation}
          query={{
              key: 'AIzaSyA8T086PYyNfch449m9sfG5HFKwbBWnuo0',
              language: 'en',
          }}
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
          <View style={theStyle.separator}></View>
          <Button 
            title="post"
            color={'green'}
            onPress={save}
           />
      </View>
       </ImageBackground> 
  )
};


const theStyle = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: 'cover',
  },
  center: {
    flex: 1,
    // justifyContent: 'center',
    // alignItems: 'center',
    
  },
  bold: {
    textAlign: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: 30,
    fontWeight: 'bold',
  },
  location: {
    container: {
        flex: 1,
        postion:'relative'
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
  export default PostRide;