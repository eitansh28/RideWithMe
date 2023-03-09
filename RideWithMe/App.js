import * as React from "react";
import {View, TextInput, StyleSheet, Button, Text, ImageBackground} from "react-native";
import { useState, useEffect } from "react";
import firestore from "@react-native-firebase/firestore";
// import { NavigationContainer } from '@react-navigation/native';
// import { createStackNavigator } from '@react-navigation/stack';


import Main_container from "./src/components/Main_container";


// const Stack = createStackNavigator();
// const Stack = createNativeStackNavigator();

function App() {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [user, setUser] = useState();

  function create() {
    firestore()
      .collection("users")
      .doc(`rdCiSL18n1uqgRQkig1X`)
      .update({
        FirstName: 'Matan',
        LastName: 'Shimon',
      });
    alert("We got your data successfully :)");
  }

  return (
    <Main_container/>
    // <NavigationContainer>
    //   <Stack.Navigator>
    //     <Stack.Screen name="SignUp">
    //       {props => (
    //         <View style={styles.container}>
    //           <View style={styles.circle}>
    //             <Text style={styles.text}>Welcome to RideWithMe</Text>
    //           </View>
    //           <View style={styles.centered}>
    //             {/* <TextInput
    //               style={styles.input}
    //               placeholder="Enter your mail"
    //               value={email}
    //               onChangeText={setEmail}
    //             />
    //             <TextInput
    //               style={styles.input}
    //               placeholder="Enter desired password"
    //               value={pass}
    //               onChangeText={setPass}
    //             /> */}
    //             <Button
    //               title="Sign up"
    //               onPress={() => props.navigation.navigate('Sign up')}
    //             />
    //           </View>
    //         </View>
    //       )}
    //     </Stack.Screen>
    //     <Stack.Screen name="Login" component={Login} />
    //     <Button
    //               title="Login"
    //               onPress={() => props.navigation.navigate('Login')}
    //             />
    //       {/* </Stack.Screen>       */}
    //   </Stack.Navigator>
    // </NavigationContainer>
    // // <ImageBackground source={require('./pic1.jpg')} style={styles.background}>
    // // <View style={styles.container}>
    // //   <View style={styles.circle}>
    // //     <Text style={styles.text}>Welcome to RideWithMe!</Text>
    // //   </View>
    // //   <View style={styles.centered}>
    //   // {/* <TextInput
    //   //   style={styles.input}
    //   //   placeholder="Enter your mail"
    //   //   value={email}
    //   //   onChangeText={setEmail}
    //   // />
    //   // <TextInput
    //   //   style={styles.input}
    //   //   placeholder="Enter desired password"
    //   //   value={pass}
    //   //   onChangeText={setPass}
    //   // /> */}
    // //   <Button title=" Log in  " onPress={create}></Button>
    // //   <View style={styles.separator}></View>
    // //   <Button title="Sign up" onPress={create}></Button>
    // //   </View>
    // // </View>
    // //     </ImageBackground>
  );
};

export default App;

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: 'cover',
  },
  container: {
    // backgroundColor: 'green',
    flex: 1,
    alignItems: 'center',
    // justifyContent: 'center',
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
    backgroundColor: 'red',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 30,
    textAlign: 'center',
  },
  centered: {
    alignItems: 'center',
  },
  separator: {
    width: 1,
    height: '5%',
  },
});