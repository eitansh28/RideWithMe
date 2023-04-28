import React, { useState, useEffect } from "react";
import { View, Button, Text, TextInput, StyleSheet, ImageBackground,KeyboardAvoidingView,TouchableWithoutFeedback, FlatList } from "react-native";
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
import AskedToJoinDisplay from "../components/AskedToJoinDisplay";
import { IP } from "../components/constants";

  const AskedToJoin = ({navigation}) => {
  const { currentUser } = firebase.auth();
  const {params} = useRoute();
  const [asked_to_join, SetAsked_to_join] = useState([]);
  const travel_doc_id = params.params;

  useEffect(() => {
    const getAskedToJoin = async () => {
      try {
        const res = await fetch("http://"+IP+":1000/getAskedToJoin", {
          method: "POST", 
          headers: { Accept: "application/json",
           "Content-Type": "application/json" 
          },
          body: JSON.stringify({travel_doc_id: travel_doc_id})});

        const asked_to_join_data = await res.json();
        SetAsked_to_join(asked_to_join_data.asked_to_join_data);
      } catch (error) {
        console.log("im error ", error);
      }
    };
    getAskedToJoin();
  }, [currentUser.uid, asked_to_join]);

  return (
   <ImageBackground source={require('../components/pic3.jpg')} style={theStyle.background}>
<View style ={theStyle.center}>
  <BackButton/>
      <Text style={theStyle.bold}>Asked To Join</Text>
      <View style={theStyle.separator}></View>
      <FlatList
           data={asked_to_join}
           keyExtractor = {item=> item.doc_id}
           renderItem = {({item}) => <AskedToJoinDisplay user = {item} travelDocId={travel_doc_id}/>}
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
  export default AskedToJoin;