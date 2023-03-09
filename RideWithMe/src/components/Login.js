import { NavigationContainer } from "@react-navigation/native";
import React, {useState} from "react";
import {View, Text, StyleSheet, Button ,Alert} from 'react-native';
import Main_container from "./Main_container";

// function SignInScreen ({navigation}) {
  const Login = ({navigation}) => {
//   const[isVisible, setVisible] = useState(true);

  // const showalert = () => {
    
  // }
  
  function check() {
    navigation.navigate("try2");
  }

    return(
    <View style={styles.center}>
        <Text style={{ textAlign: 'center', fontSize: 25}}>
        hellow my name is eitan
        </Text>
        {/* {isVisible && <Text style={{ textAlign: 'center', fontSize: 15}}> {props.message.msg}</Text>} */}
      <Button
        onPress={check}
        title="Click me"/>
      </View>
      
    )
}

const styles = StyleSheet.create({
    center: {
      backgroundColor: 'green'
    }
  });

  export default Login;