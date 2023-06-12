import { View, Text,StyleSheet,Keyboard, Button } from 'react-native'
import React,{useState} from 'react'
import { TextInput } from 'react-native-gesture-handler'

const getUsers = async () =>{
  try {
    const res = await fetch("http://"+IP+":1000/getUserD", {
      method: "GET", 
    });

    const user_details = await res.json()
    console.log(user_details);
  } catch (error) {
    console.log("im here ", error);
  }
}

const Sa = () => {
  
    const [destination, setDestination] = useState('');
    return (
    <View>
      <TextInput
            style={theStyle.input}
            placeholder="destination"
            showSoftInputOnFocus = {false}
            keyboardAppearance = {false}
            value={destination}
            onChangeText={setDestination}
      >
            </TextInput>
            <Button title='get_user' onPress={getUsers} />

            
    </View>
  )
}
const theStyle = StyleSheet.create({
   

    input: {
      margin: 10,
      borderBottomColor: "lightgray",
      borderBottomWidth: 1,
    },
  });


export default Sa