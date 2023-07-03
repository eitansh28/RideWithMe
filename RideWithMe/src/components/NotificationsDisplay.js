import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'

const NotificationsDisplay = ({notification}) => {
    return (
        <View style = {{flex : 1,paddingBottom:10}}>    
            <View style = {{flex:0.5,backgroundColor:'white',borderRadius:10}}>
                <Text style={[styles.User,{marginBottom:10}]}> {notification.message} </Text>
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

export default NotificationsDisplay