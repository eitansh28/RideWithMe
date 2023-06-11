import { View, Text,StyleSheet,Keyboard, Button, FlatList } from 'react-native'
import React,{useState} from 'react'
import { useRoute } from '@react-navigation/native';
import { TextInput } from 'react-native-gesture-handler'
import SearchRidesRowDisplay from "../components/SearchRidesRowDisplay";


const Movetofullpath = () => {
    const {params} = useRoute();
    const UseRides = params.params.UseRides;
    const user_location = params.params.user_location;
    console.log(UseRides)
    return (
    <View style = {{flex : 1,paddingBottom:10}}>
        <FlatList
            data={UseRides}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({item}) => { 
                return <SearchRidesRowDisplay UseRides={item} user_location={user_location}/>;
              }} 
          />
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


export default Movetofullpath