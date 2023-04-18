import { View, Text, Image,StyleSheet,Modal, TouchableOpacity, Button, ScrollView, FlatList,Pressable } from 'react-native'
import React, { useState } from 'react'
import firestore from "@react-native-firebase/firestore";

const RidesRowDisplay = ({UseRides}) => {
    console.log("user rides:")
    console.log(UseRides);
   
    return (  
    <View style = {{flex : 1,paddingBottom:10}}>    
        <View style = {{flex:0.5,backgroundColor:'#d0c7b7',borderRadius:10}}>
            <View style={{flexDirection:'row',justifyContent:'space-between'}}>
            <Text style ={{fontSize:20}}>date: {UseRides.date}</Text>
            {/* <View style = {{flex:1}}>
            <View style = {{backgroundColor:'white',margin:50,marginBottom:'70%',opacity: 0.7,padding:40,borderRadius:10,flex:1}}>
            <Text style ={{fontSize:25,textAlign:'center',fontWeight:'bold',}}>More Details and options:</Text>
            <Text style={{paddingTop:5,fontWeight:'bold',paddingBottom:7,fontSize:20}}> Reports:</Text>
            <FlatList
                data={reports}
                keyExtractor =  {item=> reports.indexOf(item)}
                renderItem = {({item}) => <Text style = {{fontSize:16,fontWeight:'800'}}> {item}</Text>}
            />
            <View style={{alignItems:'center',justifyContent:'center',marginBottom:4}}>
            <Pressable style ={[styles.button,{marginBottom:7}]} onPress={deleteAcount} >
            <Text style={styles.text}> Delete Acount </Text>
            </Pressable>
            <Pressable style ={[styles.button,{marginBottom:7}]} onPress={()=>setShowMOdal(false)}>
            <Text style={styles.text}>Warning</Text>
            </Pressable>
            <Pressable style ={[styles.button,{marginBottom:7}]} onPress={()=>setShowMOdal(false)}>
                <Text style={styles.text}>Exit</Text>
            </Pressable> */}
        {/* {/* </View> */}
    </View>
      <Text style={[styles.User,{marginBottom:10}]}>destination : {UseRides.destination}   </Text>
      <Text style={[styles.User,{marginBottom:10}]}>origin : {UseRides.origin} </Text>
      <Text style = {[styles.User,{paddingBottom:4}]} >price : {UseRides.price}</Text>
      <Text style = {[styles.User,{paddingBottom:4}]} >seats : {UseRides.seats}</Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
    User:{
        fontSize:20,
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
})

export default RidesRowDisplay