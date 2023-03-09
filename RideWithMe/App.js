import * as React from "react";
import {View, TextInput, StyleSheet, Button} from "react-native";
import { useState, useEffect } from "react";
import firestore from "@react-native-firebase/firestore";
import MainNavigation from "./src/components/MainNavigation";

function App() {
  // const [email, setEmail] = useState("");
  // const [pass, setPass] = useState("");
  // const [user, setUser] = useState();

  // function create() {
  //   firestore()
  //     .collection("users")
  //     .doc(`rdCiSL18n1uqgRQkig1X`)
  //     .update({
  //       FirstName: 'Matan',
  //       LastName: 'Shimon',
  //     });
  //   alert("We got your data successfully :)");
  // }

  return (
    <MainNavigation/>
    // <View>
    //   <TextInput
    //     style={styles.input}
    //     placeholder="Enter your mail"
    //     value={email}
    //     onChangeText={setEmail}
    //   />
    //   <TextInput
    //     style={styles.input}
    //     placeholder="Enter desired password"
    //     value={pass}
    //     onChangeText={setPass}
    //   />
    //   <Button title="Sign up" onPress={create}></Button>
    // </View>
  );
};

export default App;

const styles = StyleSheet.create({
  input: {
    width: "90%",
    fontSize: 15,
    padding: 8,
    borderColor: "gray",
    borderWidth: 0.2,
    borderRadius: 10,
  },
});