import React, { useState } from "react";
import { View, Text, StyleSheet, ImageBackground ,TouchableOpacity} from "react-native";
import BackButton from "../components/BackButton";

  const MyRides = ({navigation}) => {

  
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
          <Text style={theStyle.buttonText}>Joined Rides</Text>
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
  export default MyRides;
