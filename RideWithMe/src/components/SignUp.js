import React, {useState} from "react";
import {View, Text, StyleSheet, Button ,Alert} from 'react-native';
import Main_container from "./Main_container";

const SignInScreen = ({navigation}) => {
  const[isVisible, setVisible] = useState(true);

  const movetologin = () => {
    navigation.navigate("try1")
  }
    return(
    <View style={styles.center}>
        <Text style={{ textAlign: 'center', fontSize: 25}}>
        hellow my name is eitan
        </Text>
        {/* {isVisible && <Text style={{ textAlign: 'center', fontSize: 15}}> {props.message.msg}</Text>} */}
      <Button
        onPress={movetologin}
        title="Click me"/>
      </View>
      
    )
}

const styles = StyleSheet.create({
    center: {
      backgroundColor: 'blue'
    }
  });

export default SignInScreen;