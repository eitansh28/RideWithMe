import React, { useState, useEffect } from "react";
import { View,  Text, TouchableOpacity, StyleSheet, ImageBackground, Image } from "react-native";
import { firebase } from "@react-native-firebase/auth";
import { useRoute } from '@react-navigation/native';
import BackButton from "../components/BackButton";
import { IP } from "../components/constants";
import Ionicons from "react-native-vector-icons/Ionicons";
import { Linking } from 'react-native';

  const UserDetails = ({navigation}) => {
  
  const {params} = useRoute();
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [photoURL,setPhotoURL] = useState('');
  const [phone,setPhone] = useState('');


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
        setPhone(user_details.user_details.phone);
      } catch (error) {
        console.log("im error ", error);
      }
    };
    getUserDetails();

    const onPressWhatsApp = () => {
      Linking.openURL(`whatsapp://send?phone=${phone}`);
  };

  const onPressCall = () => {
      Linking.openURL(`tel:${phone}`);
  };

  const onPressSms = () => {
      Linking.openURL(`sms:${phone}`);
  };

  return (
    <ImageBackground source={require('../components/pic9.jpg')} style={styles.background}>
      <BackButton/>
    <View style ={styles.center}>
        <Text style={styles.bold}>User Details</Text>
        <View style={styles.separator}></View>
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
              <View style={styles.separator}>
              </View>
              <View style={styles.detailsRow}></View>
            </View>
            <View style={{ flexDirection: 'row' , justifyContent: 'flex-start' }}>
            <TouchableOpacity onPress={onPressWhatsApp}>
          <Ionicons name="logo-whatsapp" size={60} color="#25D366" />
        </TouchableOpacity>
        <TouchableOpacity onPress={onPressCall}>
          <Ionicons name="call-outline" size={60} color="blue" />
        </TouchableOpacity>
        <TouchableOpacity onPress={onPressSms}>
          <Ionicons name="chatbubble-outline" size={60} color="brown" />
        </TouchableOpacity>
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
        justifyContent: 'flex-end',
        alignItems: 'center',
        
    },
    bold: {
        textAlign: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        fontSize: 30,
        fontWeight: 'bold',
    },
    bold1: {
      textAlign: 'center',
      justifyContent: 'center',
      alignItems: 'center',
      fontSize: 15,
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
    separator: {
      marginTop: 20,
      marginBottom: 25,
    },
    photoContainer: {
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