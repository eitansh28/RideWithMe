import React, {useState} from "react";
import {View, Text, StyleSheet, Button ,Alert, TextInput, ImageBackground} from 'react-native';
import firestore from "@react-native-firebase/firestore";

const SignUpScreen = ({navigation}) => {
  const[isVisible, setVisible] = useState(true);

  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [pass, setPass] = useState("");
  const [user, setUser] = useState();
  
  function create_user() {
    // firestore()
    //   .collection("users")
    //   .doc(`rdCiSL18n1uqgRQkig1X`)
    //   .update({
    //     Name: name,
    //     Email: email,
    //   });
    alert("יאללה מתן תן בראש!!");
  }


    return(
    <ImageBackground source={require('./pic2.jpg')} style={styles.background}>
    <View style={styles.center}>
        <TextInput
        style={styles.input}
        placeholder="Enter your name"
        value={name}
        onChangeText={setName}
      />
      <TextInput
        style={styles.input}
        placeholder="Enter your mail"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.input}
        placeholder="Enter desired password"
        value={pass}
        onChangeText={setPass}
      />         
      <Button
        title="SignUp"
        onPress={(create_user)}
      />
      </View>
      </ImageBackground>  
    )
}

const styles = StyleSheet.create({
    background: {
      flex: 1,
      resizeMode: 'cover',
    },
    center: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
    input: {
      backgroundColor: 'pink',
      width: "90%",
      fontSize: 15,
      padding: 8,
      borderColor: "gray",
      borderWidth: 0.2,
      borderRadius: 10,
    },
  });

export default SignUpScreen;