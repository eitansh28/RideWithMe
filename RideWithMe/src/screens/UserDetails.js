import React, { useState, useEffect } from "react";
import { View, Button, Text, TextInput, StyleSheet, ImageBackground,KeyboardAvoidingView,TouchableWithoutFeedback, Image, Dimensions } from "react-native";
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
import { IP } from "../components/constants";

  const UserDetails = ({navigation}) => {
  const { currentUser } = firebase.auth();
  const {params} = useRoute();
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [photoURL,setPhotoURL] = useState('');


    const getUserDetails = async () => {
      try {
        const res = await fetch("http://"+IP+":1000/getUserDetails", {
          method: "POST", 
          headers: { Accept: "application/json",
           "Content-Type": "application/json" 
          },
          body: JSON.stringify({ id: params.params })});

        const user_details = await res.json();
        setName(user_details.user_details.name);
        setAge(user_details.user_details.age);
        setGender(user_details.user_details.gender);
        setPhotoURL(user_details.user_details.photoURL);
      } catch (error) {
        console.log("im error ", error);
      }
    };
    getUserDetails();

  return (
    <ImageBackground source={require('../components/pic3.jpg')} style={styles.background}>
    <View style ={styles.center}>
        <BackButton/>
        <Text style={styles.bold}>User Details</Text>
        <View style={styles.photoContainer}></View>
        <Image source={{ uri: photoURL }} style={styles.profilePicture} />
          <View style={styles.detailsContainer}>
          <View style={styles.detailsRow}>
            <Text style={styles.detailsLabel}>Name:   {name}</Text>
            </View>
            <View style={styles.detailsRow}>
              <Text style={styles.detailsLabel}>Age:   {age}</Text>
            </View>
            <View style={styles.detailsRow}>
              <Text style={styles.detailsLabel}>Gender:   {gender}</Text>
            </View>
          </View>
    </View>
    </ImageBackground>  
  )
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    background: {
        flex: 1,
        resizeMode: 'cover',
    },
    backgroundImage: {
      flex: 1,
      resizeMode: 'cover',
    },
    separator: {
        width: 1,
        height: '8%',
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
    card: {
      backgroundColor: 'rgba(255, 255, 255, 0.8)',
      marginHorizontal: '0%',
      marginVertical: '0%',
      borderRadius: 10,
      borderTopStartRadius:0,
      borderTopEndRadius:0,
      overflow: 'hidden',
      opacity:0.9,
    },
    photoContainer: {
      justifyContent: 'flex-end',
      alignItems: 'flex-end',
      overflow: 'hidden',
    },
    profilePicture: {
      width: '30%',
      height: '20%',
    },
    detailsContainer: {
      flexDirection: 'column',
      marginVertical: '5%',
      paddingHorizontal: '10%',
    },
    name: {
      fontSize: 30,
      fontWeight: 'bold',
      marginBottom: '5%',
      
    },
    detailsRow: {
      flexDirection: 'row',
      marginBottom: '2%',
    
    },
    detailsLabel: {
      flex: 1,
      fontWeight: 'bold',
      fontSize:22,
    },
        input: {
      margin: 10,
      borderBottomColor: "lightgray",
      borderBottomWidth: 1,
    },
    detailsValue: {
      flex: 2,
      fontSize:18,
    },
  });

  export default UserDetails;