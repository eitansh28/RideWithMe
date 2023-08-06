import React, { useEffect, useState } from "react";
import { View, Button, Text, TextInput, StyleSheet, ImageBackground, TouchableOpacity}from "react-native";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { firebase } from "@react-native-firebase/auth";
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
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
  const [phone, setPhone] = useState('');
  const [seats, setSeats] = useState('');
  const [departureTime, setDepartureTime] = useState(null);
  const [isDepartureTimePickerVisible, setDepartureTimePickerVisibility] = useState(false);
  const [displayedInfo, setDisplayedInfo] = useState('origin');
  
  const userId = currentUser.id;
  
  function increment_check_input() {
    setDisplayedInfo(prevInfo => {
      if (prevInfo === 'origin') {
        return 'destination';
      } else if (prevInfo === 'destination') {
        return 'rest';
      } else {
        return prevInfo;
      }
    });
  }

  function back() {
    setDisplayedInfo(prevInfo => {
      if (prevInfo === 'rest') {
        return 'destination';
      } else if (prevInfo === 'destination') {
        return 'origin';
      } else {
        return prevInfo;
      }
    });
  }

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
        setPhone(user_details.user_details.phone);
        SetUser_name(user_details.user_details.name);
      } catch (error) {
        console.log("im error ", error);
      }
    };
     getUserDetails();
  }, [currentUser.uid]);
  
  
  const save = async () => {
    if (origin && destination && price && seats){
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
                              phone: phone,
                              seats: seats,
                              date: departureTime
                             })});
                             const name = user_name;
                             alert("The travel has been successfully added");
                              navigation.navigate('Home', {
                                screen : 'Home',       
                                params : {username: name, id: userId},
                              });

                             console.log("im here")
                             setOrigin('');
                             setOriginName('');
                             setDestination('');
                             setDestinationName('');
                             setPrice('');
                             setSeats('');
                             setDepartureTime(null);
                             setDisplayedInfo('origin');
        } catch (e) {
        console.error("Error adding document: ", e);
      }
    }
    else {
      alert("you must fill in all the fields!");
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

  const handleFromLocation = (data, details = null) => {
  // Check if geometry is defined
  if (details.geometry && details.geometry.location) {
    // Extract latitude and longitude from the data parameter
    const { lat, lng } = details.geometry.location;

    setOriginName(data.description);
    // Set the location state
    setOrigin({ latitude: lat, longitude: lng });

    // getAddressFromLatLong(lat, lng).then(address => setOrigin1(address));
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
      // getAddressFromLatLong(lat, lng).then(address => setDestination1(address));
  }
};

  const googlemapkey = 'AIzaSyA8T086PYyNfch449m9sfG5HFKwbBWnuo0';

  

  return (
    <ImageBackground source={require('../components/pic11.jpg')} style={theStyle.background}>
      <BackButton/>
      <View style={theStyle.center}>
        {displayedInfo === 'origin' && (
          <>
            <Text style={theStyle.bold}>Please insert the desired Origin</Text>
            <View style={theStyle.separator}></View>
            <GooglePlacesAutocomplete
              styles={theStyle.location}
              listViewDisplayed='auto'
              fetchDetails = {true}
              placeholder='Origin'
              onPress={handleFromLocation}
              query={{
                  key: 'AIzaSyA8T086PYyNfch449m9sfG5HFKwbBWnuo0',
                  language: 'en',
              }}
            />
            <TouchableOpacity onPress={increment_check_input} style={theStyle.roundButton}>
              <Text style={theStyle.buttonText} color={'green'}>Next</Text>
            </TouchableOpacity>
          </>
        )}

        {displayedInfo === 'destination' && (
          <>
            <Text style={theStyle.bold}>Please insert the desired Destination</Text>
            <View style={theStyle.separator}></View>
            <GooglePlacesAutocomplete
              styles={theStyle.location}
              fetchDetails = {true}
              placeholder='Destination'
              onPress={handleToLocation}
              query={{
                  key: 'AIzaSyA8T086PYyNfch449m9sfG5HFKwbBWnuo0',
                  language: 'en',
              }}
            />
            <TouchableOpacity onPress={back} style={theStyle.roundButton1}>
              <Text style={theStyle.buttonText1} color={'green'}>back</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={increment_check_input} style={theStyle.roundButton}>
              <Text style={theStyle.buttonText} color={'green'}>Next</Text>
            </TouchableOpacity>
          </>
        )}

        {displayedInfo === 'rest' && (
          <>
            <TextInput
            style={theStyle.input}
            placeholder="Price"
            value={price}
            onChangeText={setPrice}
          />
          <View style={theStyle.separator}></View>
          <TextInput
            style={theStyle.input}
            placeholder="Number of places available"
            value={seats}
            onChangeText={setSeats}
          />
          <View style={theStyle.separator}></View>
          <Text style={{justifyContent: 'center', textAlign: 'center'}}>Departure Time: {departureTime ? departureTime.toString() : 'Not set'}</Text>
            <Button color= 'purple' title= {departureTime ? departureTime.toString() :"Select Departure Time"} onPress={() => setDepartureTimePickerVisibility(true)} />
            <DateTimePickerModal
                isVisible={isDepartureTimePickerVisible}
                mode="datetime"
                onConfirm={handleDepartureTimeConfirm}
                onCancel={handleDepartureTimeCancel}
            />
          <View style={theStyle.separator_more}></View>
          <TouchableOpacity onPress={back} style={theStyle.roundButton1}>
              <Text style={theStyle.buttonText1} color={'green'}>back</Text>
            </TouchableOpacity>
          <TouchableOpacity onPress={save} style={theStyle.roundButton}>
          <Text style={theStyle.buttonText} color={'green'}>Post</Text>
          </TouchableOpacity>
          </>
        )}
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
    alignItems: 'center',
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
  roundButton1: {
    borderRadius: 30,
    backgroundColor: 'lightblue',
    padding: 10,
    marginVertical: 10,
    alignItems: 'center',
  },
  buttonText1: {
    color: 'black', 
    fontSize: 20,
    fontWeight: 'bold',
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
        postion:'relative',
        alignItems: 'center',
        textAlign: 'center',
        justifyContent: 'center',
        
      },
      textInputContainer: {
        width: '100%',
        backgroundColor: 'rgba(0,0,0,0)',
        borderTopWidth: 0,
        borderBottomWidth:0,
        marginBottom: 90,
        marginTop: 50,
        alignItems: 'center',
        textAlign: 'center',
        justifyContent: 'center',
      },
      textInput: {
        marginLeft: 0,
        marginRight: 0,
        height: 38,
        color: '#5d5d5d',
        fontSize: 16,
        alignItems: 'center',
        textAlign: 'center',
        justifyContent: 'center',
        
      },
      predefinedPlacesDescription: {
        color: '#1faadb',
      },
},
  separator: {
    marginBottom: 20,
  },
  separator_more: {
    width: 1,
    height: '25%',
  },
  root: {
    width: "100%",
    padding: 10,
  },
  container: {
    padding: 10,
  },
  input: {
    // color: "white",
    margin: 10,
    borderBottomColor: "lightgray",
    borderBottomWidth: 2,
    fontWeight: 'bold',
    fontSize: 14,
  },
  button: {
    backgroundColor: "green",
    height: 25,
    alignItems: "center",
    borderRadius: 20,
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