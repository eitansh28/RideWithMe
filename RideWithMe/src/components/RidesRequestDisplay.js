import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { useNavigation } from '@react-navigation/native';

const RidesRequestDisplay = ({UseRides}) => {
    const navigation = useNavigation();

    function move_to_asked_to_join() {
        const travel_doc_id = UseRides.doc_id;
        navigation.navigate('AskedToJoin', {params: travel_doc_id});
    }
   
    return (
        <View style = {{flex : 1,paddingBottom:10}}>    
            <View style = {{flex:0.5,backgroundColor:'white',borderRadius:10}}>
                <Text style={[styles.User,{marginBottom:10}]}> origin : {UseRides.originName} </Text>
                <Text style={[styles.User,{marginBottom:10}]}> destination : {UseRides.destinationName}</Text>
                <Text style={[styles.User,{marginBottom:10}]}> date : {UseRides.date}</Text>
                <Text style = {[styles.User,{paddingBottom:4}]}> price : {UseRides.price}</Text>
                <Text style = {[styles.User,{paddingBottom:4}]}> seats : {UseRides.seats}</Text>
                <View style={{flexDirection:'row',justifyContent:'space-between'}}></View>
                <TouchableOpacity
                    style={styles.buttonContainer}
                    onPress={move_to_asked_to_join}
                    >
                    <Text style={styles.buttonText}>asked to join</Text>
                    </TouchableOpacity>
                    </View>
        </View>
    )
}

const styles = StyleSheet.create({
    User:{
        fontSize: 20,
        fontWeight: 'bold',
    },
        button: {
          alignItems: 'center',
          justifyContent: 'center',
          paddingVertical: 12,
          paddingHorizontal: 32,
          borderRadius: 100,
          elevation: 3,
          backgroundColor: 'black',
        },
        text: {
          fontSize: 16,
          lineHeight: 21,
          fontWeight: 'bold',
          letterSpacing: 0.25,
          color: 'white',
        },
        buttonContainer: {
            backgroundColor: 'lightgreen',
            borderRadius: 8,
            paddingVertical: 10,
            paddingHorizontal: 20,
            justifyContent: 'center',
            alignItems: 'center'
          },
          buttonText: {
            color: 'black',
            fontSize: 16,
            fontWeight: 'bold',
          },
})

export default RidesRequestDisplay