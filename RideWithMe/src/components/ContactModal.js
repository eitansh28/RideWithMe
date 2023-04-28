import {Text,View,StyleSheet,Button, Pressable, TouchableOpacity,Modal} from 'react-native';
import Ionicons from "react-native-vector-icons/Ionicons";
import { Linking } from 'react-native';

const ContactModal = (props) => {
    const onPressWhatsApp = () => {
        Linking.openURL(`whatsapp://send?phone=${props.phone}`);
    };
  
    const onPressCall = () => {
        Linking.openURL(`tel:${props.phone}`);
    };
  
    const onPressSms = () => {
        Linking.openURL(`sms:${props.phone}`);
    };
  
    return (
      <>
      <Text style={theStyle.bold}>Choose a contact method</Text>
      <View style={{ flexDirection: 'row' , justifyContent: 'space-between' }}>
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
      </>
    );
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
  export default ContactModal;