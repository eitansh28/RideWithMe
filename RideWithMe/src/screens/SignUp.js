import React, {useState, useEffect} from "react";
import {View, Text, StyleSheet, Button ,Alert, TextInput, ImageBackground} from 'react-native';
import auth from "@react-native-firebase/auth";

const SignUp = ({navigation}) => {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [user, setUser] = useState();
  const [go, setGo] = useState(false);
  
  function Login() {
    // Set an initializing state whilst Firebase connects
    const [initializing, setInitializing] = useState(true);

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

    if (user && go) {
      navigation.navigate("Set User Data");
    }
  }

  function create() {
    alert("mmmmmm")
    if (email && pass) {
      alert("bbbb")
      setGo(true);
    auth()
      .createUserWithEmailAndPassword(email, pass)
      .then(() => {
        console.log("User account created & signed in!");
      })
      .catch((error) => {
        if (error.code === "auth/email-already-in-use") {
          console.log("That email address is already in use!");
        }

        if (error.code === "auth/invalid-email") {
          console.log("That email address is invalid!");
        }
        console.error(error);
      });
    }
    else {
      alert("you must fill all the tabs!");
    }
  }

  function check() {
    navigation.navigate("SignIn");
  }


  return(
    <ImageBackground source={require('../components/pic2.jpg')} style={styles.background}>
    <View style={styles.center}>
      <Login/>
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
        onPress={create}
      />
      <Text>Returning user? </Text>
      <Button
        title="sign in"
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
  input: {
    backgroundColor: 'pink',
    width: "90%",
    fontSize: 20,
    padding: 8,
    borderColor: "blue",
    borderWidth: 0.2,
    borderRadius: 10,
  },
});

export default SignUp