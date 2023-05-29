import React, {useState, useEffect} from "react";
import {View, Text, StyleSheet, Button ,Alert, TextInput, ImageBackground, TouchableOpacity} from 'react-native';
import auth, { firebase} from "@react-native-firebase/auth";
import firestore from '@react-native-firebase/firestore';
import { IP } from "../components/constants";
  const SignIn = ({navigation}) => {

    const [email, setEmail] = useState("");
    const [pass, setPass] = useState("");
    let username ="";
    
    
    function Login() {
      // Set an initializing state whilst Firebase connects
      const [initializing, setInitializing] = useState(true);
      const [user, setUser] = useState();
      let admin_id = 'I8TYZWC2bgWVuosPDUOuIT0QF7A2';
  
      // Handle user state changes
      function onAuthStateChanged(user) {
        setUser(user);
        if (initializing) setInitializing(false);
      }
  
      useEffect(() => {
        
        const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
        return subscriber; // unsubscribe on unmount
      }, []);
  
      if (initializing) return null;
  
      if (user) {
        const { currentUser } = firebase.auth();
        const userId = currentUser.uid;
        
        if (userId == admin_id) {
          navigation.navigate("Admin1");
        }
        else {
          console.log('im here')
          console.log(userId)
          firestore().collection('users').doc(userId).get().then((doc) => {
            let name = doc.data().name;
            navigation.navigate('Home', {
              screen : 'Home',       
              params : {username: name},
            });
          })
        }  
      }
    }
    
    // function enter() {
    //   console.log("press login");
    //   if (email && pass) {
    //     fetch('http://192.168.1.125:1000/SignIn', {
    //       method: 'POST',
    //       headers: {
    //         'Content-Type': 'application/json',
    //       },
    //       body: JSON.stringify({ email: email, password: pass }),
    //     })
    //     .then((response) => response.json())
    //     .then((data) => {
    //       if (data.success) {
    //         const { user } = data;
    //         const userId = user.uid;
    //         let name = user.email;
    //         navigation.navigate({name:'Home', params:{username: name}});
    //       } else {
    //         console.log(data.message);
    //         alert(data.message);
    //       }
    //     })
    //     .catch((error) => {
    //       console.error(error);
    //     });
    //   }
    //   else {
    //     alert("you must fill all the tabs!");
    //   }
    // }
    
    function enter() {
      if (email && pass) {
        auth()
        .signInWithEmailAndPassword(email, pass)
        .then(() => {
          console.log("User account signed in!");
          const { currentUser } = firebase.auth();
          console.log(currentUser);
          const userId = currentUser.uid;
          // let name = currentUser.email
          firestore().collection('users').doc(userId).get().then((doc) => {
            let name = doc.data().name;
            navigation.navigate('Home', {
              screen : 'Home',       
              params : {username: name},
            });
          })
        })
        .catch((error) => {
          if (error.code === "auth/email-already-in-use") {
            console.log("That email address is already in use!");
          }
  
          else if (error.code === "auth/invalid-email") {
            console.log("That email address is invalid!");
          }
          // else{
            
          // }
  
          console.error(error);
        });
      }
      else {
        alert("you must fill all the tabs!");
      }
    }
  
    function check() {
      navigation.navigate("SignUp");
    }

    return(
    <ImageBackground source={require('../components/pic5.jpg')} style={styles.background}>
    <View style={styles.center}>
      <Login/>
      <TextInput
        style={styles.input}
        placeholder="Enter your mail"
        value={email}
        onChangeText={setEmail}
      />
      <View style={styles.separator_small}></View>
      <TextInput
        style={styles.input}
        placeholder="Enter desired password"
        value={pass}
        onChangeText={setPass}
      />    
      <View style={styles.separator}></View>
      <TouchableOpacity onPress={enter} style={styles.roundButton}>
          <Text style={styles.buttonText} color={'green'}>Sign in</Text>
        </TouchableOpacity>
      <View style={styles.separator}></View>
      <Text style={styles.text}>First time here?</Text>
      <View style={styles.separator_small}></View>
      <Button 
        title="sign up"
        onPress={check}
      />
      </View>
      </ImageBackground>
    )
}


const styles = StyleSheet.create({
    background: {
      flex: 1,
      resizeMode: 'cover',
      justifyContent: 'center',
      alignItems: 'center',
    },
    center: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
    separator: {
      marginTop: 30,
      // marginBottom: 20,
    },
    separator_small: {
      marginTop: 10,
      // marginBottom: 20,
    },
    input: {
      backgroundColor: 'white',
      width: "90%",
      fontSize: 20,
      padding: 8,
      borderColor: "blue",
      borderWidth: 0.2,
      borderRadius: 20,
    },
    text: {
      fontFamily: 'KaushanScript-Regular',
      // color: 'white',
      fontWeight: 'bold',
      fontSize: 20,
      textAlign: 'center',
    },
    buttonText: {
      color: 'white', 
      fontSize: 15,
      fontWeight: 'bold',
    },
    roundButton: {
      borderRadius: 40,
      backgroundColor: 'green',
      padding: 10,
      marginVertical: 10,
      alignItems: 'center',
    },
  });

  export default SignIn