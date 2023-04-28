import { View, Text, Alert } from 'react-native'
import React, { useState } from 'react'
import { useRoute } from '@react-navigation/native';
import {StyleSheet,Button, Pressable, ImageBackground, TouchableOpacity,Modal} from 'react-native';
import Ionicons from "react-native-vector-icons/Ionicons";
import { Linking } from 'react-native';
import ContactModal from '../components/ContactModal';


const SearchResults = () => {
    const [modalVisible, setModalVisible] = useState(false);
    const {params} = useRoute();
    const results = params.results;
    // alert(results.match_rides[0].phone);


    const onPressWhatsApp = () => {
         Linking.openURL(`whatsapp://send?phone=${results.match_rides[0].phone}`);
    }

    const onPressCall = () => {
        Linking.openURL(`tel:${results.match_rides[0].phone}`);
    }

    const onPressSms = () => {
        Linking.openURL(`sms:${results.match_rides[0].phone}`);
    }

    const onPressContact = () => {
      setModalVisible(true);
  }



  return (
    <ImageBackground source={require('../components/pic2.jpg')} color ='white' style={theStyle.background}>
    <View>
      <Text style={theStyle.bold}>Search Results</Text>
      <View style={theStyle.separator}></View>
      <Text style={theStyle.standart}>driver name: {results.match_rides[0].driver_name}</Text>
      <Text style={theStyle.standart}>price: {results.match_rides[0].price}</Text>
      <Text style={theStyle.standart}>seats: {results.match_rides[0].seats}</Text>
      <View style={theStyle.separator}></View>
      <Modal
        animationType="slide"
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(false);
        }}
      >
        <View>
          {/* <Text>This is the modal content</Text> */}
          <ContactModal phone = {results.match_rides[0].phone}/>
        </View>
      </Modal>
      <Button View={theStyle.center}
            title="contact with the driver"
            color={'green'}
            onPress={onPressContact}
           />
      </View>
    </ImageBackground>

  )
}


const theStyle = StyleSheet.create({
    background: {
      flex: 1,
      resizeMode: 'cover',
      // justifyContent: 'center',
      // alignItems: 'center',
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
      fontSize: 40,
      fontWeight: 'bold',
    },
    standart: {
      textAlign: 'center',
      justifyContent: 'center',
      alignItems: 'center',
      fontSize: 20,
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
      // marginTop: 20,
      marginBottom: 20,
    },
    separator_more: {
      width: 1,
      height: '25%',
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
export default SearchResults