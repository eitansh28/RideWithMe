import React from 'react';
import {StyleSheet, Text, View, ImageBackground, TouchableOpacity} from 'react-native';

const StartScreen = ({navigation}) => {

  function movetologin() {
    navigation.navigate("Login");
  }
  function movetosignup(){
    navigation.navigate("SignUp");
  }



  return(
    <ImageBackground source={require('../components/pic7.jpg')} style={styles.background}>
    <View style={styles.container}>
    <View style={styles.separator}></View>
      <View style={styles.circle}>
        <Text style={styles.text}>Welcome to RideWithMe!</Text>
      </View>
      <View style={styles.separator2}></View>
    <View style={styles.centered}>
    <TouchableOpacity onPress={movetologin} style={styles.roundButton}>
          <Text style={styles.buttonText}>Log in</Text>
        </TouchableOpacity>
       </View>
      <View style={styles.separator}></View>
      <View style={styles.centered}>
      <TouchableOpacity onPress={movetosignup} style={styles.roundButton}>
          <Text style={styles.buttonText}>sign up</Text>
        </TouchableOpacity>
      </View>
    </View>
    </ImageBackground>
  )
}


const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: 'cover',
  },
  buttonText: {
    color: 'black', 
    fontSize: 15,
    fontWeight: 'bold',
  },
  roundButton: {
    borderRadius: 40,
    backgroundColor: 'lightgreen',
    padding: 10,
    marginVertical: 10,
    alignItems: 'center',
  },
  container: {
    flex: 1,
    alignItems: 'center',
  },
  button: {
    backgroundColor: 'lightgreen',
    borderRadius: 35,
    paddingVertical: 10,
    paddingHorizontal: 20,
    fontSize: 30,
    width: 200, 
    height: 60, 
  },
  input: {
    width: "90%",
    fontSize: 15,
    padding: 8,
    borderColor: "gray",
    borderWidth: 0.2,
    borderRadius: 10,
  },
  circle: {
    width: 200,
    height: 200,
    borderRadius: 150,
    backgroundColor: '#007FFF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontFamily: 'KaushanScript-Regular',
    color: 'white',
    fontWeight: 'bold',
    fontSize: 30,
    textAlign: 'center',
  },
  centered: {
    width: 100,
    borderRadius: 65,
    overflow: 'hidden',
  },
  separator: {
    marginTop: 20,
    marginBottom: 20,
  },
  separator2: {
    marginTop: 200,
    marginBottom: 20,
  },
});
export default StartScreen