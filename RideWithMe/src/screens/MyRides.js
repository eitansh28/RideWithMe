import React, { useState } from "react";
import { View, Button, Text, TextInput, StyleSheet, ImageBackground,KeyboardAvoidingView,TouchableWithoutFeedback ,TouchableOpacity} from "react-native";
import { Picker } from "@react-native-picker/picker";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { firebase } from "@react-native-firebase/auth";
import firestore from "@react-native-firebase/firestore";
import { useRoute } from '@react-navigation/native';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { Keyboard } from 'react-native'
import { SafeAreaView } from "react-native-safe-area-context";
import { ScrollView } from "react-native-gesture-handler";
import BackButton from "../components/BackButton";

  const MyRides = ({navigation}) => {
  const { currentUser } = firebase.auth();
  const {params} = useRoute();

  
    function move_to_rides_with_me() {
        navigation.navigate("RidesWithMe");
    }

    function move_to_rides_with_you() {
        navigation.navigate("RidesWithYou");
    }

    function move_to_rides_request() {
        navigation.navigate("RidesRequest");
    }

  return (
   <ImageBackground source={require('../components/pic8.jpg')} style={theStyle.background}>
  <BackButton/>
  <View style ={theStyle.center}>
      <Text style={theStyle.bold}>My Rides</Text>
          <View style={theStyle.separator}></View>
          <TouchableOpacity onPress={move_to_rides_with_me} style={theStyle.roundButton}>
          <Text style={theStyle.buttonText}>my rides as driver</Text>
        </TouchableOpacity>
           <View style={theStyle.separator}></View>
           <TouchableOpacity onPress={move_to_rides_with_you} style={theStyle.roundButton}>
          <Text style={theStyle.buttonText}>my rides as passenger</Text>
        </TouchableOpacity>
           <View style={theStyle.separator}></View>
           <TouchableOpacity onPress={move_to_rides_request} style={theStyle.roundButton}>
          <Text style={theStyle.buttonText}>Pending requests</Text>
        </TouchableOpacity>
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
    alignItems: 'center',
    
  },
  bold: {
    textAlign: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: 30,
    fontWeight: 'bold',
  },
  buttonText: {
    color: 'black', 
    fontSize: 15,
    fontWeight: 'bold',
  },
  roundButton: {
    borderRadius: 40,
    backgroundColor: 'lightblue',
    padding: 8,
    marginVertical: 10,
    alignItems: 'center',
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
  export default MyRides;
