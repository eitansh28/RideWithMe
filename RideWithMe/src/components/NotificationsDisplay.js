import { View, Text, StyleSheet, TouchableOpacity,Alert } from 'react-native'
import React, { useState } from 'react'
import { IP } from './constants'; 



const NotificationsDisplay = ({notification, user_id}) => {

  const delete_notification = async() => {
    try {
      const res = await fetch("http://"+IP+":1000/deleteNotification", {
      method: "POST",
      headers: { Accept: "application/json",
      "Content-Type": "application/json" 
      },
      body: JSON.stringify({ noti_id: notification.doc_id, user_id: user_id})});
      const answer = (await res.json()).send;
      console.log(answer);
    } catch (e) {
      console.error("Error delete document: ", e);
    }
  }


  const handleCancelNoti = () => {
    Alert.alert(
      'Confirmation',
      'Are you sure you want to delete this notification?',
      [
        { text: 'No', style: 'cancel' },
        { text: 'Yes', onPress: delete_notification },
      ]
    );
  };

    return (
        <View style = {{flex : 1,paddingBottom:10}}>    
            <View style = {{flex:0.5,backgroundColor:'white',borderRadius:10}}>
                <Text style={[styles.User,{marginBottom:10}]}> { notification.message} </Text>
                <Text style={[styles.User,{marginBottom:10}]}> { notification.doc_id} </Text>
                <TouchableOpacity onPress={handleCancelNoti} style={styles.buttonContainer}>
                  <Text style={styles.buttonText}>delete notification</Text>
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
            backgroundColor: 'red',
            borderRadius: 8,
            paddingVertical: 5,
            paddingHorizontal: 10,
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