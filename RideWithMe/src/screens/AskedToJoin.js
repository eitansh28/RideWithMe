import React, { useState, useEffect } from "react";
import { View,  Text,  StyleSheet, ImageBackground, FlatList } from "react-native";
import { firebase } from "@react-native-firebase/auth";
import { useRoute } from '@react-navigation/native';
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
   <ImageBackground source={require('../components/pic4.jpg')} style={theStyle.background}>
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
  export default AskedToJoin;